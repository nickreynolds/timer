import React from 'react';
import { formatTime } from '../utils/timeUtils';
import './TimeDisplay.css';

interface TimeDisplayProps {
  time: number;
  originalTime: number;
  isEditing: boolean;
  editValue: string;
  onEditValueChange: (value: string) => void;
  onStartEditing: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  time,
  originalTime,
  isEditing,
  editValue,
  onEditValueChange,
  onStartEditing,
  onBlur,
  onKeyDown,
  inputRef,
}) => {
  const progress = (time / originalTime) * 100;
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="time-display-container">
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
      <div className="time-display">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className="time-input"
          />
        ) : (
          <div onClick={onStartEditing} className="time-text">
            {formatTime(time)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeDisplay; 