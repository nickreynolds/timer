import React from 'react';
import { formatTime } from '../utils/timeUtils';
import ProgressCircle from './ProgressCircle';
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

  return (
    <div className="relative w-[120px] h-[120px] m-auto">
      <ProgressCircle progress={progress} />
      <div className="time-display">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className="time-input font-medium text-foreground text-2xl"
          />
        ) : (
          <div onClick={onStartEditing} className="font-medium text-foreground text-2xl" tabIndex={0}>
            {formatTime(time)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeDisplay; 