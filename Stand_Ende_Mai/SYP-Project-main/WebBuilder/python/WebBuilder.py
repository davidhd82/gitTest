from DataManager import DataManager, data_directory
from bs4 import BeautifulSoup
from jinja2 import Template

class WebBuilder:
    def __init__(self, data_manager:DataManager):
        self.data_manager = data_manager

    def prettify_html(self, html_content:str):
            soup = BeautifulSoup(html_content, 'html.parser')
            return soup.prettify()

    def build_website(self):
        pages = self.data_manager.get_pages()
        template_str = """
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>My Website</title>
                    <style>
                        {% for page_name, html_content, css_content, js_content in pages %}
                        {{ css_content }}
                        {% endfor %}
                    </style>
                </head>
                <body>
                    {% for page_name, html_content, css_content, js_content in pages %}
                        {{ html_content }}
                        <script>{{ js_content }}</script>
                    {% endfor %}
                </body>
            </html>
        """
        template = Template(template_str.lstrip('\n'))
        return template.render(pages=pages)

    def save_website(self, filename:str):
        website_content = self.build_website()
        prettified_content = self.prettify_html(website_content)
        with open(data_directory + filename, 'w') as f:
            f.write(prettified_content)

data_manager = DataManager('data.json')
builder = WebBuilder(data_manager)
builder.save_website("index.html")