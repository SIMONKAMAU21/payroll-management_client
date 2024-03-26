import React, { useState, useEffect } from 'react';
 
const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setCurrentTime(newTime);
    }, 1000);
 
   
    return () => clearInterval(intervalId);
  }, []);
 
  return (
    <div>
      <h1>{currentTime}</h1>
    </div>
  );
};
 
export default Clock;