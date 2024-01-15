import pymongo
import json
import os

# Get the full path to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Combine the script directory with the file name
file_path = os.path.join(script_dir, 'companies3.json')

# MongoDB connection
client = pymongo.MongoClient('mongodb+srv://efosa:NIpnY7QqtwOUQCsl@cluster0.uncidar.mongodb.net/?retryWrites=true&w=majority')
db = client['main']
collection = db['Companies']

# Read the content of the file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Insert data into the MongoDB collection in batches
batch_size = 1000  # Adjust the batch size as needed
print("starting")
for i in range(0, len(data), batch_size):
    batch_data = data[i:i + batch_size]
    collection.insert_many(batch_data)
    print(f"inserted {i} records")

# Close the MongoDB connection
client.close()
