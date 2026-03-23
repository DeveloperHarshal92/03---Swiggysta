import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios
      .post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: userName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Registration error :" + err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create User Account</h2>
        <p className="auth-sub">Order food in seconds</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input full-width"
            name="username"
            placeholder="Username"
          />

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
