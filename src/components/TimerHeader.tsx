import React from 'react';
import { formatTime } from '../utils/timeUtils';
import './TimerHeader.css';

interface TimerHeaderProps {
  originalTime: number;
  onRemove: () => void;
}

const TimerHeader: React.FC<TimerHeaderProps> = ({ originalTime, onRemove }) => {
  return (
    <div className="timer-header">
      <div >{formatTime(originalTime)} Timer</div>
      <button className="remove-button" onClick={onRemove}>×</button>
    </div>
  );
};

export default TimerHeader; 