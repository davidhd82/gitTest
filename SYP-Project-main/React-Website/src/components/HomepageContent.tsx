import React from 'react';
import {Link} from "react-router-dom";

function HomepageContent(props: any) {
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
                            <Link to="/create" id="btCreate" className="btn">
                                Create
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default HomepageContent;