import React, { useState, useEffect, useRef } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import axios from "axios";

const Dashboard = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const initialized = useRef(false)
    const [profile, setProfile] = useState([]);
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const [tableDisplay, setTableDisplay] = useState([])

    useEffect(() => {
      const BACKEND_URL = process.env.REACT_APP_API_URL;
      if (!initialized.current) {
        (async () => {
          try {
            const result = await axios.get(`${BACKEND_URL}/user`);
            if(result.data?.error){
              setNotification(result.data.error);
              setNotificationClass('alert alert-danger');
              setTableDisplay('displayNone')
            }
            else{
              setProfile(result.data);
            }
          } catch (error) {
            console.error(error.response.data);
            setNotification('Something went wrong');
            setNotificationClass('alert alert-danger');
          }
        })();
        initialized.current = true  
      }
      },[]);
    return <React.Fragment>
            <Header />
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            </div>
            <div class="container">
            <div class="col-md-8 order-md-1">
                <h4 className="display-4">Account Information</h4>
                <div className={notificationClass}>{notification}</div>
                <table class={"table table-bordered " + tableDisplay}>
                    <tbody>
                        <tr><td colSpan={2}><img alt="Profile" class="profilePicture" src={BACKEND_URL +'/'+ profile.profilePicture} width="50" height="50" /></td></tr>
                        <tr><td>Name</td><td>{profile.name}</td></tr>
                        <tr><td>Email ID</td><td>{profile.emailId}</td></tr>
                        <tr><td>Username</td><td>{profile.username}</td></tr>
                        <tr><td colSpan={2}>
                        <a href="/profile">
                            <button className="alert alert-info">
                            Update
                            </button>
                          </a>
                          </td></tr>

                    </tbody>
                </table>
            </div>
            </div>
            <Footer />
        </React.Fragment>
}
export default Dashboard;



