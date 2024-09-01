import openai
import re
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
client = openai.OpenAI(api_key=api_key)

def split_text(text, max_length):
    words = text.split()
    chunks = []
    current_chunk = []

    for word in words:
        if len(' '.join(current_chunk + [word])) <= max_length:
            current_chunk.append(word)
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [word]

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

def generate_prompt(cv_chunk, job_chunk):
    return (
        f"Compare the following CV and job description:\n\n"
        f"CV: {cv_chunk}\n\n"
        f"Job Description: {job_chunk}\n\n"
        f"Provide only the percentage match based on skills and experience. "
        f"Do not include any explanation or justification. "
        f"Return the result as a float percentage, for example, 75.5"
    )

def extract_percentage(text):
    match = re.search(r'\b(\d+(\.\d+)?)\b', text)
    if match:
        return float(match.group(1))
    return None

def get_match_percentage(cv, job_description):
    cv_chunks = split_text(cv, 3000)
    job_chunks = split_text(job_description, 3000)

    for cv_chunk, job_chunk in zip(cv_chunks, job_chunks):
        prompt = generate_prompt(cv_chunk, job_chunk)

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

def match_cv_to_job(cv_json, job_content):
    print("cv_json", cv_json)
    print("job_content", job_content)
    match_percentage = get_match_percentage(cv_json, job_content)


    return {
        'skill_match_percentage': match_percentage,
    }
