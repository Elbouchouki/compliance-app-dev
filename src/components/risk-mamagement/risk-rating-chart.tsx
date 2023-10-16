'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Risk } from '@/types';
import { useStore } from '@/hooks/use-store';
import useLangStore from '@/store/langagueStore';

ChartJS.register(ArcElement, Tooltip, Legend);

export function RiskRatingChart(riskData: { risks: Risk[] }) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { risks } = riskData;

  const data = {
    labels: [dict?.highRisk || 'high risk', dict?.medRisk || 'medium resk', dict?.lowRisk || 'low resk'],
    datasets: [
      {
        label: '# percentage',
        data: [
            (risks.filter(r => r.impact * r.likelihood === 25).length / risks.length * 100).toFixed(2),
            (risks.filter(r => r.impact * r.likelihood < 25 && r.impact * r.likelihood >= 6).length / risks.length * 100).toFixed(2),
            (risks.filter(r => r.impact * r.likelihood < 6).length / risks.length * 100).toFixed(2)
          ],
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