<<<<<<< HEAD
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
=======
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
>>>>>>> 8f57f0c (initial commit)

const UserAuthenticationNavbar = () => {
  return (
    <>
<<<<<<< HEAD
      {/* <Navbar variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <i
              className="bi bi-house-door-fill"
              style={{ fontSize: "24px" }}
            ></i>
          </Navbar.Brand>
        </Container>
      </Navbar> */}
=======
      <div
        style={{
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignContent: "center",
              gap: "10px",
              padding: "10px",
            }}
          >
            <Link to="/">
              <div>
                <i
                  className="bi bi-house-door-fill"
                  style={{
                    fontSize: "19px",
                    color: "#084d52",
                  }}
                ></i>
              </div>
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "None",
                color: "inherit",
              }}
            >
              <div
                style={{
                  color: "#084d52",
                  fontWeight: "bolder",
                  paddingTop: "3px",
                }}
              >
                Home
              </div>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              gap: "10px",
              paddingTop: "10px",
              fontSize: "10px",
              color: "#084d52",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <p>Login</p>
              </div>
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "None",
                color: "inherit",
              }}
            >
              <div>
                <p>Signup</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
>>>>>>> 8f57f0c (initial commit)
    </>
  );
};

export default UserAuthenticationNavbar;
