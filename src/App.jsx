import { Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
<<<<<<< HEAD
=======
import UserAuthenticationNavbar from "./components/User/UserAuthenticationNavbar";
import Artists from "./pages/Artists";
>>>>>>> 8f57f0c (initial commit)
// import Login from "./pages/Login"

function App() {
  return (
    <>
      {/* <Login/> */}
<<<<<<< HEAD
      <Signup />
=======
      {/* <Signup /> */}
      {/* <NotificationContextProvider/> */}
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "rgb(11, 11, 11)",
          height: "70px",
        }}
      >
        <UserAuthenticationNavbar />
      </div> */}

      <Artists />
>>>>>>> 8f57f0c (initial commit)
    </>
  );
}

export default App;
