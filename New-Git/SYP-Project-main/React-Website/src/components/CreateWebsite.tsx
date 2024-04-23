import React from 'react';

function CreateWebsite(props: any) {
    return (
        <React.Fragment>
            <div className="container-fluid varela-round justify-content-center text-center">
                <h1 className="createWebsiteTitle">Create Website</h1>
                <div className="row">
                    <div className="col-6">
                        <h2 className="createWebsiteRowTitle">Choose your design</h2>
                        <form>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div>
                                    <label htmlFor="colorTheme" style={{fontSize:20, marginTop:5}}>Color Theme: </label>
                                    <br />
                                    <label htmlFor="pageTitle" style={{fontSize:20}}>Page Title: </label>
                                    <br />
                                    <label htmlFor="metaDescription" style={{fontSize:20}}>Meta Description: </label>
                                    <br />
                                    <label htmlFor="author" style={{fontSize:20}}>Author: </label>
                                    <br />
                                    <label htmlFor="language" style={{fontSize:20}}>Language: </label>
                                    <br />
                                    <label htmlFor="favicon" style={{fontSize:20}}>Favicon: </label>
                                    <br />
                                    <label htmlFor="backgroundColor" style={{fontSize:20}}>Background Color: </label>
                                    <br />
                                    <label htmlFor="headerBackgroundColor" style={{fontSize:20, marginRight:10}}>Header Background Color: </label>
                                    <br />
                                    <label htmlFor="navBackgroundColor" style={{fontSize:20}}>Nav Background Color: </label>
                                    <br />
                                    <label htmlFor="sectionBackgroundColor" style={{fontSize:20, marginRight:10}}>Section Background Color: </label>
                                    <br />
                                    <label htmlFor="footerBackgroundColor" style={{fontSize:20}}>Footer Background Color: </label>
                                </div>
                                <div>
                                    <input type="text" id="colorTheme"/>
                                    <br />
                                    <input type="text" id="pageTitle"/>
                                    <br />
                                    <input type="text" id="metaDescripton"/>
                                    <br />
                                    <input type="text" id="author"/>
                                    <br />
                                    <input type="text" id="language"/>
                                    <br />
                                    <input type="text" id="favicon"/>
                                    <br />
                                    <input type="text" id="backgroundColor,,"/>
                                    <br />
                                    <input type="text" id="headerBackgroundColor"/>
                                    <br />
                                    <input type="text" id="navBackgroundColor"/>
                                    <br />
                                    <input type="text" id="sectionBackgroundColor"/>
                                    <br />
                                    <input type="text" id="footerBackgroundColor"/>
                                </div>
                            </div>
                            <br />
                            <label htmlFor="prompt" style={{fontSize:20}}>Prompt</label>
                            <br />
                            <textarea name="prompt" id="promptArea" style={{height:150, width:465}}></textarea>
                            <br />
                            <button name="generateButton" id="gernerateButton">Generate</button>
                        </form> 
                    </div>
                    <div className="col-6">
                        <h2 className="createWebsiteRowTitle">Preview</h2>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateWebsite;