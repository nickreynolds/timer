import React from 'react';
import './ProgressCircle.css';

interface ProgressCircleProps {
  progress: number; // 0 to 100
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="progress-ring" width="120" height="120" viewBox="0 0 120 120">
      {/* Background circle */}
      <circle
        className="progress-ring__circle-bg"
        stroke="#e0e0e0"
        strokeWidth="4"
        fill="transparent"
        r="45"
        cx="60"
        cy="60"
      />
      {/* Progress circle */}
      <circle
        className="progress-ring__circle"
        stroke="#4CAF50"
        strokeWidth="4"
        fill="transparent"
        r="45"
        cx="60"
        cy="60"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: strokeDashoffset,
        }}
      />
    </svg>
  );
};

export default ProgressCircle; 