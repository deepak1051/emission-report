import { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const aggregateDataFn = (data) => {
  const monthlyData = Array(12)
    .fill(null)
    .map(() => ({
      total: 0,
      Scope1: 0,
      Scope2: 0,
      Scope3: 0,
    }));

  data.forEach((entry) => {
    const month = new Date(entry.date).getMonth(); // Month index 0-11
    monthlyData[month].total += entry.emission;
    monthlyData[month][`Scope${entry.scope.split(' ')[1]}`] += entry.emission;
  });

  return monthlyData;
};

const BarChart = ({ data }) => {
  const [isStacked, setIsStacked] = useState(false);

  console.log(data);

  const aggregatedData = aggregateDataFn(data);

  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: isStacked
      ? [
          {
            label: 'Scope 1',
            data: aggregatedData.map((month) => month.Scope1),
            backgroundColor: '#4CAF50',
          },
          {
            label: 'Scope 2',
            data: aggregatedData.map((month) => month.Scope2),
            backgroundColor: '#2196F3',
          },
          {
            label: 'Scope 3',
            data: aggregatedData.map((month) => month.Scope3),
            backgroundColor: '#FFC107',
          },
        ]
      : [
          {
            label: 'Total Emissions',
            data: aggregatedData.map((month) => month.total),
            backgroundColor: '#673AB7',
          },
        ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        stacked: isStacked,
      },
      y: {
        stacked: isStacked,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 font-medium text-gray-700">Stacked</label>
        <input
          type="checkbox"
          checked={isStacked}
          onChange={() => setIsStacked((prev) => !prev)}
          className="w-4 h-4"
        />
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
