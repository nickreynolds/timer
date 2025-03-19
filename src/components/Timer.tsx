import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    setIsRunning(prev => !prev);
  };

  const addMinute = () => {
    setTime(prevTime => prevTime + 60);
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={togglePause} className="timer-button">
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button onClick={addMinute} className="timer-button">
          Add 1 Minute
        </button>
      </div>
    </div>
  );
};

export default Timer; 