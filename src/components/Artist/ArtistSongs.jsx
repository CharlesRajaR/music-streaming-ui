import EditSongModal from "./EditSongModal";
import DeleteSongModal from "../DeleteSongModal";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify"; // Corrected import
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

  // Theme Colors
  const themeGreenBlue = "#20b2aa"; // Light Sea Green
  const themeDeepTeal = "#008080"; // Teal

  const { VITE_SONG_STREAM, VITE_FETCH_SONG_IMAGE, VITE_ALBUM_IMAGE } = import.meta.env;

  const handlePlay = (id) => {
    if (typeof id === 'string' && id.startsWith('http')) {
      setAudioUrl(id);
    } else {
      const timestamp = new Date().getTime();
      setAudioUrl(`${VITE_SONG_STREAM}/${id}?t=${timestamp}`);
    }
  };

  const fetchData = async () => {
    // This is where your Axios call will go
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
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" }}>
        <ClipLoader color={themeGreenBlue} size={60} />
        <h3 style={{ color: "white", marginTop: "15px" }}>Syncing Library...</h3>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #0f172a 0%, #004d4d 100%)", 
      minHeight: "100vh", 
      padding: "40px 20px",
      color: "#f8fafc"
    }}>
      <ToastContainer theme="dark" />
      
      <div className="container shadow-lg" style={{ 
        background: "rgba(15, 23, 42, 0.8)",
        borderRadius: "15px", 
        padding: "30px", 
        backdropFilter: "blur(10px)"
         }}>
        <header style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "30px", 
            borderBottom: `2px solid ${themeGreenBlue}`, 
            paddingBottom: "10px" }}>
          <h2 style={{ margin: 0, fontWeight: "700", letterSpacing: "1px" }}>
            <i className="bi bi-music-note-list"></i> Uploaded Content
          </h2>
          <span className="badge" style={{ backgroundColor: themeDeepTeal, padding: "10px 15px" }}>
            {data?.songs?.length || 0} Tracks Total
          </span>
        </header>

        <div className="table-responsive">
          <table className="table table-hover table-borderless text-white align-middle">
            <thead style={{ color: themeGreenBlue, borderBottom: "1px solid #334155" }}>
              <tr>
                <th>ID</th>
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
                <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ opacity: 0.6 }}>{i + 1}</td>
                  <td style={{ fontWeight: "600" }}>{item.title}</td>
                  <td>{item.genre}</td>
                  <td style={{ fontSize: "0.85rem" }}>{item.releaseDate}</td>
                  <td>
                    <img
                      src={item.id.startsWith('http') ? `https://picsum.photos/seed/${i}/100` : `${VITE_FETCH_SONG_IMAGE}/${item.id}`}
                      style={{ borderRadius: "12px", height: "60px", width: "60px", objectFit: "cover", border: `2px solid ${themeDeepTeal}` }}
                      alt="cover"
                    />
                  </td>
                  <td>
                    {item.albumId ? (
                      <img
                        src={`https://picsum.photos/seed/album${i}/100`} // Use VITE_ALBUM_IMAGE here later
                        style={{ borderRadius: "6px", height: "40px", width: "40px" }}
                        alt="album"
                      />
                    ) : <span style={{ opacity: 0.4 }}>—</span>}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        onClick={() => handlePlay(item.id)} 
                        className="btn btn-sm" 
                        style={{ backgroundColor: themeGreenBlue, color: "white", borderRadius: "8px" }}
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

        {/* Floating Player Section */}
        <div style={{ 
          marginTop: "40px", 
          padding: "20px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "12px",
          border: `1px solid ${themeDeepTeal}`
        }}>
          {audioUrl ? (
            <div className="text-center">
              <p style={{ color: themeGreenBlue, fontSize: "0.9rem", marginBottom: "10px" }}>Now Playing Track...</p>
              <audio
                ref={audioRef}
                // crossOrigin="anonymous"
                controls
                style={{ width: "100%", filter: "hue-rotate(140deg) brightness(1.2)" }}
                onError={() => setAudioError("Audio stream unavailable")}
              >
                <source src={audioUrl} type="audio/mp3" />
              </audio>
            </div>
          ) : (
            <p className="text-center" style={{ opacity: 0.5, margin: 0 }}>Select a track to start the player</p>
          )}
          {audioError && <div className="text-danger text-center mt-2 small">{audioError}</div>}
        </div>
      </div>
    </div>
  );
};

export default ArtistSongs;