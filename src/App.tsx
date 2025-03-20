import React, { useState } from "react";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  const [timers, setTimers] = useState<number[]>([]);

  const addTimer = () => {
    setTimers((prev) => [...prev, Date.now()]); // Use timestamp as unique ID
  };

  const removeTimer = (id: number) => {
    setTimers((prev) => prev.filter((timerId) => timerId !== id));
  };

  return (
    <div className="bg-background flex flex-col items-center justify-center min-h-screen">
      <header className="flex flex-col items-center gap-4 w-full max-w-1200">
        <h1 className="text-2xl font-bold text-foreground">Timer App</h1>
        <button
          className="bg-secondary-background text-foreground px-4 py-2 rounded-md"
          onClick={addTimer}
        >
          Add New Timer
        </button>
        <div className="timers-grid">
          {timers.map((id) => (
            <Timer key={id} onRemove={() => removeTimer(id)} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
