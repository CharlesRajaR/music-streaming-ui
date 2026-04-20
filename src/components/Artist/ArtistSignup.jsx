import { useState } from "react";
import "../../css/Signup.css";
import { ToastContainer } from "react-bootstrap";

const ArtistSignUp = ({setLogin, setSignUp}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [socialLinks, setSocialLinks] = useState("");
    const [next, setNext] = useState(true);
    const [error, setEmailError] = useState("");
    const [error1, setPasswordError] = useState("");
    const [next1, setNext1] = useState(true);
    const [backendError, setBackendError] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
   

    const handleEmail = (e) => {
        const val = e.target.value;
        if(/\s/.test(val)){
            setEmailError("Email cannot contain spaces");
        }
        else{
            setEmailError("");
        }

        setEmail(val);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value.trim());
    };

    const handleName = (e) => {
        const value = e.target.value;
        if(/^\s|\s$/.test(value)){
            setBackendError("Name cannot start or end with space");
        }
        else if(/\s{2, }/.test(value)){
            setBackendError("Name cannot have multiple space in between");
        }
        else{
            setBackendError("");
        }

        setName(value);
    }

    const handleBio = (e) => {
        const val = e.target.val;
        setBio(val);
    };

    const handleSocialLinks = (e) => {
        const val = e.target.value;
        setSocialLinks(val);
    }

    const handleProfilePicture = (e) => {
        const file = e.target.files[0];
        if(file){
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const allowedExtension = ['jpg', 'jpeg'];
            if(!allowedExtension.includes(fileExtension)){
                toast.error("profile picture must be in jpg or jpeg format");
                return;
            }

            setProfilePicture(file);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            setEmailError("email not valid! Enter a valid one");
        }
        else{
            setEmailError("");
            setNext(false);
        }
    };

    const handleNext1 = (e) => {
        e.preventDefault();
        if(password.length < 10){
            setPasswordError(false);
        }
        else{
            setNext1(false);
        }
    };


    const handleSubmitLastStep = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("socialLinks", socialLinks);
        formData.append("status", "PENDING");
        formData.append("file", profilePicture);


        
    }



    return (
         <>
      {next ? (
        <div className="signup-container">
          <h2 className="signup-title">Get access to Melodify for Artists</h2>
          <h6>First, tell us who you are.</h6>
          <br />
          <form className="signup-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              maxLength="50"
              onChange={handleEmail}
            />
            {error ? <span>! {error} </span> : ""}
            <button type="submit" onClick={(e) => handleNext(e)}>
              Next
            </button>
          </form>
        </div>
      ) : next1 ? (
        <div className="signup-container">
          <h5 className="signup-title">Create a password</h5>
          <form className="signup-form">
            <label>Password</label>
            <input
              type="password"
              value={password}
              maxLength="20"
              onChange={handlePassword}
            />
            {error1 ? (
              <p>Your password must contain at least 10 characters</p>
            ) : (
              <span>Your password must contain at least 10 characters</span>
            )}
            <button type="submit" onClick={(e) => handleNext1(e)}>
              Next
            </button>
          </form>
        </div>
      ) : (
        <div className="signup-container">
          <h3 className="signup-title">Tell us about yourself</h3>
          <form className="signup-form">
            <label>Name</label>
            <p>This name will appear on your profile</p>
            <input type="text" value={name} onChange={handleName} maxLength="50" />

            <label>Bio</label>
            <p>This will appear on your profile</p>
            <input type="text" value={bio} onChange={handleBio} />

            <label>Social Links</label>
            <input type="text" value={socialLinks} onChange={handleSocialLinks} maxLength="50" />

            <label>Profile Picture</label>
            <p>Upload a profile picture for your profile. format: .jpg</p>
            <input type="file" accept=".jpg" onChange={handleProfilePicture} />

            {profilePicture && (
              <div className="profile-picture-preview">
                <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" width="100" height="100" />
              </div>
            )}

            {backendError && <p className="error-message">{backendError}</p>}
            <button type="submit" onClick={(e) => handleSubmitLastStep(e)}>
              Submit
            </button>
            <ToastContainer />
          </form>
        </div>
      )}
    </>
    )

}


export default ArtistSignUp;