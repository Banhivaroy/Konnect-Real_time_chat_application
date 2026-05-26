import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  "Gaming",
  "Music",
  "Travel",
  "Design",
  "Coding",
  "Sports",
  "Cooking",
  "Movies",
  "Books",
  "Fitness",
  "Art",
  "Photography",
];

function FullProfile() {
  const navigate = useNavigate();

  const fileRef = useRef();

  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    bio: "",
    dob: "",
    gender: "",
    city: "",
    country: "",
  });
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const toggleInterest = (tag) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSave = () => {
    // navigate to main page or call API
    navigate("/land");
  };
  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Step indicator */}
        <div className="steps">
          <div className="step done">
            <div className="step-num">✓</div>
            <span>Account</span>
          </div>
          <div className="step-line" />
          <div className="step active">
            <div className="step-num">2</div>
            <span>Profile</span>
          </div>
          <div className="step-line" />
          <div className="step inactive">
            <div className="step-num">3</div>
            <span>Done</span>
          </div>
        </div>

        <h1>Complete your profile</h1>
        <p className="sub">Help others know who you are on ChitChat.</p>

        {/* Avatar upload */}
        <div className="avatar-section">
          <div className="avatar-wrap">
            <div className="avatar">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <span>👤</span>
              )}
            </div>
          </div>
          <div className="avatar-info">
            <p className="avatar-title">Profile picture</p>
            <p className="avatar-sub">JPG or PNG, max 5MB</p>
            {!avatar ? (
              <button
                className="upload-btn"
                onClick={() => fileRef.current.click()}
              >
                Upload photo
              </button>
            ) : (
              <button
                className="change-btn"
                onClick={() => fileRef.current.click()}
              >
                Change photo
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
          </div>
        </div>

        <p className="section-title">Basic info</p>

        <div className="field">
          <label>
            Phone number 
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
          />
          <span className="hint">Used for account recovery only</span>
        </div>

        <div className="field">
          <label>
            Bio <span className="optional">optional</span>
          </label>
          <textarea
            name="bio"
            placeholder="Tell people a little about yourself…"
            maxLength={30}
            value={form.bio}
            onChange={handleChange}
          />
          <span className="char-count">{form.bio.length} / 30</span>
        </div>

        <div className="row">
          <div className="field">
            <label>
              Date of birth <span className="optional">optional</span>
            </label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>
              Gender <span className="optional">optional</span>
            </label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

        <hr className="divider" />
        <p className="section-title">Location</p>

        <div className="row">
          <div className="field">
            <label>
              City 
            </label>
            <input
              name="city"
              placeholder="Kolkata"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>
              Country 
            </label>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Select</option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <hr className="divider" />
        <p className="section-title">
          Interests <span className="optional">optional</span>
        </p>

        <div className="interests">
          {INTERESTS.map((tag) => (
            <button
              key={tag}
              className={`tag ${selectedInterests.includes(tag) ? "active" : ""}`}
              onClick={() => toggleInterest(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button className="skip-btn" onClick={() => navigate("/land")}>
            Skip for now
          </button>
          <button className="submit-btn" onClick={handleSave}>
            Save and continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullProfile;
