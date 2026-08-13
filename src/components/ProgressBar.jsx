import React from 'react'

function ProgressBar({ currentStep, totalSteps = 3 }) {
     const progress =
    ((currentStep - 1) / (totalSteps - 1)) * 100;
  return (
     <div className="profile-progress-wrapper">

      <div className="profile-progress">

        {/* Background line */}
        <div className="profile-progress-line">
          <div
            className="profile-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Circles */}
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;

          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className={`profile-progress-step ${
                completed ? "completed" : ""
              } ${active ? "active" : ""}`}
            >
              {completed ? "✓" : stepNumber}
            </div>
          );
        })}

      </div>

      <p className="profile-step-text">
        Step {currentStep} of {totalSteps}
      </p>

    </div>

  )
}

export default ProgressBar
