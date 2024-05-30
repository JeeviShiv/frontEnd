import axios from 'axios';
import React, { useState } from 'react';

    function ImageUpload() {
    const [photo, setPhoto] = useState();

    function handleImage(e) {
        setPhoto(e.target.files[0])
    }
    const ImageSubmit = async(e) =>{
        const BACKEND_URL = process.env.REACT_APP_API_URL;
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);
        const result = await axios.post(`${BACKEND_URL}/upload`, formData, { headers: {'Content-Type':'multipart/form-data'}});
        console.log(result.data);
    }
    return(
        <div>
            <form onSubmit={ImageSubmit}>
            <label for="file" class="custom-file-upload"> 
            Choose File
            </label>
            <input type="file" id="file" onChange={handleImage}/> <br />
            <button>Submit</button>
            </form>
        </div>
    )
}
export default ImageUpload;