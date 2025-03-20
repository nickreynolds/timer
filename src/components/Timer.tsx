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
    <div className="flex flex-col w-[250px]">
      <TimerHeader originalTime={originalTime} onRemove={onRemove} />
      <div className="bg-secondary-background rounded-b-md">
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
      <div className="flex gap-2 mt-2 mb-2 justify-center">
        <button onClick={addMinute} className="timer-ghost-button">
          +1:00
        </button>
        <button onClick={togglePause} className="timer-button icon-button">
          {isRunning ? '⏸' : '▶'}
        </button>
        <button onClick={resetTimer} className="timer-ghost-button">
          Reset
        </button>
      </div>
      </div>
    </div>
  );
};

export default Timer; 