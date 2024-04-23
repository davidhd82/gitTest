import React, {useState} from 'react';

function Login(props: any) {
    const handleRegisterClick = () => {
        props.onRegisterClick(); // Funktion aufrufen, um das Register-Formular anzuzeigen
    };
    return (
        <React.Fragment>
            <label htmlFor="tfUsernameLogin"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="tfUsername" id="tfUsernameLogin"
                   value={props.formData.tfUsername || ''} onChange={props.handleChange} required/>

            <label htmlFor="tfPswLogin"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="tfPsw" id="tfPswLogin"
                   value={props.formData.tfPsw || ''} onChange={props.handleChange} required/>
            <a href="#" id="linkRegister" onClick={handleRegisterClick}>Not registered yet?</a>
        </React.Fragment>
    );
}

export default Login;