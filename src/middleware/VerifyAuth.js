import { jwtDecode } from 'jwt-decode';
const VerifyAuth = () => {
    const accessToken = localStorage.getItem("token");
    let decoded = null;
    let auth = false;
    if(accessToken){
        decoded = jwtDecode(accessToken);
        auth = true;
    }
    else if(!accessToken || !auth || !decoded){
        decoded = null;
        auth = false;
    }
    return {decoded, auth};
}
export default VerifyAuth;