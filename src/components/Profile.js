import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaCamera } from "react-icons/fa";

import Input from "./common/Input";
import VerifyAuth from "../middleware/VerifyAuth";
import Header from "./common/Header";
import Footer from "./common/Footer";

const schema = yup.object().shape({
    name:yup.string().required("Name is required"),
    username:yup.string().required("Username is required"),
    emailId: yup.string().required("Email is required").email("Email is not valid"),
});

const Profile = () => {
  const navigate = useNavigate();
  const {decoded} = VerifyAuth();
  const initialized = useRef(false)

  const id = decoded.id;
  const initialState = { name: "", username: "", emailId: "", profilePicture: "" };
  const [profile, setProfile] = useState([initialState]);
  const [notification, setNotification] = useState([]);
  const [notificationClass, setNotificationClass] = useState('displayNone');
  const [formDisplay, setFormDisplay] = useState([])
  //const [photo, setPhoto] = useState();
  const { handleSubmit, register, formState: {errors}, reset } = useForm({ resolver: yupResolver(schema)});
  const BACKEND_URL = process.env.REACT_APP_API_URL;
  console.log(BACKEND_URL);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_API_URL;
    if (!initialized.current) {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/user`);
        if(result.data?.error){
          setNotification(result.data.error);
          setNotificationClass('alert alert-danger');
          setFormDisplay('displayNone')
        }
        else{
         let defaultValues = {};
          defaultValues.username = result.data.username;
          defaultValues.emailId = result.data.emailId;
          defaultValues.name = result.data.name;
          defaultValues.profilePicture = result.data.profilePicture;
          reset({ ...defaultValues });
          setProfile(result.data);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    })();
    initialized.current = true  
    }
  },[]);

  async function handleImage(e) {
      const BACKEND_URL = process.env.REACT_APP_API_URL;
      if(e.target.files[0]){
        const formData = new FormData();
        formData.append('photo', e.target.files[0]);
        try{
            const result = await axios.post(`${BACKEND_URL}/upload`, formData, { headers: {'Content-Type':'multipart/form-data'}});
            console.log(result.data);
            setProfile((prevState) => ({
              ...prevState,
              'profilePicture': result.data.image,
            }));
            setNotification(result.data.message);
            setNotificationClass('alert alert-success');
        }
        catch(error){
          setNotification('Profile picture upload failed');
          setNotificationClass('alert alert-danger');}
      }
      else{
        setNotification('Profile picture upload failed');
        setNotificationClass('alert alert-danger');
      }
  }

  const handleChange = (event) => {
    const { target } = event;
    setProfile((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmitAndRedirect = async() => {
    try {
      const result = await axios.patch(`${BACKEND_URL}/user`, 
                                    { id:id,
                                      username:profile.username, 
                                      name: profile.name,
                                      emailId: profile.emailId });
      if(result.data?.error){
        setNotification(result.data?.error);
        setNotificationClass('alert alert-danger');
      } else if(result.data?.message){
        navigate(`/view`);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };  

  return <React.Fragment>
    <Header />
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto">
    </div>
    <div class="container">
    <h4 class="display-4">Update Profile</h4>
    <div class="col-md-8 order-md-1">
    <div className={notificationClass}>{notification}</div>
      <div class={formDisplay}>
          <form id="imgaeForm">
            <div className="imagePosition">
              <img alt="Profile" class="profilePicture" src={BACKEND_URL +'/'+profile.profilePicture} width="50" height="50" />
              <label for="file" class="custom-file-upload"> 
                <FaCamera />
              </label>
            <input id="file" type="file" onChange={handleImage} />
            </div>
          </form>
          <form onSubmit={handleSubmit(handleSubmitAndRedirect)} method="post">
            <Input type="text" 
                  id="name" 
                  label="Name" 
                  register={{...register("name")}}
                  errorMessage={errors.name?.message}
                  onChange={handleChange}
                  />
            <Input type="text" 
                  id="username" 
                  name="username" 
                  label="Username" 
                  register={{...register("username")}} 
                  errorMessage={errors.username?.message}
                  onChange={handleChange}
                  /> 
            <Input type="text" 
                  id="emailId" 
                  name="emailId" 
                  label="Email ID" 
                  register={{...register("emailId")}} 
                  errorMessage={errors.emailId?.message}
                  onChange={handleChange}
                  />
            <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
          </form>
      </div>
    </div>
    </div>
    <Footer />
    </React.Fragment>
}

export default Profile;