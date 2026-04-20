import { Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UserAuthenticationNavbar from "./components/User/UserAuthenticationNavbar";
import Artists from "./pages/Artists";
// import Login from "./pages/Login"

function App() {
  return (
    <>
      {/* <Login/> */}
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
    </>
  );
}

export default App;
