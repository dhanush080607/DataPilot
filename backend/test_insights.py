from app.services.ai_engine.insights import generate_insights


analysis_data = {
    "dataset": {
        "name": "Loan Dataset",
        "rows": 614,
        "columns": 13,
    },
    "statistics": {
        "ApplicantIncome": {
            "mean": 5403.46,
            "median": 3812.5,
        },
        "LoanAmount": {
            "mean": 146.41,
            "median": 128.0,
        },
    },
    "missing_values": {
        "Gender": 13,
        "Married": 3,
        "Dependents": 15,
        "Self_Employed": 32,
    },
    "correlations": {
        "ApplicantIncome_LoanAmount": 0.57,
        "Credit_History_Loan_Status": 0.56,
    },
}

result = generate_insights(analysis_data)

print("\n===== AI INSIGHTS =====\n")
print(result)