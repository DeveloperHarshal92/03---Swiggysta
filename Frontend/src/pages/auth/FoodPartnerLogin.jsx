import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

export default function FoodPartnerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios
      .post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response.data);
        navigate("/create-food");
      })
      .catch((err) => {
        console.error("Login error: " + err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Login</h2>
        <p className="auth-sub">Access your restaurant dashboard</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input full-width"
            name="email"
            placeholder="Email"
          />

          <input
            className="auth-input full-width"
            name="password"
            type="password"
            placeholder="Password"
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
