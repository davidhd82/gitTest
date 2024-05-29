import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/users/refresh', {
            withCredentials: true
        });
        setAuth(prevState => {
            console.log(prevState);
            console.log(response.data.accessToken);
            return {
                ...prevState,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;