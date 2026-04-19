import { Container, Navbar } from "react-bootstrap";

const ArtistNavbar = () => {
  return (
    <>
      <Navbar variant="dark" expand="lg" fixeed="top">
        <Container>
          <h2 style={{ color: "white" }}>forArtists</h2>
        </Container>
      </Navbar>
    </>
  );
};

export default ArtistNavbar;
