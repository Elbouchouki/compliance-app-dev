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
    },
  },
};

const labels = ['Unauthorized Activity', 'Disaster', 'Human Resource', 'Transactional'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Type',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
      borderColor: 'rgb(29, 78, 216)',
      backgroundColor: 'rgb(37, 99, 235)',
    },
  ],
};

export function RiskByTypeChart() {
  return <Bar options={options} data={data} />;
}
