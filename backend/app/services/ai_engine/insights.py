from app.services.ai_engine.llm_client import generate_text


def generate_insights(analysis_data: dict) -> str:
    if not analysis_data:
        raise ValueError("Analysis data cannot be empty.")

    statistics = analysis_data.get("statistics", {})
    correlation_data = analysis_data.get("correlation", {})
    anomalies = analysis_data.get("anomalies", {})

    correlation_matrix = correlation_data.get(
        "correlation_matrix",
        {}
    )

    compact_correlations = {}

    for column, values in correlation_matrix.items():
        compact_correlations[column] = dict(
            list(values.items())[:8]
        )

    compact_data = {
        "dataset_id": analysis_data.get("dataset_id"),
        "statistics": statistics,
        "correlations": compact_correlations,
        "anomalies": anomalies,
    }

    prompt = f"""
You are an expert data analyst.

Analyze this dataset analysis:

{compact_data}

Provide a concise report with:

1. Key Findings
2. Important Patterns
3. Possible Anomalies
4. Data Quality Observations
5. Three Actionable Insights

Rules:
- Use simple language.
- Only use information present in the supplied data.
- Do not invent statistics.
- Do not claim correlation means causation.
- Focus on the most important findings.
- Keep the response under 500 words.
"""

    return generate_text(prompt)