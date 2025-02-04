import pandas as pd

# Load the CSV file
df = pd.read_csv(r"D:\projects\Zomato\archive (4)\zomato.csv", encoding='ISO-8859-1')

# Convert DataFrame to JSON format
df.to_json("zomato.json", orient="records", lines=True)

print("CSV converted to JSON successfully!")
