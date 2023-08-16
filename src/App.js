import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [hour, setHour] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else if (hour > 0) {
          setHour((hour) => hour - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, hour, isRunning]);

  const handleStart = () => {
     if(hour !== 0 || minutes !== 0 || seconds !== 0) {
      setIsRunning(true);
     } else {
      window.alert("Add time to start")
     }
  }

  const handlePause = () => {
    setIsRunning(false);
  }
 
  const handleReset = () => {
    setIsRunning(false);
    setHour(0);
    setMinutes(0);
    setSeconds(0);
  };
  return (
    <div className="App">
      <div className="container">
        <span className="container__title">Countdown Timer</span>

        <div className="container__labels">
          <p className="container__labels--label">Hours</p>
          <p className="container__labels--label">Minutes</p>
          <p className="container__labels--label">Seconds</p>
        </div>

        <div className="container__inputs">
          <input
            type="number"
            maxLength={2}
            placeholder="00"
            className="container__inputs--time hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <p className="container__inputs--colon">:</p>
          <input
            type="number"
            maxLength={2}
            placeholder="00"
            className="container__inputs--time minute"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <p className="container__inputs--colon">:</p>
          <input
            type="number"
            maxLength={2}
            placeholder="00"
            className="container__inputs--time sec"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </div>

        <div className="container__btns">
          {!isRunning && (
            <button className="btn start" onClick={handleStart}>
              Start
            </button>
          )}
          {isRunning && (
            <button className="btn stop" onClick={handlePause}>
              Pause
            </button>
          )}
          <button className="btn reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
