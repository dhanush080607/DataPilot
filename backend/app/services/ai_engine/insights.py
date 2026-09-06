from app.services.ai_engine.llm_client import generate_text


def generate_insights(analysis_data: dict) -> str:
    if not analysis_data:
        raise ValueError("Analysis data cannot be empty.")

    prompt = f"""
You are an expert data analyst.

Analyze the following dataset analysis results:

{analysis_data}

Provide a clear data analysis report containing:

1. Key Findings
2. Important Patterns
3. Possible Anomalies
4. Data Quality Observations
5. Three Actionable Insights

Use simple language.
Do not invent information that is not present in the analysis data.
Base every insight only on the provided data.
"""

    return generate_text(prompt)