import React from 'react';
import { formatTime } from '../utils/timeUtils';

interface TimerHeaderProps {
  originalTime: number;
  onRemove: () => void;
}

const TimerHeader: React.FC<TimerHeaderProps> = ({ originalTime, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-tertiary-background text-foreground font-medium rounded-t-md p-4">
      <div >{formatTime(originalTime)} Timer</div>
      <button className="" onClick={onRemove}>×</button>
    </div>
  );
};

export default TimerHeader; 