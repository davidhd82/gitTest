import * as fs from 'fs';
import * as path from 'path';

const dataDirectory: string = path.join(__dirname, '../../data/');

interface Page {
    page_name: string;
    description: string;
    html_content: string;
    css_content: string;
    js_content: string;
}

interface PageDescription {
    page_name: string;
    description: string;
}

export class PageSelector {
    private page_descriptions: PageDescription[];

    constructor(page_descriptions: PageDescription[]) {
        this.page_descriptions = page_descriptions;
    }

    public selectPage(userInput: string): string {
        const selectedPage = this.page_descriptions.find(page => userInput.includes(page.page_name.toLowerCase()));
        return selectedPage ? selectedPage.page_name : 'index';
    }
}

export class DataManager {
    private file_path: string;
    private data: any;

    constructor(file_path: string = 'data.json') {
        this.file_path = path.join(dataDirectory, file_path);
        this.data = this.load_data();
    }

    private load_data(): any {
        try {
            const fileContent = fs.readFileSync(this.file_path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            return {'pages': []};
        }
    }

    private save_data(): void {
        fs.writeFileSync(this.file_path, JSON.stringify(this.data, null, 4), 'utf-8');
    }

    public add_page(page_name: string, description: string, html_content: string, css_content: string, js_content: string): void {
        this.data['pages'].push({
            'page_name': page_name,
            'description': description,
            'html_content': html_content,
            'css_content': css_content,
            'js_content': js_content
        });
        this.save_data();
    }

    public get_pages(): Page[] {
        return this.data['pages'];
    }
}

export class WebBuilder {
    private data_manager: DataManager;
    private pageSelector: PageSelector;

    constructor(data_manager: DataManager) {
        this.data_manager = data_manager;
        this.pageSelector = new PageSelector(this.data_manager.get_pages().map((page: Page) => {
            return { page_name: page.page_name, description: page.description };
        }));
    }

    public prettify_html(html_content: string): string {
        return html_content;
    }

    public build_website(options: {
        colorTheme?: string,
        pageTitle?: string,
        metaDescription?: string,
        author?: string,
        language?: string,
        favicon?: string,
        fontFamily?: string,
        backgroundColor?: string,
        headerBackgroundColor?: string,
        navBackgroundColor?: string,
        sectionBackgroundColor?: string,
        footerBackgroundColor?: string
    }, userInput: string): string {
        const pages = this.data_manager.get_pages();
        const colorTheme = options.colorTheme || '#333';
        const pageTitle = options.pageTitle || 'My WebBuilder Website';
        const metaDescription = options.metaDescription || 'A website by WebBuilder';
        const author = options.author || 'WebBuilder';
        const language = options.language || 'en';
        const favicon = options.favicon || 'https://img.icons8.com/?size=256&id=bGv5vHhwLQi3&format=png';
        const fontFamily = options.fontFamily || 'Arial, sans-serif';
        const backgroundColor = options.backgroundColor || '#f4f4f4';
        const headerBackgroundColor = options.headerBackgroundColor || '#333';
        const navBackgroundColor = options.navBackgroundColor || '#555';
        const sectionBackgroundColor = options.sectionBackgroundColor || '#fff';
        const footerBackgroundColor = options.footerBackgroundColor || '#333';
        const selectedPage = this.pageSelector.selectPage(userInput);

        const template_str: string = `
            <!DOCTYPE html>
            <html lang="${language}">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${pageTitle}</title>
                    <meta name="description" content="${metaDescription}">
                    <meta name="author" content="${author}">
                    <link rel="icon" href="${favicon}" type="image/x-icon">
                    <style>
                        body {
                            font-family: ${fontFamily};
                            background-color: ${backgroundColor};
                        }
                        header {
                            background-color: ${headerBackgroundColor};
                        }
                        nav {
                            background-color: ${navBackgroundColor};
                        }
                        section {
                            background-color: ${sectionBackgroundColor};
                        }
                        footer {
                            background-color: ${footerBackgroundColor};
                        }
                        ${this.generateCSS(pages.find(page => page.page_name === selectedPage), colorTheme)}
                    </style>
                </head>
                <body>
                    ${this.generateHTML(pages.find(page => page.page_name === selectedPage))}\n<script>${this.generateJS(pages.find(page => page.page_name === selectedPage))}</script>
                </body>
            </html>
        `;
        this.save_website("index.html", template_str.trim().replace(/\n\s*\n/g, '\n'));
        return template_str.trim().replace(/\n\s*\n/g, '\n');
    }

    private generateCSS(selectedPage: Page | undefined, colorTheme: string): string {
        return `${(selectedPage === undefined) ? ("") : selectedPage.css_content.replace(/#333/g, colorTheme)}`;
    }

    private generateHTML(selectedPage: Page | undefined): string {
        return `${(selectedPage === undefined) ? ("") : selectedPage.html_content}`;
    }

    private generateJS(selectedPage: Page | undefined): string {
        return `${(selectedPage === undefined) ? ("") : selectedPage.js_content}`;
    }

    public save_website(filename: string, website_content: string): void {
        const prettified_content = this.prettify_html(website_content);
        fs.writeFileSync(path.join(dataDirectory, filename), prettified_content, 'utf-8');
    }
}