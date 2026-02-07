import React, { useState } from "react";

function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Weather App User",
    city: "pune",
    unit: "Celsius (°C)",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    setEditing(false);
  };

  return (
    <div className="page hero">
      <div className="hero-overlay">
        <div className="card profile-card">
          <h2>👤 Profile</h2>

          <div className="profile-info">
            <p>
              Name:
              {editing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              ) : (
                ` ${profile.name}`
              )}
            </p>

            <p>
              Last Searched City:
              {editing ? (
                <input
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              ) : (
                ` ${profile.city}`
              )}
            </p>

            <p>
              Preferred Unit:
              {editing ? (
                <input
                  name="unit"
                  value={profile.unit}
                  onChange={handleChange}
                />
              ) : (
                ` ${profile.unit}`
              )}
            </p>
          </div>

          <div className="profile-actions">
            {editing ? (
              <button onClick={saveProfile}>Save</button>
            ) : (
              <button onClick={() => setEditing(true)}>
                ✏️ Edit Profile
              </button>
            )}

            <button>🚪 Logout</button>
          </div>
          <p className="profile-note">
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;