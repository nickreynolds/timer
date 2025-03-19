import React from 'react';
import { formatTime } from '../utils/timeUtils';
import './TimeDisplay.css';

interface TimeDisplayProps {
  time: number;
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
  isEditing,
  editValue,
  onEditValueChange,
  onStartEditing,
  onBlur,
  onKeyDown,
  inputRef,
}) => {
  return (
    <div className="timer-display">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          pattern="[0-9]{2}:[0-9]{2}"
          placeholder="MM:SS"
          className="timer-input"
        />
      ) : (
        <span onClick={onStartEditing}>{formatTime(time)}</span>
      )}
    </div>
  );
};

export default TimeDisplay; 