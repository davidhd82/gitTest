import React, {useEffect, useState} from 'react';
import Login from "./Login";
import Register from "./Register";
import ChangePsw from "./ChangePsw";

function Form(props: any) {
    const [formData, setFormData] = useState({});
    useEffect(() => {
    }, []);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (props.handleSubmit) {
            props.handleSubmit(formData);
        }
    }
    const handleFormClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <React.Fragment>
            <div className="form-popup" id={props.formId}>
                <form className="form-container varela-round" method="post" onSubmit={handleSubmit}>
                    <h1 className="text-center varela-round">{props.title}</h1>
                    {props.formId === 'formLogin' &&
                        <Login onRegisterClick={props.onRegisterClick} handleChange={handleChange}
                               formData={formData}/>}
                    {props.formId === 'formRegister' &&
                        <Register onLoginClick={props.onLoginClick} handleChange={handleChange} formData={formData}/>}
                    {props.formId === 'formChangePsw' && <ChangePsw handleChange={handleChange} formData={formData}/>}
                    <button type="submit" className="btn" id={props.btSubmitId}>{props.btSubmitText}</button>
                    <button type="button" className={"btn cancel " + props.btCloseClass} id={props.btCloseId}
                            onClick={handleFormClose}>Close
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Form;