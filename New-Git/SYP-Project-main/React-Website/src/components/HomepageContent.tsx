import React from 'react';

function HomepageContent(props: any) {
    const showCreateWebsite = () => {
        props.setShowCreateWebsite(true);
    }
    return (
        <React.Fragment>
            <div className="containerTop row varela-round">
                <div className="containerOne col-sm-6">
                    <div className="container containerWithPadding">
                        <div className="container">Have you always wanted to create your own website but didn't know how
                            to do it?
                        </div>
                        <div className="container justify-content-center">
                            <img src="./images/Responsive_Picture.png" alt="" height="150"
                                 className="img-fluid center-block"/>
                        </div>
                    </div>
                </div>
                <div className="containerTwo col-sm-6">
                    <div className="container containerWithPadding">
                        <div className="container">Create now a professional Website without any programming
                            experience
                        </div>
                        <div className="container text-center">
                            <button id="btCreate" className="btn" onClick={showCreateWebsite}>Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default HomepageContent;