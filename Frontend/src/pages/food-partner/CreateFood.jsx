import "../../styles/create-food.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateFood() {
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const fileRef = useRef();

  const navigate = useNavigate()

  // 🔁 Preview URL
  useEffect(() => {
    if (!video) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(video);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url);
  }, [video]);

  // 📤 Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!video || !name.trim()) {
      alert("Video and name are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("video", video);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/",
        formData,
        { withCredentials: true },
      );

      console.log(response.data);

      // Reset form (optional but makes you look professional)
      setVideo(null);
      setName("");
      setDesc("");
      fileRef.current.value = null;
      navigate("/")
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="cf-container">
      <div className="cf-card">
        <h2>Create Food</h2>
        <p className="cf-sub">Upload a video and add details</p>

        <form className="cf-form" onSubmit={onSubmit}>
          {/* Upload */}
          <div className="cf-upload" onClick={() => fileRef.current.click()}>
            <input
              required
              type="file"
              ref={fileRef}
              accept="video/*"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />

            {!video && <p>Tap to upload video</p>}

            {video && (
              <div className="cf-file-info">
                <span>{video.name}</span>

                <div className="cf-actions">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileRef.current.click();
                    }}
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideo(null);
                      fileRef.current.value = null;
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {videoURL && (
            <div className="cf-preview">
              <video src={videoURL} controls muted />
            </div>
          )}

          {/* Name */}
          <input
            required
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description */}
          <textarea
            required
            placeholder="Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* Submit */}
          <button type="submit" disabled={!video || !name.trim()}>
            Post Food
          </button>
        </form>
      </div>
    </div>
  );
}
