import React, { useState } from "react";
import ArtistSignUp from "../components/Artist/ArtistSignup";
import ArtistLogin from "../components/Artist/ArtistLogin";
import ArtistHomePage from "../components/Artist/ArtistHomePage";

const Artists = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Navigation States
  const [artistHome, setArtistHome] = useState(true);
  const [songs, setSongs] = useState(false);
  const [uploadSongs, setUploadSongs] = useState(false);
  const [album, setAlbum] = useState(false);
  const [concert, setConcert] = useState(false);

  const [artist] = useState({
    id: 1,
    name: "Charles Raja",
    bio: "Full-stack Developer & Artist",
    socialLinks: "https://instagram.com/charles",
    users: new Array(1250)
  });

  const resetViews = () => {
    setArtistHome(false);
    setSongs(false);
    setUploadSongs(false);
    setAlbum(false);
    setConcert(false);
    setIsNavCollapsed(true); // Close mobile menu after clicking
  };

  const themeGreenBlue = "#20b2aa";

  if (!isLoggedIn) {
    return showLogin ? (
      <ArtistLogin setLoggedIn={setIsLoggedIn} switchToSignUp={() => setShowLogin(false)} />
    ) : (
      <ArtistSignUp switchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: "#0f172a" }}>
      {/* Responsive Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" 
           style={{ backgroundColor: "#0f172a", borderBottom: `1px solid ${themeGreenBlue}33`, padding: "10px 20px" }}>
        <div className="container-fluid">
          <span className="navbar-brand" style={{ color: themeGreenBlue, fontWeight: "bold", letterSpacing: "1px" }}>
            ARTIST PANEL
          </span>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            style={{ borderColor: themeGreenBlue }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav ms-auto" style={{ gap: "10px" }}>
              {[
                { label: "Home", action: () => setArtistHome(true), active: artistHome },
                { label: "My Songs", action: () => setSongs(true), active: songs },
                { label: "Upload Song", action: () => setUploadSongs(true), active: uploadSongs },
                { label: "Create Album", action: () => setAlbum(true), active: album },
                { label: "Create Concert", action: () => setConcert(true), active: concert },
              ].map((item, index) => (
                <li className="nav-item" key={index}>
                  <button
                    onClick={() => { resetViews(); item.action(); }}
                    className="nav-link btn"
                    style={{
                      color: item.active ? themeGreenBlue : "white",
                      borderBottom: item.active ? `2px solid ${themeGreenBlue}` : "none",
                      transition: "0.3s",
                      fontWeight: item.active ? "bold" : "normal",
                      padding: "8px 15px",
                      textAlign: "left",
                      width: "100%"
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ marginTop: "-1px" }}> {/* Negative margin removes the white sliver */}
        <ArtistHomePage 
          artist={artist}
          artistHome={artistHome}
          setArtistHome={setArtistHome}
          songs={songs}
          uploadSongs={uploadSongs}
          setUploadSongs={setUploadSongs}
          album={album}
          setAlbum={setAlbum}
          concert={concert}
          setConcert={setConcert}
          setArtistHomebuttons={() => {}}
        />
      </main>
    </div>
  );
};

export default Artists;