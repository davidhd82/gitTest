import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Login(props: any) {
    return (
        <React.Fragment>
            <label htmlFor="tfUsernameLogin"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="tfUsername" id="tfUsernameLogin"
                   value={props.formData.tfUsername || ''} onChange={props.handleChange} required/>

            <label htmlFor="tfPswLogin"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="tfPsw" id="tfPswLogin"
                   value={props.formData.tfPsw || ''} onChange={props.handleChange} required/>
            <div className="rememberMeContainer">
                <input type="checkbox" id="persist" onChange={props.togglePersist} checked={props.persist}/>
                <label htmlFor="persist">Trust this device</label>
            </div>
            <Link to="/register" id="linkRegister">Not registered yet?</Link>
        </React.Fragment>
    );
}

export default Login;