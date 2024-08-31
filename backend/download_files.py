import json

from sqlalchemy.orm import Session
from backend.s3_config import get_s3_client
from backend.sql_app.database import SessionLocal
from backend.sql_app.models import Company

bucket_name = 'jobpilot'


def process_files_from_bucket():
    s3 = get_s3_client()

    response = s3.list_objects(Bucket=bucket_name)

    if 'Contents' in response:
        for obj in response['Contents']:
            file_name = obj['Key']
            file_obj = s3.get_object(Bucket=bucket_name, Key=file_name)
            file_content = file_obj['Body'].read().decode('utf-8')
            data = json.loads(file_content)
            save_to_database(data)
    else:
        print('No files found in the bucket.')


def save_to_database(data):
    db: Session = SessionLocal()

    for result in data['results']:
        if not result['hits']:
            print('No hits found in the result.')
            continue

        name_company = result['hits'][0]['organization']['name']
        name_job = result['hits'][0]['name']
        salary_minimum = result['hits'][0]['salary_minimum']
        salary_maximum = result['hits'][0]['salary_maximum']
        published_at_date = result['hits'][0]['published_at_date']
        city = result['hits'][0]['offices'][0]['city']
        benefits = result['hits'][0]['benefits']
        profile = result['hits'][0]['profile']
        highlight_result = result['hits'][0]['_highlightResult']['name']['value']
        print(f'name_company: {name_company}')
        print(f'name_job: {name_job}')
        print(f'salary_minimum: {salary_minimum}')
        print(f'salary_maximum: {salary_maximum}')
        print(f'published_at_date: {published_at_date}')
        print(f'city: {city}')
        print(f'benefits: {benefits}')
        print(f'profile: {profile}')
        print(f'highlightResult: {highlight_result}')
        try:
            company = Company(
                name_company=name_company,
                name_job=name_job,
                salary_minimum=salary_minimum,
                salary_maximum=salary_maximum,
                published_at_date=published_at_date,
                city=city,
                benefits=benefits,
                profile=profile,
                highlight_result=highlight_result
            )
            db.add(company)
            db.commit()
            db.refresh(company)
            print(f'Inserted nbHits into the database.')
        except Exception as e:
            print(f'Error: {e}')
            db.rollback()
    db.close()
