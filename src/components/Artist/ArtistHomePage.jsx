import React, { useState, useEffect } from 'react';
import ArtistSongs from './ArtistSongs';
import ArtistUploadSongs from './ArtistUploadSongs';
import ArtistConcert from './ArtistConcert';
import ArtistAlbum from './ArtistAlbum';
import { ClipLoader } from "react-spinners";

const ArtistHomePage = ({ 
  // Destructuring props with default dummy values for testing
  artist = {
    id: 1,
    name: "Charles Raja",
    bio: "Engineering graduate & Music Producer. Creating Lo-fi beats and Cinematic soundscapes from Tamil Nadu.",
    socialLinks: "https://instagram.com",
    users: new Array(1250) // Simulating 1250 followers
  }, 
  setArtistHomebuttons = () => {}, 
  songs =  true, 
  artistHome = false, 
  setArtistHome, 
  uploadSongs, 
  setUploadSongs, 
  concert, 
  setConcert, 
  album, 
  setAlbum 
}) => {

  const [imageLoading, setImageLoading] = useState(true);
  
  // Theme Colors
  const themeGreenBlue = "#20b2aa";
  const themeDeepTeal = "#004d4d";

  // Fixed: Moving side effect into useEffect to prevent re-render loops
  useEffect(() => {
    setArtistHomebuttons(false);
  }, [setArtistHomebuttons]);

  // Reset loader when switching back to home
  useEffect(() => {
    if (artistHome) setImageLoading(true);
  }, [artistHome]);

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #0f172a 0%, ${themeDeepTeal} 100%)", 
      minHeight: "100vh",
      color: "white",
      padding: "20px" 
    }}>
      {artistHome ? (
        <div className="container shadow-lg" style={{ 
          background: "rgba(15, 23, 42, 0.7)", 
          borderRadius: "20px", 
          padding: "40px", 
          backdropFilter: "blur(10px)",
          maxWidth: "800px",
          marginTop: "30px",
          textAlign: "center",
          border: `1px solid ${themeGreenBlue}55`
        }}>
          {/* Profile Image Section */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", position: "relative" }}>
            {imageLoading && (
              <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
                <ClipLoader color={themeGreenBlue} size={60} />
              </div>
            )}
            <img
              src={`https://picsum.photos/seed/${artist.id}/400`} // Dummy Image
              alt="Artist Profile"
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "350px",
                borderRadius: "15px",
                objectFit: "cover",
                border: `3px solid ${themeGreenBlue}`,
                display: imageLoading ? "none" : "block",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>

          {/* Profile Info */}
          <h1 style={{ fontSize: "3rem", fontWeight: "800", color: themeGreenBlue }}>
            {artist.name}
          </h1>
          
          <p style={{ fontSize: "1.1rem", opacity: 0.9, lineHeight: "1.6", margin: "20px 0" }}>
            {artist.bio}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", marginTop: "20px" }}>
            <a href={artist.socialLinks} target="_blank" rel="noreferrer" style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "10px 20px", 
              borderRadius: "30px", 
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              fontSize: "0.9rem"
            }}>
              <i className="bi bi-instagram"></i> Instagram
            </a>
            
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "20px" }}>
              <h4 style={{ margin: 0, color: themeGreenBlue }}>
                <b>{artist.users ? artist.users.length.toLocaleString() : "0"}</b>
              </h4>
              <small style={{ opacity: 0.6, textTransform: "uppercase" }}>Followers</small>
            </div>
          </div>
        </div>
      ) : (
        /* Component Router Section */
        <div style={{ height: "auto", transition: "all 0.3s ease" }}>
          {songs && <ArtistSongs artist={artist} />}

          {uploadSongs && <ArtistUploadSongs 
          artist={artist} 
          setArtistHome={setArtistHome} 
          setUploadSongs={setUploadSongs} />}

          {album && <ArtistAlbum 
          artist={artist} 
          setArtistHome={setArtistHome} 
          setAlbum={setAlbum} />}
          
          {concert && <ArtistConcert 
          artist={artist} 
          setArtistHome={setArtistHome} 
          setConcert={setConcert} />}
        </div>
      )}
    </div>
  );
}

export default ArtistHomePage;