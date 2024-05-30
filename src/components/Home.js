import Footer from "./common/Footer";
import Header from "./common/Header";
import VerifyAuth from "../middleware/VerifyAuth";

const Dashboard = () => {
    const auth = VerifyAuth();
    console.log(auth); 
    return <><Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
            <h4 class="display-4">Home</h4>
            <div class="col-md-8 order-md-1"></div>
             <h1>Home</h1>
             </div>
             <Footer />
           </>; 
}
 
export default Dashboard;


