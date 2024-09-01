import json
import logging
import httpx
import tempfile
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

from backend.s3_config import get_s3_client

logging.basicConfig(level=logging.INFO)

nom_du_fichier = 'liste_entreprises.json'

headers_jobs = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
    'Referer': 'https://www.welcometothejungle.com/',
    'x-algolia-api-key': '4bd8f6215d0cc52b26430765769e65a0',
    'x-algolia-application-id': 'CSEKHVMS53',
    'content-type': 'application/x-www-form-urlencoded',
    'Origin': 'https://www.welcometothejungle.com',
    'DNT': '1',
    'Sec-GPC': '1',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'Priority': 'u=0',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
}


def get_companies():
    """
    Récupération de toutes les entreprises présentes sur le site Welcome to the Jungle
    """
    params = {
        'name': '*',
        'order_by': 'name',
        'language': 'fr',
        'page': '1',
        'per_page': '30',
    }

    headers_companies = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'application/json, application/xml',
        'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
        'Referer': 'https://www.welcometothejungle.com/',
        'wttj-user-language': 'fr',
        'Origin': 'https://www.welcometothejungle.com',
        'DNT': '1',
        'Sec-GPC': '1',
        'Connection': 'keep-alive',
        'Priority': 'u=4',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
    }

    response = httpx.get('https://api.welcometothejungle.com/api/v1/companies',
                         params=params,
                         headers=headers_companies,
                         timeout=30)

    response.raise_for_status()
    with open(nom_du_fichier, 'w', encoding='utf-8') as fp:
        json.dump(response.json(), fp, ensure_ascii=False)


def process_company(company, client, s3):
    """
    Traite chaque entreprise pour récupérer les offres d'emploi et les envoyer à S3
    """
    company_slug = company['path'][14:]
    data_job_request = f'{{"requests":[{{"indexName":"wttj_jobs_production_fr_published_at_desc","params":"attributesToHighlight=%5B%22name%22%5D&attributesToRetrieve=%5B%22*%22%5D&clickAnalytics=true&hitsPerPage=1000&maxValuesPerFacet=999&analytics=true&analyticsTags=%5B%22page%3Acompany_jobs%22%2C%22language%3Afr%22%5D&enableABTest=true&userToken=undefined&facets=%5B%22organization.name%22%2C%22contract_duration_maximum%22%2C%22contract_duration_minimum%22%2C%22contract_type%22%2C%22has_contract_duration%22%2C%22education_level%22%2C%22has_education_level%22%2C%22experience_level_minimum%22%2C%22has_experience_level_minimum%22%2C%22language%22%2C%22new_profession.category_reference%22%2C%22new_profession.sub_category_reference%22%2C%22remote%22%2C%22salary_yearly_minimum%22%2C%22salary_currency%22%2C%22has_salary_yearly_minimum%22%5D&filters=(%22organization.slug%22%3A%22{company_slug}%22)&page=0&query="}}]}}'
    response = client.post(
        'https://csekhvms53-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.20.0)%3B%20Browser&search_origin=job_search_client',
        headers=headers_jobs,
        data=data_job_request
    )

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(json.dumps(response.json()).encode('utf-8'))
        temp_file_path = temp_file.name

    s3.put_object(
        Body=json.dumps(response.json(), ensure_ascii=False),
        Bucket='jobpilot',
        Key=f'{company_slug}.json'
    )

    os.remove(temp_file_path)


def get_jobs():
    s3 = get_s3_client()

    with open(nom_du_fichier, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
        print(f'Nombre de compagnies: {len(data["companies"])}')

    with httpx.Client() as client, ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(process_company, company, client, s3) for company in data['companies']]

        for future in as_completed(futures):
            result = future.result()
            print(f'Traitement terminé avec le résultat: {result}')


def get_focused_jobs():
    logging.info("Starting get_focused_jobs")
    get_companies()
    logging.info("Finished get_companies")
    with ThreadPoolExecutor() as executor:
        future = executor.submit(get_jobs)
        future.result()
        if future.done():
            logging.info("Finished get_jobs and process_files_from_bucket")
        else:
            logging.info("Error in get_jobs")
    logging.info("Completed get_focused_jobs")
