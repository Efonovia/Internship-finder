import json
import os
nigeria_states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti',
    'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
    'Abuja'
]

script_dir = os.path.dirname(os.path.abspath(__file__))
result = {}
file_path = os.path.join(script_dir, 'companies3.json')
fass_file_path = os.path.join(script_dir, 'fass companies.json')
# Read the content of the file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)
    print(len(data))
    for company in data:
        for nstate in nigeria_states:
            if nstate.lower() in company["state"].lower():
                if nstate in result.keys():
                    result[nstate] += 1
                else: result[nstate] = 1
    
    sorted_dict_desc = dict(sorted(result.items(), key=lambda item: item[1], reverse=True))
    print(sorted_dict_desc)

    count = 0
    for val in sorted_dict_desc.values():
        count += val
    print(count)