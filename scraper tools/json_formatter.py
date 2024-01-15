import json
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

# Combine the script directory with the file name
input_file_path = os.path.join(script_dir, 'companies.json')
output_file_path = os.path.join(script_dir, 'companies_formatted.json')

with open(input_file_path, 'r', encoding='utf-8') as input_file:
    data = []
    for line in input_file:
        try:
            # Attempt to decode each line as JSON
            json_data = json.loads(line)
            data.append(json_data)
        except json.JSONDecodeError as e:
            print(f"Skipping invalid JSON: {e}")
            # Optionally, you can log the error or handle it in another way

# Write the formatted content to a new file
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    json.dump(data, output_file, indent=2, ensure_ascii=False)

print(f"Formatted JSON saved to '{output_file_path}'")