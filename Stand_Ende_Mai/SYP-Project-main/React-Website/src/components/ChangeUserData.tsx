import React from 'react';

interface IUserChangeData {
    userName: string,
    firstName: string,
    lastName: string
}

function ChangeUserData(props: any) {

    return (
        <React.Fragment>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="New Username" name="tfNewUsername"/>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" placeholder="New Firstname" name="tfNewFirstname"/>
                </div>
                <div className="col-6">
                    <label htmlFor="lastName">Lastname</label>
                    <input type="text" placeholder="New Lastname" name="tfNewLastname"/>
                </div>
            </div>

            <label htmlFor="tfPswChange"><b>Password</b></label>
            <input type="password" placeholder="New Password" name="tfPsw" id="tfPswChange"
                   value={props.formData.tfPsw} onChange={props.handleChange} required/>

            <label htmlFor="tfPswChangeRetype"><b>Retype Password</b></label>
            <input type="password" placeholder="Retype Password" name="tfPswRetype" id="tfPswChangeRetype"
                   value={props.formData.tfPswRetype} onChange={props.handleChange} required/>
        </React.Fragment>
    );
}

export default ChangeUserData;