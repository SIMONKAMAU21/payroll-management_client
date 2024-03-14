import React, { useState } from 'react';
 
const WorkTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
 
  const startWorking = () => {
    const confirmation = window.confirm('Are you sure you want to start working?');
    if (confirmation) {
      setIsWorking(true);
      setStartTime(new Date());
    }
  };
 
  const stopWorking = () => {
    const confirmation = window.confirm('Are you sure you want to stop working?');
    if (confirmation) {
      setIsWorking(false);
      setStopTime(new Date());
    }
  };
 
  const calculateTotalTime = () => {
    if (startTime && stopTime) {
      const totalTime = Math.round((stopTime - startTime) / 1000); // Convert milliseconds to seconds
      const hours = Math.floor(totalTime / 3600);
      const minutes = Math.floor((totalTime % 3600) / 60);
      const seconds = totalTime % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return 'N/A';
  };
 
  return (
    <div>
      <h2>Work Timer</h2>
      <p>Total time worked: {calculateTotalTime()}</p>
      {isWorking ? (
        <button onClick={stopWorking}>Stop Working</button>
      ) : (
        <button onClick={startWorking}>Start Working</button>
      )}
    </div>
  );
};
 
export default WorkTimer;