import React, { useState, useEffect, useRef } from 'react';
import TimerHeader from './TimerHeader';
import './Timer.css';

interface TimerProps {
  onRemove: () => void;
}

const Timer: React.FC<TimerProps> = ({ onRemove }) => {
  const [time, setTime] = useState<number>(60); // Start at 1 minute (60 seconds)
  const [originalTime, setOriginalTime] = useState<number>(60); // Track original starting time
  const [isRunning, setIsRunning] = useState<boolean>(false); // Start paused
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');
  const lastTickTime = useRef<number>(Date.now());
  const nextTickDelay = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const parseTime = (timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds)) return 0;
    return minutes * 60 + seconds;
  };

  const startEditing = () => {
    setIsEditing(true);
    setIsRunning(false);
    setEditValue(formatTime(time));
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const newTime = parseTime(editValue);
    if (newTime > 0) {
      setTime(newTime);
      setOriginalTime(newTime); // Update original time when manually edited
    }
    setIsRunning(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const togglePause = () => {
    if (isRunning) {
      const now = Date.now();
      const timeSinceLastTick = now - lastTickTime.current;
      nextTickDelay.current = 1000 - (timeSinceLastTick % 1000);
    } else {
      lastTickTime.current = Date.now();
    }
    setIsRunning(prev => !prev);
  };

  const addMinute = () => {
    setTime(prevTime => prevTime + 60);
    if (!isRunning) {
      setOriginalTime(prevTime => prevTime + 60); // Only update original time when paused
    }
  };

  const resetTimer = () => {
    setTime(originalTime);
    setIsRunning(false);
    nextTickDelay.current = 0;
  };

  return (
    <div className="timer-container">
      <button className="remove-button" onClick={onRemove}>×</button>
      <TimerHeader originalTime={originalTime} />
      <div className="timer-display">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            pattern="[0-9]{2}:[0-9]{2}"
            placeholder="MM:SS"
            className="timer-input"
          />
        ) : (
          <span onClick={startEditing}>{formatTime(time)}</span>
        )}
      </div>
      <div className="timer-controls">
        <button onClick={addMinute} className="timer-button">
          +1:00
        </button>
        <button onClick={togglePause} className="timer-button icon-button">
          {isRunning ? '⏸' : '▶'}
        </button>
        <button onClick={resetTimer} className="timer-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer; 