import os

from google import genai
from dotenv import load_dotenv

load_dotenv()


API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=API_KEY)


def generate_text(prompt: str) -> str:
    if not prompt.strip():
        raise ValueError("Prompt cannot be empty.")

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return response.text