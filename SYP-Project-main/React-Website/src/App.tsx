import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import HomepageContent from "./components/HomepageContent";
import CreateWebsite from "./components/CreateWebsite";
import {Route, Routes} from "react-router-dom";
import Form from './components/Form';
import Layout from "./components/Layout";
import NotFound from './components/NotFound';
import RequireAuth from "./components/RequireAuth";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import PersistLogin from "./components/PersistLogin";
import ChangeUserData from "./components/ChangeUserData";

enum Roles {
    User = 2001,
    Premium = 1834,
    Admin = 5150
}

function App() {

    useEffect(() => {
        const link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = 'https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap';
        document.head.appendChild(link2);
    }, []);


    return (

        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* public routes */}
                    <Route element={<PersistLogin/>}>
                        <Route index element={<HomepageContent/>}/>
                    </Route>
                    <Route path="login" element={<Form formId="formLogin" title="Login" btSubmitId="btLoginSubmit"
                                                       btSubmitText="Login"
                                                       btCloseClass="btClose" btCloseId="btCloseLogin"/>}/>
                    <Route path="register"
                           element={<Form formId="formRegister" title="Register" btSubmitId="btRegisterSubmit"
                                          btSubmitText="Register"
                                          btCloseClass="btClose" btCloseId="btCloseRegister"/>}/>

                    <Route path="unauthorized" element={<Unauthorized/>}/>

                    {/* protected routes */}
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={[Roles.User]}/>}>
                            <Route path="create" element={<CreateWebsite/>}/>
                            <Route path="changeProfile"
                                   element={<Form formId={"formChangeUserData"} title={"Update Profile"}
                                                  btSubmitId={"btChangeUserDataSubmit"}
                                                  btSubmitText={"Change"}
                                                  btCloseClass={"btCloseChange"}
                                                  btCloseId={"btCloseChangeUserData"}/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[Roles.Admin]}/>}>
                            <Route path="admin" element={<Admin/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[Roles.Premium, Roles.Admin]}/>}>
                            <Route path="lounge" element={<Lounge/>}/>
                        </Route>
                    </Route>

                    {/* route not found*/}
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;