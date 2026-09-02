from app.services.data_engine.profiler import profile_dataset

result = profile_dataset(
    "storage/uploads/38bbc46a-7fad-4586-9895-669bc80843e6.csv"
)

print(result)