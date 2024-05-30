import { Outlet, Navigate } from "react-router-dom";
import VerifyAuth from '../middleware/VerifyAuth';

const PrivateRoutes = () => {
    let {auth} = VerifyAuth();
    return( auth ? <Outlet /> : <Navigate to="/login" />)
}
export default PrivateRoutes;