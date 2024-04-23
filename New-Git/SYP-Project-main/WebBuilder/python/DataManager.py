import json
import os

# Get the current directory of the script and join the data directory
data_directory = f"{os.path.dirname(os.path.abspath(__file__))}/../data/"

class DataManager:
    def __init__(self, file_path='data.json'):
        self.file_path = data_directory + file_path
        self.data = self.load_data()

    def load_data(self):
        try:
            with open(self.file_path, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            return {'pages': []}

    def save_data(self):
        with open(self.file_path, 'w') as file:
            json.dumep(self.data, file, indent=4)

    def add_page(self, page_name, html_content, css_content, js_content):
        self.data['pages'].append({
            'page_name': page_name,
            'html_content': html_content,
            'css_content': css_content,
            'js_content': js_content
        })
        self.save_data()

    def get_pages(self):
        return [(page['page_name'], page['html_content'], page['css_content'], page['js_content']) for page in self.data['pages']]