from app.services.ai_engine.llm_client import generate_text


prompt = "Explain what a dataset is in one simple sentence."

result = generate_text(prompt)

print("\nGemini response:")
print(result)