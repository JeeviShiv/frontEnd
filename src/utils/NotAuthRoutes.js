import { Outlet, Navigate } from "react-router-dom";
import VerifyAuth from '../middleware/VerifyAuth';

const NotAuthRoutes = () => {
    let {auth} = VerifyAuth();
    return( !auth ? <Outlet /> : <Navigate to="/dashboard" />)
}
export default NotAuthRoutes;