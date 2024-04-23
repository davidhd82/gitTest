import React, {useEffect, useState} from 'react';
import logo from '../images/icon.png'
import Form from "./Form";

function UserDashboard(props: any) {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showChangePswForm, setShowChangePswForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isAnyFormVisible = showLoginForm || showRegisterForm || showChangePswForm;
        props.setFormVisible(isAnyFormVisible);
    }, [showLoginForm, showRegisterForm, showChangePswForm, props.setFormVisible]);

    const openLoginForm = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
        setShowChangePswForm(false);
    };

    const openRegisterForm = () => {
        setShowRegisterForm(true);
        setShowLoginForm(false);
        setShowChangePswForm(false);
    };

    const openChangePswForm = () => {
        setShowChangePswForm(true);
        setShowLoginForm(false);
        setShowRegisterForm(false);
    };

    const closeForm = () => {
        setShowLoginForm(false);
        setShowRegisterForm(false);
        setShowChangePswForm(false);
    };

    const backToHomepage = () => {
        props.setShowCreateWebsite(false)
    }

    const handleFormSubmit = (formType: string, formData: any) => {
        let url = '';
        let method = '';
        let successMessage = '';

        switch (formType) {
            case 'login':
                url = '/users/login';
                method = 'POST';
                successMessage = 'Login successful';
                break;
            case 'register':
                url = '/users/register';
                method = 'POST';
                successMessage = 'Registration successful';
                break;
            case 'changePsw':
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
                    closeForm();
                    if (formType === 'login') {
                        localStorage.setItem('token', result.data);
                        setIsLoggedIn(true);
                    }
                } else {
                    console.error('Error:', result.error);
                    alert(result.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav" id="links">
                        <li className="nav-item">
                            {!isLoggedIn ? (
                                <a className="nav-link" href="#" id="linkLoginOrMyProfile" onClick={openLoginForm}>
                                    Login
                                </a>
                            ) : (
                                <a className="nav-link" href="#" id="linkLoginOrMyProfile">
                                    My Profile
                                </a>
                            )}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="linkChangePsw" onClick={openChangePswForm}
                               style={{display: isLoggedIn ? 'block' : 'none'}}>Change
                                Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="linkSignOut" onClick={handleSignOut}
                               style={{display: isLoggedIn ? 'block' : 'none'}}>Sign out</a>
                        </li>
                    </ul>
                    <a className="navbar-brand protest-strike-regular logo m-lg-auto m-auto" href="#"
                       onClick={backToHomepage}>WebBuilder <img
                        src={logo}
                        alt="Logo" height="40"/></a>
                </div>
            </nav>

            {showLoginForm &&
                <Form formId={"formLogin"} title={"Login"} btSubmitId={"btLoginSubmit"} btSubmitText={"Login"}
                      btCloseClass={"btClose"} btCloseId={"btCloseLogin"} onClose={closeForm}
                      onRegisterClick={openRegisterForm}
                      handleSubmit={(data: any) => handleFormSubmit('login', data)}/>}

            {showRegisterForm && <Form formId={"formRegister"} title={"Register"} btSubmitId={"btRegisterSubmit"}
                                       btSubmitText={"Register"}
                                       btCloseClass={"btClose"} btCloseId={"btCloseRegister"} onClose={closeForm}
                                       onLoginClick={openLoginForm}
                                       handleSubmit={(data: any) => handleFormSubmit('register', data)}/>}

            {showChangePswForm &&
                <Form formId={"formChangePsw"} title={"Change Password"} btSubmitId={"btChangePswSubmit"}
                      btSubmitText={"Change"}
                      btCloseClass={"btCloseChange"} btCloseId={"btCloseChangePsw"} onClose={closeForm}
                      handleSubmit={(data: any) => handleFormSubmit('changePsw', data)}/>}

        </React.Fragment>
    );
}

export default UserDashboard;