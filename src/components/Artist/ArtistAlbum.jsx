import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const ArtistAlbum = ({
    artist,
    setArtistHome,
    setAlbum
}) => {

    const [formData, setFormData] = useState({
        title: "",
        releaseDate: "",
        coverImage: null,
        artistId: "",
    });

    const [backendError, setBackendError] = useState("");
    const [error, setError] = useState(false);

    const handleTitle = (e) => {
        setFormData((prev) => ({
            ...prev, title:e.target.value
        }));
    }

    const handleReleaseDate = (e) => {
        setFormData((prev) => ({
            ...prev, releaseDate: e.target.value
        }))
    }


    const handleCoverImage = (e) => {
        const file = e.target.files[0];

        if(file){
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const allowedExtension = ['jpg', 'jpeg'];

            if(!allowedExtension.includes(fileExtension)){
                toast.error("Cover image must be in jpg or jpeg format");
                return;
            }

            setFormData((prev) => ({
                ...prev, coverImage: file
            }));
        }
    }

    const handleSubmitLastStep = async (e) => {
        e.preventDefault();
    }

    return (
        <>
        <div className="signup-container">
            <h3 className="signup-title">Create new Album</h3>
            <form className="signup-form">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleTitle} />

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

            <button type="submit" onClick={handleSubmitLastStep}>
                Submit
            </button>
            <ToastContainer />
         {error ? <span>{backendError}</span> : ""}
         </form>
        </div>
        </>
    )
}

export default ArtistAlbum;