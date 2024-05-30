import React, {useState, useEffect} from 'react';
import Header from "./common/Header";
import Footer from "./common/Footer";
import Input from "./common/Input";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username:yup.string().required("Username is required"),
  emailId: yup.string().required("Email is required").email("Email is not valid"),
  password: yup.string().min(6, "Pasword must be at least 6 characters"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Password must be match")
});

const Register = () => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    const { handleSubmit, register, formState: {errors, isSubmitSuccessful}, reset } = useForm({
      resolver: yupResolver(schema),
    });
    const [notification, setNotification] = useState([]);
    const [notificationClass, setNotificationClass] = useState('displayNone');
    const saveData = (data) => {
      fetch(`${BACKEND_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:data.username, password:data.password, emailId:data.emailId}),
      })
        .then((res) => res.json())
        .then((result) =>   
        {
          if(result?.message){
            setNotification(result.message);
            setNotificationClass('alert alert-success');
          }else if(result?.error){
            setNotification(result.error);
            setNotificationClass('alert alert-danger');
          }
        })
        .catch((err) => console.log('error'))
    }
    const formSubmit = async(data) => {
      console.log(data);
      await saveData(data);
    }
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset()
      }
    },[isSubmitSuccessful, reset])
    return <React.Fragment>
    <Header />
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    </div>
    <div class="container">
    <h4 class="display-4">Register</h4>
    <div class="col-md-8 order-md-1">
      <div className={notificationClass}>{notification}</div>
      <form onSubmit={handleSubmit(formSubmit)} method="post">
          <Input type="text" 
                 id="username" 
                 name="username" 
                 label="Username" 
                 register={{...register("username")}} 
                 errorMessage={errors.username?.message}
                 />
          <Input type="text" 
                 id="emailId" 
                 name="emailId"
                 label="Email ID" 
                 register={{...register("emailId")}}
                 errorMessage={errors.emailId?.message}
                 />    
          <Input type="password" 
                 id="password" 
                 label="Password" 
                 register={{...register("password")}}
                 errorMessage={errors.password?.message}
                 />
          <Input type="password" 
                 id="confirmPassword" 
                 label="Confirm Password" 
                 register={{...register("confirmPassword")}}
                 errorMessage={errors.confirmPassword?.message}
                 />
            <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
}
export default Register;