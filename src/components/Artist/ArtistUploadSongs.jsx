import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const ArtistUploadSongs = ({
    artist,
    setArtistHome,
    setUploadSongs
}) => {

    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        coverImage: null,
        mp3File: null,
        language: "",
        releaseDate: "",
        lyrics: "",
        albumId: ""
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [backendError, setBackendError] = useState("");
    const [error, setError] = useState(false);
    
    const handleTitle = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                title: e.target.value
            }
        ));
    };

    const handleGenre = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                genre: e.target.value
            }
        ));
    };

    const handleLanguage = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                language: e.target.value
            }
        ));
    };

    const handleReleaseDate = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                releaseDate: e.target.value
            }
        ));
    };


    const handleLyrics = (e) => {
        setFormData((prev) => ({
            ...prev, 
            lyrics: e.target.value
        }))
    };

    const handleAlbum = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                albumId: e.target.value
            }
        ));
    };

    const handleCoverImage = (e) => {
        const file = e.target.files[0];
        if (file) {
           const fileExtension = file.name.split('.').pop().toLowerCase();
           const allowedExtensions = ['jpg', 'jpeg'];
   
           if (!allowedExtensions.includes(fileExtension)) {
            toast.error("Cover image must be a JPG or JPEG file.");
            return;
           }

           setFormData((prev) => (
            {
                ...prev,
                coverImage: file
            }
           ))
        };
    };


    const handleMusicFile = (e) => {
    const file = e.target.files[0];
    if (file) {

      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['mp3'];

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Audio file must be an MP3 file.");
        return;
      }
      setFormData((prev) => ({ ...prev, mp3File: file }));
    }
  };

   const handleSubmitLastStep = async (e) => {
    e.preventDefault();
   }


  return (
    <>
    <div className="signup-container" style={{
        padding:"5px"
    }}>
      <h3 className="signup-title">Upload Songs</h3>
      <form className="signup-form">
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleTitle} />

        <label>Genre</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleGenre} />

        <label>Album</label>
        <select onChange={handleAlbum}>
          <option value="">-- Select an Album --</option>
          {
            (data?.albums) ? data?.albums?.map(album => (
              <option key={album?.id} value={album?.id} >
                {album?.title}
              </option>
            )) : ""


          }

        </select>
        <br/>
        <label>Language</label>
        <input type="text" name="language" value={formData.language} onChange={handleLanguage} />

        <label>Release Date</label>
        <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleReleaseDate} />

        <label>Cover Image</label>
        <input type="file" name="coverImage" accept=".jpg" onChange={handleCoverImage} />
        {formData.coverImage && (
          <div className="profile-picture-preview">
            <img
              src={URL.createObjectURL(formData.coverImage)}
              alt="Cover Preview"
              width="100"
              height="100"
            />
          </div>
        )}

        <label>Audio File</label>
        <input type="file" name="mp3File" accept=".mp3" onChange={handleMusicFile} />

        <label>Lyrics</label>
        <input type="text" name="lyrics" value={formData.lyrics} onChange={handleLyrics} />

        <button type="submit" onClick={handleSubmitLastStep}>
          Submit
        </button>
       
        {error ? <span>{backendError}</span> : ""}
      </form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default ArtistUploadSongs;