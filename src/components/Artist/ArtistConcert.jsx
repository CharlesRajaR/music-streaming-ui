import { useState } from "react";

const ArtistConcert = ({
    artist, setArtistHome, setConcert
}) => {

    const [backendError, setBackendError] = useState("");
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        date: "",
        location: "",
        artistId: artist?.id,
    });

    const handleLocation = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                location: e.target.value
            }
        ));
    };

    const handleDate = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                data: e.target.value
            }
        ));
    };

    const handleSubmitLastStep = (e) => {
        e.preventDefault();
    }

    const today = new Date().toISOString().split('T')[0];
    return (
        <>
        <div className="signup-container">
            <h3 className="signup-title">
                New Concert
            </h3>
            <form className="signup-form">
                <label>Concert Date</label>
                <input type="date" name="Date" value={formData.date} onChange={handleDate} min={today}/>
                
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleLocation} />
                 
                <button type="submit" onClick={handleSubmitLastStep}>
                    Submit
                </button>
            </form>
        </div>
        </>
    )
} 

export default ArtistConcert;