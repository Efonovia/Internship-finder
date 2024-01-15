from data import data
import os
import pprint

script_dir = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.join(script_dir, 'companies3.txt')

def replace_quotes(obj):
    if isinstance(obj, str):
        return obj.replace('"', "'")
    elif isinstance(obj, list):
        return [replace_quotes(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: replace_quotes(value) for key, value in obj.items()}
    else:
        return obj


with open(file_path, "a", encoding='utf-8') as f:
    for x in data:
        for y in x:
            f.write(str(replace_quotes(y)) + ",\n")




