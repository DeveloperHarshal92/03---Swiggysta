import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/saved.css";

export default function Saved() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        setFoods(response.data.foods || []);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });
  }, []);

  return (
    <div className="saved-container">
      <h2 className="saved-title">Saved</h2>

      {foods.length === 0 ? (
        <div className="empty">No saved videos yet</div>
      ) : (
        <div className="saved-grid">
          {foods.map((item) => (
            <div key={item._id} className="saved-card">
              <video
                src={item.video}
                muted
                loop
                playsInline
                className="saved-video"
              />

              <div className="saved-overlay">
                <p className="saved-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
