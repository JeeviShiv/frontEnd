import { Link } from "react-router-dom";
import VerifyAuth from "../../middleware/VerifyAuth";
const Header = () => {
    const {auth} = VerifyAuth();
    let menuItems;
    if(auth){
        menuItems = (<><Link className="p-2 text-dark" to="/dashboard">Dashboard</Link>
                        <Link className="p-2 text-dark" to="/view">Profile</Link>
                        <Link className="p-2 text-dark" to="/logout">Logout</Link></>)
    }
    else{
        menuItems = (<><Link className="p-2 text-dark" to="/register">Register</Link>
                        <Link className="p-2 text-dark" to="/login">Login</Link></>)
    }
    return <>
            <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
            <nav class="my-2 my-md-0 mr-md-3">
            {menuItems}
            </nav>
            </div>
        </>;
}
export default Header;