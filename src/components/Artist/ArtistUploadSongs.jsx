import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';

const ArtistUploadSongs = ({ artist, setArtistHome, setUploadSongs }) => {
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

  const [uploading, setUploading] = useState(false);
  const themeGreenBlue = "#20b2aa";

  // Generic handler for all text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    if (type === 'coverImage' && !['jpg', 'jpeg'].includes(extension)) {
      toast.error("Cover image must be JPG/JPEG");
      return;
    }
    if (type === 'mp3File' && extension !== 'mp3') {
      toast.error("Audio must be an MP3 file");
      return;
    }

    setFormData((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.mp3File) {
      toast.warn("Please provide at least a title and an audio file.");
      return;
    }

    setUploading(true);
    // Simulate API Call
    setTimeout(() => {
      setUploading(false);
      toast.success("Song uploaded successfully!");
      // Optional: Redirect home after success
      // setUploadSongs(false); setArtistHome(true);
    }, 2000);
  };

  return (
    <div style={{ 
      padding: "20px", 
      minHeight: "90vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div className="container shadow-lg" style={{ 
        background: "rgba(15, 23, 42, 0.8)", 
        borderRadius: "15px", 
        padding: "30px", 
        backdropFilter: "blur(15px)",
        border: `1px solid ${themeGreenBlue}33`,
        maxWidth: "800px",
        color: "white"
      }}>
        <h3 className="text-center mb-4" style={{ color: themeGreenBlue, fontWeight: "bold" }}>
          <i className="bi bi-cloud-arrow-up-fill me-2"></i> Upload New Track
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Song Title</label>
              <input 
                type="text" name="title" className="form-control bg-dark text-white border-secondary"
                value={formData.title} onChange={handleChange} placeholder="e.g. Midnight Waves" required 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Genre</label>
              <input 
                type="text" name="genre" className="form-control bg-dark text-white border-secondary"
                value={formData.genre} onChange={handleChange} placeholder="e.g. Lo-fi" 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Language</label>
              <input 
                type="text" name="language" className="form-control bg-dark text-white border-secondary"
                value={formData.language} onChange={handleChange} 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Release Date</label>
              <input 
                type="date" name="releaseDate" className="form-control bg-dark text-white border-secondary"
                value={formData.releaseDate} onChange={handleChange} 
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Lyrics</label>
              <textarea 
                name="lyrics" className="form-control bg-dark text-white border-secondary" rows="3"
                value={formData.lyrics} onChange={handleChange} placeholder="Paste lyrics here..."
              />
            </div>

            {/* File Uploads Section */}
            <div className="col-md-6 mb-4">
              <label className="form-label" style={{ color: themeGreenBlue }}>Cover Image (JPG)</label>
              <input 
                type="file" accept=".jpg,.jpeg" className="form-control bg-dark text-white border-secondary"
                onChange={(e) => handleFileChange(e, 'coverImage')} 
              />
              {formData.coverImage && (
                <div className="mt-2 text-center">
                  <img 
                    src={URL.createObjectURL(formData.coverImage)} 
                    alt="Preview" style={{ height: "80px", width: "80px", borderRadius: "8px", objectFit: "cover", border: `1px solid ${themeGreenBlue}` }} 
                  />
                </div>
              )}
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label" style={{ color: themeGreenBlue }}>Audio File (MP3)</label>
              <input 
                type="file" accept=".mp3" className="form-control bg-dark text-white border-secondary"
                onChange={(e) => handleFileChange(e, 'mp3File')} 
              />
              {formData.mp3File && (
                <small className="text-success d-block mt-2">✓ {formData.mp3File.name}</small>
              )}
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              disabled={uploading}
              className="btn btn-lg" 
              style={{ backgroundColor: themeGreenBlue, color: "#0f172a", fontWeight: "bold", transition: "0.3s" }}
            >
              {uploading ? <ClipLoader size={20} color="#0f172a" /> : "Publish Track"}
            </button>
            <button 
              type="button" 
              className="btn btn-outline-light btn-sm mt-2" 
              onClick={() => { setUploadSongs(false); setArtistHome(true); }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default ArtistUploadSongs;