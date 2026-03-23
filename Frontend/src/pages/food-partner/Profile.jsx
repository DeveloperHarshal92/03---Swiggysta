import "../../styles/profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      })
      .catch((error) => {
        console.error("Profile fetch failed:", error);
      });
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://images.unsplash.com/photo-1659354219028-cae11db067c4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>

        <div className="profile-info">
          <div className="business-name">{profile?.username}</div>
          <div className="business-address">{profile?.address}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat">
          <p className="stat-label">total meals</p>
          <p className="stat-value">{profile?.meals}</p>
        </div>

        <div className="stat">
          <p className="stat-label">customer serve</p>
          <p className="stat-value">{profile?.serve}</p>
        </div>
      </div>

      <div className="divider"></div>

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map((item, index) => (
          <div key={index} className="video-card">
            <video
              src={item.video}
              muted
              loop
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius : "10px"
              }}
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
}
