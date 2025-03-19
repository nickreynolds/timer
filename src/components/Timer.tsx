import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(60); // Start at 1 minute (60 seconds)
  const [isRunning, setIsRunning] = useState<boolean>(false); // Start paused
  const lastTickTime = useRef<number>(Date.now());
  const nextTickDelay = useRef<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let initialDelayId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      // If we have a delay from a previous pause, schedule the first tick
      if (nextTickDelay.current > 0) {
        initialDelayId = setTimeout(() => {
          setTime(prevTime => prevTime - 1);
          lastTickTime.current = Date.now();
          nextTickDelay.current = 0;
        }, nextTickDelay.current);
      }

      // Schedule regular ticks
      intervalId = setInterval(() => {
        const now = Date.now();
        const timeSinceLastTick = now - lastTickTime.current;
        
        // If we're more than 1 second since last tick, update the time
        if (timeSinceLastTick >= 1000) {
          setTime(prevTime => prevTime - 1);
          lastTickTime.current = now;
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (initialDelayId) {
        clearTimeout(initialDelayId);
      }
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    if (isRunning) {
      // When pausing, calculate how long until the next tick
      const now = Date.now();
      const timeSinceLastTick = now - lastTickTime.current;
      nextTickDelay.current = 1000 - (timeSinceLastTick % 1000);
    } else {
      // When starting, update the last tick time
      lastTickTime.current = Date.now();
    }
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