import React from 'react';
import TimerHeader from './TimerHeader';
import TimeDisplay from './TimeDisplay';
import { useTimer } from '../hooks/useTimer';
import GhostButton from './GhostButton';
import PrimaryButton from './PrimaryButton';
import './Timer.css';
import { Pause, Play } from 'lucide-react';

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
      <div className="flex justify-center gap-2.5 mt-4 mb-4">
        <GhostButton onClick={addMinute}>
          +1:00
        </GhostButton>
        <PrimaryButton onClick={togglePause} icon aria-label={isRunning ? 'Pause' : 'Play'}>
          {isRunning ? <Pause /> : <Play />}
        </PrimaryButton>
        <GhostButton onClick={resetTimer}>
          Reset
        </GhostButton>
      </div>
      </div>
    </div>
  );
};

export default Timer; 