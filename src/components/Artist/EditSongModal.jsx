import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const EditSongModal = ({song}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({

    });

    useEffect(() => {
        if (song) {
            setFormData({
                title: song?.title || "",
                genre: song?.genre || "",
                language: song?.language || "",
                lyrics: song?.lyrics || "",
                audioFile: null,
                coverImage:  null,
            });
        }
    }, [song]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
          
            <div>
            {loading ? <div className="overlay-modal visible" /> : ""}
            <Button variant="warning" onClick={handleOpen}>Edit</Button>
          
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="formLanguage">
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" name="language" value={formData.language} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="formLyrics">
                            <Form.Label>Lyrics</Form.Label>
                            <Form.Control as="textarea" rows={3} name="lyrics" value={formData.lyrics} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formAudioFile">
                            <Form.Label>Audio File</Form.Label>
                            <Form.Control type="file" name="audioFile" accept="audio/*" onChange={handleFileChange} />
                        </Form.Group>

                        <Form.Group controlId="formCoverImage">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="file" name="coverImage" accept="image/*" onChange={handleFileChange} />
                        </Form.Group>

                        <br />
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
};

export default EditSongModal;