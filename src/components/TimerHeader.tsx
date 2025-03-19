import React from 'react';
import { formatTime } from '../utils/timeUtils';
import './TimerHeader.css';

interface TimerHeaderProps {
  originalTime: number;
}

const TimerHeader: React.FC<TimerHeaderProps> = ({ originalTime }) => {
  return (
    <div className="timer-header">
      {formatTime(originalTime)} Timer
    </div>
  );
};

export default TimerHeader; 