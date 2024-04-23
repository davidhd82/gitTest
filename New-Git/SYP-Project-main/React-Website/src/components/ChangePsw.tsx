import React from 'react';

function ChangePsw(props: any) {
    return (
        <React.Fragment>
            <label htmlFor="tfPswChange"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="tfPsw" id="tfPswChange"
                   value={props.formData.tfPsw} onChange={props.handleChange} required/>

            <label htmlFor="tfPswChangeRetype"><b>Retype Password</b></label>
            <input type="password" placeholder="Enter Password" name="tfPswRetype" id="tfPswChangeRetype"
                   value={props.formData.tfPswRetype} onChange={props.handleChange} required/>
        </React.Fragment>
    );
}

export default ChangePsw;