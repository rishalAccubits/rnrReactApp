import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/Timer.css';

const Timer = ({ timeLimit,init}) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(timeLimit);
    const [isRunning, setIsRunning] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [intervalId, setIntervalId] = useState();
    const [buttonTitle, setButtonTitle] = useState("Time Remaining");
    const navigate = useNavigate();

    useEffect(() => {
        if (isRunning) {
          const id = setInterval(() => {
            setElapsedTime(elapsedTime + 1);
            setRemainingTime(timeLimit - elapsedTime - 1);
          }, 1000);
          setIntervalId(id);
        }
        if (remainingTime === 0) {
          clearInterval(intervalId);
          setIsRunning(false);
          setIsDisabled(true);
          setButtonTitle("Attended")
          navigate("/");
        }
        return () => clearInterval(intervalId);
      }, [elapsedTime, remainingTime, isRunning]);

    useEffect(()=>{
        setIsRunning(true);
      },[init])

  return (
    <div className={`timer ${isDisabled ? 'disabled' : ''}`}>
      <div className="timer-remaining-time">{remainingTime}</div>
      <button className="timer-start-button" disabled={isDisabled}>
        {buttonTitle}
      </button>
    </div>
  )
}

export default Timer