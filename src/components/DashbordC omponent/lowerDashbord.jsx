import React from 'react'
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs}from "chart.js/auto"

const LowerDashbord = ({ chartData }) => {
      return <Bar data={chartData} 
      style={{backgroundImage:'red'}}
      />;
    };


export default LowerDashbord