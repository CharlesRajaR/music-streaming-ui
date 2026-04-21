import { useState } from 'react';
import "../../css/Login.css"
import ArtistHomePage from './ArtistHomePage';

const ArtistLogin = (
    { 
        setArtistHomebuttons, 
        songs, 
        setSongs, 
        artistHome, 
        setArtistHome, 
        uploadSongs, 
        setUploadSongs, 
        concert, 
        setConcert, 
        album, 
        setAlbum
    }) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [home, setHome] = useState(false);
    const [artist, setArtist] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const userData = { email, password };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
    {/* {loading && <Overlay show={true}/>} */}
      {
        (!home) ? (<div className="login-container">
          <h3 className="login-title">Log in to Melodify </h3>
          <form className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={handleEmail}
               maxLength="50"
            />
            <label>Password</label>
            <input type="password" placeholder="enter your password" maxLength="50" value={password} onChange={handlePassword} />

            {error && <span>{error}</span>}
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </button>
          </form>
        </div>) :
         (<ArtistHomePage
            artist={artist}
            setArtistHomebuttons={setArtistHomebuttons} 
            songs={songs} 
            setSongs={setSongs}
            artistHome={artistHome} 
            setArtistHome={setArtistHome} 
            uploadSongs={uploadSongs} 
            setUploadSongs={setUploadSongs} 
            concert={concert} 
            setConcert={setConcert} 
            album={album} 
            setAlbum={setAlbum} />)
      }
      {/* <ToastContainer /> */}
    </div>
    )
}

export default ArtistLogin;