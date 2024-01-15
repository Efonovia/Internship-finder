import json
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.join(script_dir, 'companies3.json')
fass_file_path = os.path.join(script_dir, 'fass companies.json')

# Read the content of the file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)