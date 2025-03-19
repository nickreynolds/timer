import React from 'react';
import TimerHeader from './TimerHeader';
import TimeDisplay from './TimeDisplay';
import { useTimer } from '../hooks/useTimer';
import './Timer.css';

interface TimerProps {
  onRemove: () => void;
}

const Timer: React.FC<TimerProps> = ({ onRemove }) => {
  const {
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
  } = useTimer();

  return (
    <div className="timer-container">
      <button className="remove-button" onClick={onRemove}>×</button>
      <TimerHeader originalTime={originalTime} />
      <TimeDisplay
        time={time}
        originalTime={originalTime}
        isEditing={isEditing}
        editValue={editValue}
        onEditValueChange={setEditValue}
        onStartEditing={startEditing}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
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