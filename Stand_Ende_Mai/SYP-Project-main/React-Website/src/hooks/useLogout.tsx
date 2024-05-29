import useAuth from "./useAuth";
import axios from "axios";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({user: "", accessToken: "", roles: []});

        try {
            const response = await axios('/users/logout', {
                withCredentials: true
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    return logout;
}

export default useLogout;