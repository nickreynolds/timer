import React from 'react';
import Timer from './Timer';

interface TimersGridProps {
  timers: number[];
  onRemoveTimer: (id: number) => void;
}

const TimersGrid: React.FC<TimersGridProps> = ({ timers, onRemoveTimer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {timers.map((id) => (
        <Timer
          key={id}
          onRemove={() => onRemoveTimer(id)}
        />
      ))}
    </div>
  );
};

export default TimersGrid; 