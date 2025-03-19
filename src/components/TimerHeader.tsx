import React from 'react';
import './TimerHeader.css';

interface TimerHeaderProps {
  originalTime: number;
}

const TimerHeader: React.FC<TimerHeaderProps> = ({ originalTime }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-header">
      {formatTime(originalTime)} Timer
    </div>
  );
};

export default TimerHeader; 