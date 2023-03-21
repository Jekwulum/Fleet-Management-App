import React from 'react';
import { generateMonthArray } from '../../utils/Utils';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ data }) => {
  const dates = data.map(({ date }) => date.split("T")[0]);
  const counts = data.map(({ count }) => count);
  const distances = data.map(({ distance }) => distance);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Number of trips',
        data: counts,
        yAxisID: 'count',
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Distance',
        data: distances,
        yAxisID: 'distance',
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          id: 'count',
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
          },
        },
        {
          id: 'distance',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={chartData} options={chartOptions} />
}

export default LineChart;