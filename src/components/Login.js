import React, {useState} from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

const loginSchema = yup.object({
    username:yup.string().required("Username is required"),
    password:yup.string().required("Password is required"),
});

const Login = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const {handleSubmit, register, formState:{errors}} = useForm({ resolver: yupResolver(loginSchema)});
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
      if (type==='password'){
         setIcon(eye);
         setType('text')
      } else {
         setIcon(eyeOff)
         setType('password')
      }
    }
    const verifyData = (data) => {
        fetch(`${BACKEND_URL}/auth/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: data.username, password: data.password}),
          }).then((res) => res.json())
            .then((response)=> {
              if(response?.success){
                localStorage.setItem("token", response.accessToken);
                navigate("/dashboard");
              }
              else{
                setNotification(response.error);
                setNotificationClass('alert alert-danger');
              }
          }).catch((err) => console.log('error'))
    }
    const formSubmit = async(data) => {
        await verifyData(data);
    }

    return <React.Fragment>
    <Header />
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    </div>
    <div class="container">
    <h4 class="display-4">Login</h4>
    <div class="col-md-8 order-md-1">
      <div className={notificationClass}>{notification}</div>
    </div>
    <div class="col-md-8 order-md-1">
        <form onSubmit={handleSubmit(formSubmit)} method="post">
            <div class="col-md-12 mb-3">
                <label for="password">Username</label>
                <div class="input-group ">
                <input type="text" 
                       className="form-control" 
                       id="username" 
                       {...register("username")}
                       />
                <div class="errorMessage">
                {errors.username?.message}
                </div>
                </div>
            </div>
            <div class="col-md-12 mb-3">
              <label for="password">Password</label>
              <div class="input-group ">
              <input type={type} 
                     className="form-control" 
                     id="password" 
                     {...register("password")}
                    />
              <div class="input-group-append">
                  <span class="eyeIcon flex justify-around items-center" onClick={handleToggle}>
                      <Icon class="absolute mr-10" icon={icon} size={17}/>
                  </span> 
              </div>
              <div class="errorMessage">
                {errors.password?.message}
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
        </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
}
export default Login