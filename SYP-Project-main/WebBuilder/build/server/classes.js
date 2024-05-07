"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebBuilder = exports.DataManager = exports.PageSelector = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dataDirectory = path.join(__dirname, '../../data/');
class PageSelector {
    constructor(page_descriptions) {
        this.page_descriptions = page_descriptions;
    }
    selectPage(userInput) {
        const selectedPage = this.page_descriptions.find(page => userInput.includes(page.page_name.toLowerCase()));
        return selectedPage ? selectedPage.page_name : 'index';
    }
}
exports.PageSelector = PageSelector;
class DataManager {
    constructor(file_path = 'data.json') {
        this.file_path = path.join(dataDirectory, file_path);
        this.data = this.load_data();
    }
    load_data() {
        try {
            const fileContent = fs.readFileSync(this.file_path, 'utf-8');
            return JSON.parse(fileContent);
        }
        catch (error) {
            return { 'pages': [] };
        }
    }
    save_data() {
        fs.writeFileSync(this.file_path, JSON.stringify(this.data, null, 4), 'utf-8');
    }
    add_page(page_name, description, html_content, css_content, js_content) {
        this.data['pages'].push({
            'page_name': page_name,
            'description': description,
            'html_content': html_content,
            'css_content': css_content,
            'js_content': js_content
        });
        this.save_data();
    }
    get_pages() {
        return this.data['pages'];
    }
}
exports.DataManager = DataManager;
class WebBuilder {
    constructor(data_manager) {
        this.data_manager = data_manager;
        this.pageSelector = new PageSelector(this.data_manager.get_pages().map((page) => {
            return { page_name: page.page_name, description: page.description };
        }));
    }
    prettify_html(html_content) {
        return html_content;
    }
    build_website(options, userInput) {
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
        const template_str = `
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
    generateCSS(selectedPage, colorTheme) {
        return `${(selectedPage === undefined) ? ("") : selectedPage.css_content.replace(/#333/g, colorTheme)}`;
    }
    generateHTML(selectedPage) {
        return `${(selectedPage === undefined) ? ("") : selectedPage.html_content}`;
    }
    generateJS(selectedPage) {
        return `${(selectedPage === undefined) ? ("") : selectedPage.js_content}`;
    }
    save_website(filename, website_content) {
        const prettified_content = this.prettify_html(website_content);
        fs.writeFileSync(path.join(dataDirectory, filename), prettified_content, 'utf-8');
    }
}
exports.WebBuilder = WebBuilder;
