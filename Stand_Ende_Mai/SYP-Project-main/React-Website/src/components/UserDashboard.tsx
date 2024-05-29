import React, {useEffect, useState} from 'react';
import logo from '../images/icon.png'
import Form from "./Form";
import {Link, useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

function UserDashboard(props: any) {
    const navigate = useNavigate();
    const logout = useLogout();
    const {auth, persist} = useAuth();

    const signOut = async () => {
        await logout();
        navigate('/');
    }
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav" id="links">
                        <li className="nav-item">
                            {auth?.accessToken ?
                                <a className="nav-link" href="#" id="linkSignOut" onClick={signOut}
                                >Sign out</a>
                                : <Link to="login" className="nav-link">
                                    Login
                                </Link>}
                        </li>
                        <li className="nav-item">
                            <Link to="changeProfile" className="nav-link" id="linkMyProfile"
                                  style={{display: auth?.accessToken ? 'block' : 'none'}}>
                                My Profile
                            </Link>
                        </li>
                    </ul>
                    <Link to="/" className="navbar-brand protest-strike-regular logo m-lg-auto m-auto"
                    >WebBuilder <img
                        src={logo}
                        alt="Logo" height="40"/></Link>
                </div>
            </nav>

        </React.Fragment>
    );
}

export default UserDashboard;