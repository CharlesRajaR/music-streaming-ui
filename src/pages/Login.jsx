import { useState } from "react";
import UserAuthenticationNavbar from "../components/User/UserAuthenticationNavbar";
import "../css/Login.css";
import { ToastContainer } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //   const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "rgb(11, 11, 11)",
            height: "70px",
          }}
        >
          <UserAuthenticationNavbar />
        </div>

        <div className="login-container">
          <h3 className="login-title">Log in to App</h3>
          <form className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              maxLength="50"
              onChange={handleEmail}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              maxLength="50"
              onChange={handlePassword}
            />

            {/* { error && <span>{error}</span>} */}

            <button type="submit" onClick={handleSubmit}>
              Login
            </button>

            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
