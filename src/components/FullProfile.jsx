import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

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
  const [step, setStep] = useState(1);
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
    <div className="full-profile-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(step / 6) * 100}%`,
              }}
            />
          </div>
          {step === 1 && (
            <div className="step-container">
              <h2>Add a Profile Picture</h2>
              <p>Upload a photo so people can recognize you.</p>

              <input type="file" accept="image/*" />

              <button onClick={() => setStep(2)}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="step-container">
              <h2>Verify Your Contact Number</h2>
              <p>We'll use this for account security.</p>

              <input type="tel" placeholder="+91 Enter phone number" />

              <div className="button-group">
                <button onClick={() => setStep(1)}>Back</button>

                <button onClick={() => setStep(3)}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-container">
              <h2>Tell Us About Yourself</h2>
              <p>You can change this later.</p>

              <textarea
                rows="5"
                maxLength="250"
                placeholder="Write a short bio..."
              />

              <div className="button-group">
                <button onClick={() => setStep(2)}>Back</button>

                <button onClick={() => setStep(4)}>Continue</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-container">
              <h2>Personal Details</h2>

              <div className="row">
                <div>
                  <label>Date of Birth</label>
                  <input type="date" />
                </div>

                <div>
                  <label>Gender</label>

                  <select>
                    <option>Select Gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="button-group">
                <button onClick={() => setStep(3)}>Back</button>

                <button onClick={() => setStep(5)}>Continue</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-container">
              <h2>Location</h2>

              <div className="row">
                <input type="text" placeholder="City" />

                <select>
                  <option>Select Country</option>
                </select>
              </div>

              <div className="button-group">
                <button onClick={() => setStep(4)}>Back</button>

                <button onClick={() => setStep(6)}>Continue</button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="step-container">
              <h2>Choose Your Interests</h2>
              <p>Optional • Select as many as you like.</p>

              <div className="interests">
                {INTERESTS.map((tag) => (
                  <button
                    key={tag}
                    className={`tag ${
                      selectedInterests.includes(tag) ? "active" : ""
                    }`}
                    onClick={() => toggleInterest(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button className="skip-btn">Skip for now</button>

              <div className="button-group">
                <button onClick={() => setStep(5)}>Back</button>

                <button onClick={() => navigate("/chat")}>Complete Profile</button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FullProfile;
