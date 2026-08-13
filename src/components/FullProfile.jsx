import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Check, ChevronRight, Upload, X } from "lucide-react";
import FullProfileBackground from "./FullProfileBackground";
import "../FullProfileBackground.css";

const steps = [
  {
    number: 1,
    category: "PROFILE",
    title: "Add a profile picture",
    description: "  ",
  },
  {
    number: 2,
    category: "ABOUT YOU",
    title: "Tell us about yourself",
    description: "A little information helps people get to know you.",
  },
  {
    number: 3,
    category: "ALL DONE",
    title: "Your profile is ready",
    description: "Everything looks good. Let's get started.",
  },
];

function FullProfile() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const currentStep = steps[step - 1];

  const progress = (step / steps.length) * 100;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const removeImage = () => {
    setProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContinue = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    } else {
      navigate("/chat")
      
    }
  };

  const handleSkip = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    // navigate to main page or call API
    navigate("/land");
  };
  return (
    <div className="complete-profile-page">
      {/* Keep your existing background here */}
      <div className="profile-background">
        <FullProfileBackground />
      </div>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Progress */}
        <div className="profile-progress">
          <div className="progress-top">
            <span className="progress-label"></span>

            <span className="progress-count">
              {String(step).padStart(2, "0")}/
              {String(steps.length).padStart(2, "0")}
            </span>
          </div>

          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.45,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="step-dots">
            {steps.map((item) => (
              <div
                key={item.number}
                className={`step-dot ${item.number <= step ? "active" : ""}`}
              >
                {item.number < step ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  item.number
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="profile-content"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="step-heading">
              <h1>{currentStep.title}</h1>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="photo-section">
                <div className="avatar-wrapper">
                  <div className={`avatar ${profileImage ? "has-image" : ""}`}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile preview" />
                    ) : (
                      <div className="avatar-placeholder">
                        <Camera size={30} strokeWidth={1.7} />
                      </div>
                    )}
                  </div>

                  {profileImage && (
                    <button
                      className="remove-image"
                      onClick={removeImage}
                      type="button"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  )}

                  <button
                    className="avatar-edit"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    aria-label="Upload profile photo"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  hidden
                />

                <button
                  className="upload-button"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={17} />
                  {profileImage ? "Change photo" : "Upload a photo"}
                </button>

                <p className="upload-hint">JPG, PNG or WEBP · Max 5 MB</p>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="placeholder-step">
                <input
                  type="text"
                  maxLength={20}
                  placeholder="In 20 words"
                  className="about-input"
                />

                <p>Your personal information fields can go here.</p>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="success-step">
                <div className="success-icon">
                  <Check size={34} strokeWidth={2.5} />
                </div>

                <h2>You're all set!</h2>

                <p>Your profile is ready. Welcome aboard.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="profile-footer">
          <button
            className="continue-button"
            onClick={handleContinue}
            type="button"
          >
            <span>{step === steps.length ? "Finish" : "Continue"}</span>

            <ChevronRight size={19} />
          </button>

          {step < steps.length && (
            <button className="skip-button" onClick={handleSkip} type="button">
              Skip for now
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default FullProfile;
