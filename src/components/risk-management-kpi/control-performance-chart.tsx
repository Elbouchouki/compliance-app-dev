'use client'

'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['effect high', 'effective', 'effect medium', 'effect low', 'open', 'overdue'],
  datasets: [
    {
      label: '# percentage',
      data: [20, 18, 5, 22, 10, 25],
      backgroundColor: [
        'rgba(191, 219, 254, 0.2)',
        'rgba(147, 197, 253, 0.2)',
        'rgba(96, 165, 250, 0.2)',
        'rgba(59, 130, 246, 0.2)',
        'rgb(37, 99, 235, 0.2)',
        'rgb(29, 78, 216, 0.2)',
      ],
      borderColor: [
        'rgba(191, 219, 254, 0.2)',
        'rgba(147, 197, 253, 0.2)',
        'rgba(96, 165, 250, 0.2)',
        'rgba(59, 130, 246, 0.2)',
        'rgb(37, 99, 235, 0.2)',
        'rgb(29, 78, 216, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

export function ControlPerformanceChart() {
  return <Pie data={data} />;
}