import React, { useState, useRef } from 'react';
import '../projectOverview/text.scss';
import { useGetEmployeesQuery } from '../../features/Employeemanagement/employeeApi';

const Overview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const { data, isLoading, isError } = useGetEmployeesQuery();

  const speakText = () => {
    if (!isPlaying && data && data.length > 0) {
      const employee = data[0]; // Assuming you want to speak the first employee's name
      const textToSpeak = employee.Firstname;
      const maleVoice = speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft David Desktop - English (United States)');
      if (maleVoice) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.voice = maleVoice;
        speechSynthesis.speak(utterance);
        setUtterance(utterance);
        setIsPlaying(true);
      }
    }
  };

  const stopText = () => {
    if (isPlaying && utterance) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const pauseResumeText = () => {
    if (isPlaying && utterance) {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.pause();
      }
    }
  };

  return (
    <div className="text-holder">
      <div className="text">
        {data && data.map((employee, index) => (
          <p key={index}>{employee.Firstname}</p>
        ))}
      </div>
      <div className="btn">
        <button onClick={speakText}>Play</button>
        <button onClick={stopText}>Stop</button>
        <button onClick={pauseResumeText}>Pause/Resume</button>
      </div>
    </div>
  );
};

export default Overview;
