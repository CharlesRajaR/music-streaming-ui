import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import "../css/Signup.css";

const Signup = () => {
  const [next, setNext] = useState(true);
  const handleNext = (e) => {
    e.preventDefault();
    setNext(false);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [next1, setNext1] = useState(true);
  const handleNext1 = (e) => {
    e.preventDefault();
    setNext1(false);
  };

  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [location, setLocation] = useState("");
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmitLastStep = (e) => {
    e.preventDefault();
    setName("");
    setLocation("");
    setEmail("");
    setPassword("");
    setNext(true);
  };

  return (
    <>
      {next ? (
        <div className="signup-container">
          <h2 className="signup-title">Sign up to start listening</h2>
          <form className="signup-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={handleEmail}
              maxLength="50"
            />
            {/* {emailError && <span style={{ color: "red" }}>{emailError}</span>}
             */}

            <button type="submit" onClick={handleNext}>
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
              onChange={handlePassword}
              maxLength="50"
            />
            {/* {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}
             */}
            <button type="submit" onClick={handleNext1}>
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
            <input
              type="text"
              value={name}
              onChange={handleName}
              required
              maxLength="50"
            />
            {/* {nameError && <span style={{ color: "red" }}>{nameError}</span>} */}

            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={handleLocation}
              maxLength="50"
            />
            {/* {locationError && <span style={{ color: "red" }}>{locationError}</span>} */}

            <p>We will recommend songs based on your location</p>
            {/* {backendError && <p className="error-message">{backendError} */}

            <button type="submit" onClick={handleSubmitLastStep}>
              Next
            </button>
            <ToastContainer />
          </form>
        </div>
      )}
      <button onClick={handleNext}></button>
    </>
  );
};

export default Signup;
