import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export default function Feed({ videos }) {
  const [muteMap, setMuteMap] = useState({});
  const [likedMap, setLikedMap] = useState({});
  const [savedMap, setSavedMap] = useState({});

  // LIKE
  async function likeVideo(item) {
    const res = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    setLikedMap((prev) => ({
      ...prev,
      [item._id]: res.data.like,
    }));
  }

  // SAVE
  async function saveVideo(item) {
    const res = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    setSavedMap((prev) => ({
      ...prev,
      [item._id]: res.data.save,
    }));
  }

  return (
    <div className="feed">
      {[...videos].reverse().map((item) => (
        <div className="video-wrapper" key={item._id}>
          
          {/* VIDEO */}
          <video
            src={item.video}
            className="video"
            autoPlay
            loop
            muted={muteMap[item._id] ?? true}
            onClick={() =>
              setMuteMap((prev) => ({
                ...prev,
                [item._id]: !prev[item._id],
              }))
            }
          />

          {/* OVERLAY */}
          <div className="overlay">
            <p className="description">{item.description}</p>

            <div className="actions">
              
              {/* LIKE */}
              <div className="action-item">
                <button
                  onClick={() => likeVideo(item)}
                  className="icon-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={
                      likedMap[item._id] === true
                        ? "#ff3b5c"
                        : "currentColor"
                    }
                  >
                    <path d="M16.5 3C19.5 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.3 3 11 4 12 5C13 4 14.6 3 16.5 3Z" />
                  </svg>
                </button>
                <span className="count">{item.likeCount || 0}</span>
              </div>

              {/* SAVE */}
              <div className="action-item">
                <button
                  onClick={() => saveVideo(item)}
                  className={`icon-btn ${
                    savedMap[item._id] ? "saved" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 2H19C19.5 2 20 2.4 20 3V22L12 18L4 22V3C4 2.4 4.4 2 5 2Z" />
                  </svg>
                </button>
                <span className="count">{item.saveCount || 0}</span>
              </div>
            </div>

            <Link
              className="visit-btn"
              to={"/food-partner/" + item.foodPartner}
            >
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}