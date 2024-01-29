import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import your CSS file for styling

function LandingPage() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const redirectToTaskList = () => {
    if (userName.length >= 5) {
      navigate("/tasklist");
    } else {
      setError("Username must be at least 5 characters long.");
    }
  };

  return (
    <div className="landingpage">
      <div className="wrapper">
        <div className="imagewrapper">
          <img className="image" src="/mascot.jpg" alt="User" />
        </div>
        <div>
          <label className="name">
            <input
              type="text"
              placeholder="What should I Call You?"
              value={userName}
              onChange={handleNameChange}
            />
          </label>

          {error && <div className="error">{error}</div>}
        </div>
        <div className="welcomeText">
          Hi! I'm Tasky, your personal React task tracker
        </div>
        <button onClick={redirectToTaskList} className="btn">Enter TaskyWorld</button>
      </div>
    </div>
  );
}

export default LandingPage;
