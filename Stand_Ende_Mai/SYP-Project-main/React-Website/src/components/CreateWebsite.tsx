import React, {useState} from 'react';
import EditWebsite from "./EditWebsite";
import {getWebsite} from "../controllers/chatgpt4";

function CreateWebsite(props: any) {
    const [iframeContent, setIframeContent] = useState<string>("");
    const [showEditWebsite, setShowEditWebsite] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const loadPage = () => {
        const userInput = (document.getElementById("promptArea") as HTMLInputElement)?.value;
        const formData = {
            colorTheme: (document.getElementById("colorTheme") as HTMLInputElement)?.value,
            pageTitle: (document.getElementById("pageTitle") as HTMLInputElement)?.value,
            metaDescription: (document.getElementById("metaDescripton") as HTMLInputElement)?.value,
            author: (document.getElementById("author") as HTMLInputElement)?.value,
            language: (document.getElementById("language") as HTMLInputElement)?.value,
            favicon: (document.getElementById("favicon") as HTMLInputElement)?.value,
            backgroundColor: (document.getElementById("backgroundColor") as HTMLInputElement)?.value,
            headerBackgroundColor: (document.getElementById("headerBackgroundColor") as HTMLInputElement)?.value,
            navBackgroundColor: (document.getElementById("navBackgroundColor") as HTMLInputElement)?.value,
            sectionBackgroundColor: (document.getElementById("sectionBackgroundColor") as HTMLInputElement)?.value,
            footerBackgroundColor: (document.getElementById("footerBackgroundColor") as HTMLInputElement)?.value,
        };

        fetch("http://localhost:4000/data/createPage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({options: formData, userInput: userInput}),
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setIframeContent(result);
            })
            .catch(error => console.error('Error:', error));
    };

    const loadPageGPT4 = () => {
        getWebsite(prompt)
            .then((data) => {
                console.log(data);
                setIframeContent(data.result);
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            })
    }

    const getIframeContent = () => {
        let content: string = iframeContent;

        const widthRegex = /width:\s*(\d+px|\d+%);?/g;
        const heightRegex = /height:\s*(\d+px|\d+%);?/g;

        content = content.replace(widthRegex, 'width: 50%;');
        content = content.replace(heightRegex, 'height: 50%;');

        return content;
    }


    return (
        <React.Fragment>
            <div className="container-fluid varela-round justify-content-center text-center">
                <h1 className="createWebsiteTitle">Create Website</h1>
                <div className="row">
                    <div className="col-6">
                        <h2 className="createWebsiteRowTitle">{showEditWebsite ? 'Edit the code of your website' : 'Choose your design'}</h2>
                        {showEditWebsite ? <EditWebsite code={iframeContent}/> :
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="colorTheme" className="label-lg">Color Theme: </label>
                                            <input type="text" id="colorTheme" className="form-control"
                                                   defaultValue="#333333"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="pageTitle" className="label-lg">Page Title: </label>
                                            <input type="text" id="pageTitle" className="form-control"
                                                   defaultValue="My Awesome Website"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="metaDescription" className="label-lg">Meta
                                                Description: </label>
                                            <input type="text" id="metaDescription" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="author" className="label-lg">Author: </label>
                                            <input type="text" id="author" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="language" className="label-lg">Language: </label>
                                            <input type="text" id="language" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="favicon" className="label-lg">Favicon: </label>
                                            <input type="text" id="favicon" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="backgroundColor" className="label-lg">Background
                                                Color: </label>
                                            <input type="text" id="backgroundColor" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="headerBackgroundColor" className="label-lg">Header
                                                Background Color: </label>
                                            <input type="text" id="headerBackgroundColor" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="navBackgroundColor" className="label-lg">Nav Background
                                                Color: </label>
                                            <input type="text" id="navBackgroundColor" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="sectionBackgroundColor" className="label-lg">Section
                                                Background Color: </label>
                                            <input type="text" id="sectionBackgroundColor" className="form-control"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="footerBackgroundColor" className="label-lg">Footer
                                                Background Color: </label>
                                            <input type="text" id="footerBackgroundColor" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prompt" className="label-lg">Prompt</label>
                                    <textarea name="prompt" id="promptArea" className="form-control"
                                              style={{height: 150}} value={prompt}
                                              onChange={(e) => setPrompt(e.target.value)}></textarea>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button name="generateButton" id="generateButton" className="btn btn-primary"
                                            onClick={loadPage}>Generate
                                    </button>
                                    <button name="generateGPT4Button" id="generateGPT4Button"
                                            className="btn btn-secondary" onClick={loadPageGPT4}>GenerateGPT4
                                    </button>
                                </div>
                            </form>}
                        <button className="btn btnEditWebsite mt-3"
                                onClick={(event) => setShowEditWebsite(!showEditWebsite)}>
                            {showEditWebsite ? 'Design' : 'Edit'}
                        </button>
                    </div>
                    <div className="col-6">
                        <h2 className="createWebsiteRowTitle">Preview</h2>
                        <div className="iframe-container">
                            <iframe srcDoc={getIframeContent()}/>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default CreateWebsite;