'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useStore } from '@/hooks/use-store';
import useLangStore from '@/store/langagueStore';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ActionPlanChart() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const data = {
    labels: [dict?.highRisk || 'high risk', dict?.medRisk || 'medium resk', dict?.lowRisk || 'low resk'],
    datasets: [
      {
        label: '# percentage',
        data: [3, 30.9, 58.6, 8],
        backgroundColor: [
            'rgba(220, 38, 38, 0.8)',
            'rgba(250, 204, 21, 0.8)',
            'rgba(22, 163, 74, 0.8)',
          ],
          borderColor: [
            'rgba(220, 38, 38, 0.8)',
            'rgba(250, 204, 21, 0.8)',
            'rgba(22, 163, 74, 0.8)',
          ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}