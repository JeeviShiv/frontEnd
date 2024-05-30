export default function Validation(values){
    const validationErrors = {}
        if(!values.username.trim()){
            validationErrors.username = "Username is required"
        }
        if(!values.emailId.trim()){
            validationErrors.emailId = "Email Id is required"
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId.trim())){
            validationErrors.emailId = "Email Id is not valid"
        }
        if(!values.password.trim()){
            validationErrors.password = "Password is required"
        }
        else if(values.password.length<6){
            validationErrors.password = "Password should be at least 6 char"
        }

        if(!values.confirmPassword.trim()){
            validationErrors.confirmPassword = "Confirm Password is required"
        }
        else if(values.confirmPassword!==values.password){
            validationErrors.confirmPassword = "Passwords are not match"
        }
       
        return validationErrors;
};