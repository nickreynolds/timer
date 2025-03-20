import { useState, useEffect, useRef } from 'react';
import { formatTime, parseTime } from '../utils/timeUtils';

export const useTimer = () => {
  const [time, setTime] = useState<number>(60); // Start at 1 minute (60 seconds)
  const [originalTime, setOriginalTime] = useState<number>(60); // Track original starting time
  const [isRunning, setIsRunning] = useState<boolean>(false); // Start/paused
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
      setOriginalTime(newTime);
      setIsRunning(true);
    }
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
    const now = Date.now();
    const timeSinceLastTick = now - lastTickTime.current;
    const remainingDelay = 1000 - (timeSinceLastTick % 1000);

    setTime(prevTime => prevTime + 60);
    setOriginalTime(prevTime => prevTime + 60);
    
    // If the timer is running, update the last tick time to preserve the timing
    if (isRunning) {
      lastTickTime.current = now;
      nextTickDelay.current = remainingDelay;
    }
  };

  const resetTimer = () => {
    setTime(originalTime);
    setIsRunning(false);
    nextTickDelay.current = 0;
  };

  return {
    time,
    originalTime,
    isRunning,
    isEditing,
    editValue,
    inputRef,
    setEditValue,
    startEditing,
    handleBlur,
    handleKeyDown,
    togglePause,
    addMinute,
    resetTimer,
  };
}; 