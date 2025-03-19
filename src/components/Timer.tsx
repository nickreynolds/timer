import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(60); // Start at 1 minute (60 seconds)
  const [isRunning, setIsRunning] = useState<boolean>(false); // Start paused

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={addMinute} className="timer-button">
          Add 1 Minute
        </button>
      </div>
    </div>
  );
};

export default Timer; 