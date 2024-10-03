import { useState, useRef } from "react";
import ResultModel from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  // every component instance of TimerChallenge component will get its own timer ref that works totally independent from otheR refs that belong to other instances of tha component.
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  // function handleStart() {
  //   timer.current = setTimeout(() => {
  //     setTimerExpired(true);
  //     dialog.current.open();
  //   }, targetTime * 1000);

  //   setTimerStarted(true);
  // }

  // function handleStop() {
  //   clearTimeout(timer.current);
  // }

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModel
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        {/* <p> */}
        {/* <button onClick={timerStarted ? handleStop : handleStart}> */}
        {/* {timerStarted ? "Stop" : "Start"} Challenge */}
        {/* </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p> */}
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
