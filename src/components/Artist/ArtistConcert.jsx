import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ArtistConcert = ({ artist, setArtistHome, setConcert }) => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    artistId: artist?.id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const themeGreenBlue = "#20b2aa";

  // Single handler for text and date inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.location) {
      toast.warn("Please provide both a date and a location.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API logic
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Concert in ${formData.location} scheduled!`);
      // Optional: Redirect home
      // setConcert(false); setArtistHome(true);
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ 
      padding: "20px", 
      minHeight: "80vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div className="container shadow-lg" style={{ 
        background: "rgba(15, 23, 42, 0.85)", 
        borderRadius: "20px", 
        padding: "40px", 
        backdropFilter: "blur(12px)",
        border: `1px solid ${themeGreenBlue}44`,
        maxWidth: "450px",
        color: "white"
      }}>
        <div className="text-center mb-4">
          <h3 style={{ color: themeGreenBlue, fontWeight: "bold" }}>
            <i className="bi bi-calendar-event me-2"></i> Schedule Concert
          </h3>
          <p className="small" style={{ opacity: 0.7 }}>Let your fans know where you'll be next!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.9rem" }}>Concert Date</label>
            <input 
              type="date" 
              name="date" 
              className="form-control bg-dark text-white border-secondary"
              style={{ borderRadius: "8px" }}
              value={formData.date} 
              onChange={handleChange} 
              min={today}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontSize: "0.9rem" }}>Location</label>
            <div className="input-group">
              <span className="input-group-text bg-secondary border-secondary text-white">
                <i className="bi bi-geo-alt"></i>
              </span>
              <input 
                type="text" 
                name="location" 
                className="form-control bg-dark text-white border-secondary"
                style={{ borderRadius: "0 8px 8px 0" }}
                value={formData.location} 
                onChange={handleChange} 
                placeholder="City, Stadium or Venue"
                required
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-lg" 
              style={{ 
                backgroundColor: themeGreenBlue, 
                color: "#0f172a", 
                fontWeight: "bold",
                borderRadius: "10px",
                transition: "0.3s"
              }}
            >
              {isSubmitting ? "Processing..." : "Confirm Concert"}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline-light btn-sm mt-1" 
              style={{ border: "none", opacity: 0.6 }}
              onClick={() => { setConcert(false); setArtistHome(true); }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  );
};

export default ArtistConcert;