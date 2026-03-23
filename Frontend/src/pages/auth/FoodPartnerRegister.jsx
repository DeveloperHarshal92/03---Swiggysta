import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

export default function FoodPartnerRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const business = e.target.business.value;
    const contact = e.target.contact.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    await axios
      .post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          username: business,
          email,
          password,
          contactName: contact,
          phone,
          address,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        (console.log(response.data), navigate("/create-food"));
      })
      .catch((err) => {
        console.error("Registration error: " + err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Become a Food Partner</h2>
        <p className="auth-sub">Register your business</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input full-width"
            name="business"
            placeholder="Business Name"
          />

          <input
            className="auth-input"
            name="contact"
            placeholder="Contact Name"
          />

          <input
            className="auth-input"
            name="phone"
            placeholder="Phone Number"
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

          <textarea
            className="auth-input full-width"
            name="address"
            rows="3"
            placeholder="Business Address"
          ></textarea>

          <button className="auth-btn" type="submit">
            Create Partner Account
          </button>
        </form>
      </div>
    </div>
  );
}
