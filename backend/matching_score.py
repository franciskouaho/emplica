import openai
import json
import re
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
client = openai.OpenAI(api_key=api_key)


def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


def generate_prompt(cv, job_description):
    return (
        f"Compare the following CV and job description:\n\n"
        f"CV: {json.dumps(cv, indent=2)}\n\n"
        f"Job Description: {json.dumps(job_description, indent=2)}\n\n"
        f"Provide only the percentage match based on skills and experience. "
        f"Do not include any explanation or justification. "
        f"Return the result as a float percentage, for example, 75.5."
    )


def extract_percentage(text):
    match = re.search(r'\b(\d+(\.\d+)?)\b', text)
    if match:
        return float(match.group(1))
    return None


def get_match_percentage(cv, job_description):
    prompt = generate_prompt(cv, job_description)

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an expert in HR and recruitment."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.5
    )

    question = response.choices[0].message.content.strip()

    percentage = extract_percentage(question)

    return percentage


def get_cv_data(cv_path):
    return load_json(cv_path)


def get_job_data(job_path):
    return load_json(job_path)


def match_cv_to_job(cv_path, job_path):
    cv_data = get_cv_data(cv_path)
    job_data = get_job_data(job_path)

    match_percentage = get_match_percentage(cv_data, job_data)

    return {
        'skill_match_percentage': match_percentage,
    }
