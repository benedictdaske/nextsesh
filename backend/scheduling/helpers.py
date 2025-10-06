import json
from pathlib import Path
from django.conf import settings
from scheduling.models import Gym


def populate_gyms():

    # do nothing if gyms exist
    if Gym.objects.exists():
        return
    
    data_path = Path(settings.BASE_DIR) / 'data' / 'gyms.json'
    if not data_path.exists():
        print(f"Error: Gym data file not found at {data_path}")
        return
    
    try:
        with open(data_path, 'r') as file:
            gyms_data = json.load(file)
            print(gyms_data)
    except Exception as e:
        print(f"Error decoding JSON from {data_path}: {e}")
        return
    
    for gym_data in gyms_data:
        Gym.objects.create(**gym_data)
    
    
            
    
    