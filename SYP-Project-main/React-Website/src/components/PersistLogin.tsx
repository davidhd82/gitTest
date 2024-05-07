import React, {useEffect, useState} from 'react';
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import {Outlet} from "react-router-dom";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <React.Fragment>
            {!persist ? <Outlet/>
                : isLoading ?
                    <p>Loading...</p>
                    : <Outlet/>}
        </React.Fragment>
    )
}

export default PersistLogin;