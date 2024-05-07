import React from 'react';
import {Link} from "react-router-dom";

function Register(props: any) {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <label htmlFor="tfFirstName"><b>Firstname</b></label>
                    <input type="text" placeholder="Enter Firstname" name="tfFirstName" id="tfFirstName"
                           value={props.formData.tfFirstName || ''} onChange={props.handleChange} required/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="tfLastName"><b>Lastname</b></label>
                    <input type="text" placeholder="Enter Lastname" name="tfLastName" id="tfLastName"
                           value={props.formData.tfLastName || ''} onChange={props.handleChange} required/>
                </div>
            </div>

            <label htmlFor="tfUsernameRegister"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="tfUsername" id="tfUsernameRegister"
                   value={props.formData.tfUsername || ''} onChange={props.handleChange} required/>

            <div className="container-fluid">
                <label htmlFor="tfEmail"><b>Email</b></label>
                <input type="email" placeholder="Enter Email" name="tfEmail" id="tfEmail"
                       value={props.formData.tfEmail || ''} onChange={props.handleChange} required/>
            </div>

            <label htmlFor="tfPswRegister"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="tfPsw" id="tfPswRegister"
                   value={props.formData.tfPsw || ''} onChange={props.handleChange} required/>

            <label htmlFor="tfPswRegisterRetype"><b>Retype Password</b></label>
            <input type="password" placeholder="Retype Password" name="tfPswRetype" id="tfPswRegisterRetype"
                   value={props.formData.tfPswRetype || ''} onChange={props.handleChange} required/>

            <Link to="/login" id="linkLoginInRegForm">Have already an account?</Link>
        </React.Fragment>
    );
}

export default Register;