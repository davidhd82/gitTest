import React, {useState} from 'react';
import UserDashboard from "./UserDashboard";
import {Outlet} from "react-router-dom";

function Layout(props: any) {
    return (
        <div>
            <UserDashboard/>
            <Outlet/>
        </div>
    );
}

export default Layout;