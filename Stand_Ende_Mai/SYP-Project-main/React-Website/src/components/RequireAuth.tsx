import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {IAuth, IAuthContext} from "../context/AuthProvider";
import PropTypes from "prop-types";

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array.isRequired
}

interface IRequireAuth {
    allowedRoles: number[]
}

function RequireAuth({allowedRoles}: IRequireAuth) {
    const {auth}: IAuthContext = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find((role: number) => allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth;