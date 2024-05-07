import React, {useEffect, useState} from 'react';
import Login from "./Login";
import Register from "./Register";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import ChangeUserData from "./ChangeUserData";

Form.propTypes = {
    formId: PropTypes.string.isRequired,
    btSubmitId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    btSubmitText: PropTypes.string.isRequired,
    btCloseClass: PropTypes.string.isRequired,
    btCloseId: PropTypes.string.isRequired,
}

interface IForm {
    formId: string,
    btSubmitId: string
    title: string,
    btSubmitText: string,
    btCloseClass: string,
    btCloseId: string,
}

interface IFormData {
    token: string | null;
}

function Form({formId, title, btSubmitId, btSubmitText, btCloseClass, btCloseId}: IForm) {
    const [formData, setFormData] = useState<IFormData>({token: ""});
    const {setAuth, persist, setPersist} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleFormClose = () => {
        navigate(-1);
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("drinnen");
        event.preventDefault();
        let url = '';
        let method = '';
        let successMessage = '';

        switch (formId) {
            case 'formLogin':
                console.log("im login");
                url = '/users/login';
                method = 'POST';
                successMessage = 'Login successful';
                break;
            case 'formRegister':
                url = '/users/register';
                method = 'POST';
                successMessage = 'Registration successful';
                break;
            case 'formChangePsw':
                url = '/users/changePassword';
                method = 'POST';
                successMessage = 'Password change successful';
                formData.token = localStorage.getItem('token');
                break;
            default:
                return;
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 'ok') {
                    alert('Success');
                    if (formId === 'formLogin') {
                        setAuth({
                            user: result.user,
                            accessToken: result.accessToken,
                            roles: result.roles
                        });
                    }
                    navigate(from, {replace: true});
                } else {
                    console.error('Error:', result.error);
                    alert(result.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const togglePersist = () => {
        setPersist(prevState => !prevState);
    }

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist]);

    return (
        <React.Fragment>
            <div className="form-popup" id={formId}>
                <form className="form-container varela-round" method="post" onSubmit={event => handleFormSubmit(event)}>
                    <h1 className="text-center varela-round">{title}</h1>
                    {formId === 'formLogin' &&
                        <Login handleChange={handleChange}
                               formData={formData}
                               togglePersist={togglePersist}
                               persist={persist}/>}
                    {formId === 'formRegister' &&
                        <Register handleChange={handleChange} formData={formData}/>}
                    {formId === 'formChangeUserData' &&
                        <ChangeUserData handleChange={handleChange} formData={formData}/>}
                    <button type="submit" className="btn" id={btSubmitId}>{btSubmitText}</button>
                    <button type="button" className={"btn cancel " + btCloseClass} id={btCloseId}
                            onClick={handleFormClose}>Close
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Form;