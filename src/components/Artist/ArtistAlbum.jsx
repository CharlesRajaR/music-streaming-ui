import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ArtistAlbum = ({ artist, setArtistHome, setAlbum }) => {
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    coverImage: null,
    artistId: artist?.id || "",
  });

  const [uploading, setUploading] = useState(false);
  const themeGreenBlue = "#20b2aa";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg'].includes(fileExtension)) {
        toast.error("Cover image must be in JPG or JPEG format");
        return;
      }
      setFormData((prev) => ({ ...prev, coverImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.releaseDate || !formData.coverImage) {
      toast.warn("Please fill in all fields including the cover image.");
      return;
    }

    setUploading(true);
    // Simulate API logic
    setTimeout(() => {
      setUploading(false);
      toast.success("Album created successfully!");
      // Navigate back after short delay if desired
      // setTimeout(() => { setAlbum(false); setArtistHome(true); }, 1500);
    }, 2000);
  };

  return (
    <div style={{ 
      padding: "20px", 
      minHeight: "85vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      background: "transparent"
    }}>
      <div className="container shadow-lg" style={{ 
        background: "rgba(15, 23, 42, 0.85)", 
        borderRadius: "20px", 
        padding: "35px", 
        backdropFilter: "blur(12px)",
        border: `1px solid ${themeGreenBlue}44`,
        maxWidth: "500px",
        color: "white"
      }}>
        <div className="text-center mb-4">
          <h3 style={{ color: themeGreenBlue, fontWeight: "bold", letterSpacing: "1px" }}>
            <i className="bi bi-journal-album me-2"></i> Create New Album
          </h3>
          <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Define your next big collection</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Album Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-control bg-dark text-white border-secondary"
              style={{ borderRadius: "8px" }}
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Summer Melodies"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Release Date</label>
            <input 
              type="date" 
              name="releaseDate" 
              className="form-control bg-dark text-white border-secondary"
              style={{ borderRadius: "8px" }}
              value={formData.releaseDate} 
              onChange={handleChange} 
            />
          </div>

          <div className="mb-4 text-center">
            <label className="form-label d-block text-start">Album Cover (JPG)</label>
            <div 
              style={{ 
                border: `2px dashed ${themeGreenBlue}66`, 
                padding: "20px", 
                borderRadius: "12px", 
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => document.getElementById('albumCoverInput').click()}
            >
              {formData.coverImage ? (
                <img
                  src={URL.createObjectURL(formData.coverImage)}
                  alt="Cover Preview"
                  style={{ width: "120px", height: "120px", borderRadius: "8px", objectFit: "cover" }}
                />
              ) : (
                <div style={{ padding: "20px", opacity: 0.5 }}>
                  <i className="bi bi-image" style={{ fontSize: "2rem" }}></i>
                  <p className="small mb-0">Click to upload cover</p>
                </div>
              )}
              <input 
                id="albumCoverInput"
                type="file" 
                hidden
                accept=".jpg,.jpeg" 
                onChange={handleCoverImage} 
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              disabled={uploading}
              className="btn btn-lg" 
              style={{ 
                backgroundColor: themeGreenBlue, 
                color: "#0f172a", 
                fontWeight: "bold",
                borderRadius: "10px",
                transition: "0.3s"
              }}
            >
              {uploading ? "Creating..." : "Create Album"}
            </button>
            
            <button 
              type="button" 
              className="btn btn-link text-white text-decoration-none btn-sm mt-1" 
              onClick={() => { setAlbum(false); setArtistHome(true); }}
            >
              Cancel and Go Back
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  );
};

export default ArtistAlbum;