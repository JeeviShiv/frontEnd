import { useNavigate } from "react-router-dom";
import  {useEffect } from "react";

const Logout = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    useEffect(() => {
    fetch(`${BACKEND_URL}/auth/logout`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json())
            .then((response)=> {
                if(response?.success){
                    localStorage.clear();
                    navigate("/login");
                  }
          }).catch((err) => console.log('error'));
        });
    return ;
}
 
export default Logout;