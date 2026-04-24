import EditSongModal from "./EditSongModal";
import DeleteSongModal from "../DeleteSongModal";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const dummyData = {
  songs: [
    {
      id: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Neon Horizon",
      genre: "Electronic",
      language: "Instrumental",
      releaseDate: "2026-04-24",
      status: "Published",
      albumId: 101
    },
    {
      id: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      title: "Aqua Beats",
      genre: "Dance",
      language: "Instrumental",
      releaseDate: "2026-04-24",
      status: "Published",
      albumId: null
    }
  ]
};

const ArtistSongs = ({ artist }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [data, setData] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState("");
  const audioRef = useRef(null);

  const themeGreenBlue = "#20b2aa";
  const themeDeepTeal = "#008080";

  const { VITE_SONG_STREAM, VITE_FETCH_SONG_IMAGE, VITE_ALBUM_IMAGE } = import.meta.env;

  const handlePlay = (id) => {
    setAudioError(""); // Clear errors on new play
    if (typeof id === 'string' && id.startsWith('http')) {
      setAudioUrl(id);
    } else {
      const timestamp = new Date().getTime();
      setAudioUrl(`${VITE_SONG_STREAM}/${id}?t=${timestamp}`);
    }
  };

  const fetchData = async () => {
    console.log("Refreshing song list...");
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setAudioError("Playback blocked. Interaction required."));
    }
  }, [audioUrl]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <ClipLoader color={themeGreenBlue} size={60} />
        <h3 style={{ color: "white", marginTop: "15px" }}>Syncing Library...</h3>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "transparent", 
      minHeight: "100vh", 
      padding: "20px 10px", // Reduced padding for mobile
      color: "#f8fafc"
    }}>
      <ToastContainer theme="dark" />
      
      <div className="container-fluid shadow-lg" style={{ 
        background: "rgba(15, 23, 42, 0.8)",
        borderRadius: "15px", 
        padding: "20px", // Responsive padding
        backdropFilter: "blur(10px)",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        
        {/* Responsive Header */}
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4" 
                style={{ borderBottom: `2px solid ${themeGreenBlue}`, paddingBottom: "15px", gap: "10px" }}>
          <h2 style={{ margin: 0, fontWeight: "700", fontSize: "calc(1.2rem + 1vw)" }}>
            <i className="bi bi-music-note-list"></i> Uploaded Content
          </h2>
          <span className="badge" 
            >
            
            {data?.songs?.length || 0} Tracks Total
          </span>
        </header>

        {/* Table wrapper for horizontal scroll on small screens */}
        <div className="table-responsive" 
        style={{ 
    overflowX: "auto", 
    WebkitOverflowScrolling: "touch", // Smooth scrolling for iOS
    marginBottom: "20px"
}}
        >
          <table className="table table-hover table-borderless text-white align-middle" style={{ minWidth: "800px" }}>
            <thead style={{ color: themeGreenBlue, borderBottom: "1px solid #334155", backgroundColor: "rgba(0,0,0,0.2)" }}>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Release</th>
                <th>Cover</th>
                <th>Album</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.songs.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #1e293b", transition: "0.3s" }}>
                  <td style={{ opacity: 0.6 }}>{i + 1}</td>
                  <td style={{ fontWeight: "600", minWidth: "150px" }}>{item.title}</td>
                  <td><span className="badge border border-info text-info">{item.genre}</span></td>
                  <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>{item.releaseDate}</td>
                  <td>
                    <img
                      src={item.id.startsWith('http') ? `https://picsum.photos/seed/${i}/100` : `${VITE_FETCH_SONG_IMAGE}/${item.id}`}
                      style={{ borderRadius: "8px", height: "50px", width: "50px", objectFit: "cover", border: `1px solid ${themeDeepTeal}` }}
                      alt="cover"
                    />
                  </td>
                  <td>
                    {item.albumId ? (
                      <img
                        src={`https://picsum.photos/seed/album${i}/100`}
                        style={{ borderRadius: "4px", height: "35px", width: "35px" }}
                        alt="album"
                      />
                    ) : <span style={{ opacity: 0.3 }}>None</span>}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        onClick={() => handlePlay(item.id)} 
                        className="btn btn-sm" 
                        style={{ backgroundColor: themeGreenBlue, color: "#0f172a", fontWeight: "bold", padding: "5px 12px" }}
                      >
                        Play
                      </button>
                      <EditSongModal song={item} fetchData={fetchData} />
                      <DeleteSongModal songId={item.id} songName={item.title} fetchData={fetchData} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Player Section - Full Width on Mobile */}
        <div style={{ 
          marginTop: "30px", 
          padding: "15px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "15px",
          border: `1px solid ${themeDeepTeal}55`
        }}>
          {audioUrl ? (
            <div className="text-center w-100">
              <p style={{ color: themeGreenBlue, fontSize: "0.85rem", marginBottom: "8px", fontWeight: "500" }}>
                <i className="bi bi-play-circle-fill me-2"></i> Streaming Now
              </p>
              <audio
                ref={audioRef}
                controls
                className="w-100"
                style={{ filter: "hue-rotate(140deg) brightness(1.1)", height: "40px" }}
                onError={() => setAudioError("Audio stream unavailable")}
              >
                <source src={audioUrl} type="audio/mp3" />
              </audio>
            </div>
          ) : (
            <div className="text-center py-2" style={{ opacity: 0.4 }}>
              <i className="bi bi-music-note-beamed me-2"></i>
              <small>Choose a track from your library</small>
            </div>
          )}
          {audioError && <div className="text-danger text-center mt-2 small fw-bold">{audioError}</div>}
        </div>
      </div>
    </div>
  );
};

export default ArtistSongs;