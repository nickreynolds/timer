import React, { useState } from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [timers, setTimers] = useState<number[]>([]);

  const addTimer = () => {
    setTimers(prev => [...prev, Date.now()]); // Use timestamp as unique ID
  };

  const removeTimer = (id: number) => {
    setTimers(prev => prev.filter(timerId => timerId !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Timer App</h1>
        <button className="add-timer-button" onClick={addTimer}>
          Add New Timer
        </button>
        <div className="timers-grid">
          {timers.map(id => (
            <Timer key={id} onRemove={() => removeTimer(id)} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
