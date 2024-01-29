from pymongo import MongoClient
import re
# Connect to MongoDB
states_to_update = [
    "Abuja", "FCT", "f.c.t", "Abuja FCT Nigeria", "Abuja FCT", 
    "Federal Capital territory", "Abuja f.c.t", "Abuja f.c.t nigeria", 
    "FCT Nigeria", "fct abuja", "fct abuja nigeria", "F.C.T Nigeria", 
    "f.c.t abuja", "f.c.t abuja nigeria"
]

# Create a case-insensitive regex pattern for matching
pattern = "|".join(states_to_update)
regex_pattern = re.compile(f"^(?:{pattern})$", re.IGNORECASE)
client = MongoClient("mongodb+srv://efosa:NIpnY7QqtwOUQCsl@cluster0.uncidar.mongodb.net/?retryWrites=true&w=majority")
db = client['main']  # Replace with your actual database name
collection = db['Companies']  # Replace with your actual collection name

# Update companies with the specified states


# Update companies with the specified states
result = collection.update_many(
    {"state": {"$regex": regex_pattern}},
    {"$set": {"state": "Abuja"}}  # Set the new state value
)

print(f"{result.modified_count} companies updated.")

# Close the MongoDB connection
client.close()
