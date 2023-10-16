'use client'

'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['impact high', 'impact medium', 'impact low', 'overdue'],
  datasets: [
    {
      label: '# percentage',
      data: [20, 18, 22, 10],
      backgroundColor: [
        'rgba(4, 120, 87, 0.2)',
        'rgba(6, 95, 70, 0.2)',
        'rgba(6, 78, 59, 0.2)',
        'rgba(2, 44, 34, 0.2)',
      ],
      borderColor: [
        'rgba(110, 231, 183, 0.2)',
        'rgba(52, 211, 153, 0.2)',
        'rgba(16, 185, 129, 0.2)',
        'rgba(5, 150, 105, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

export function OpenIssueChart() {
  return <Pie data={data} />;
}