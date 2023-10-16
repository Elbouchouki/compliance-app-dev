'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Risk Entities',
    },
  },
};

const labels = ['Encryption Vulnerabilities', 'Excessive User Permissions', 'Dormant Accounts', 'Physical Security', 'Overly Trusting Employees'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Entities',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgb(251, 146, 60)',
    },
  ],
};

export function RiskEntitiesChart() {
  return <Bar options={options} data={data} />;
}
