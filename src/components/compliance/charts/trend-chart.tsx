"use client"
import { useStore } from '@/hooks/use-store';
import { GET_MATURITY_LEVELS, GET_MONTHS } from '@/mock';
import useLangStore from '@/store/langagueStore';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { backgroundColor, borderColor } from './colors.const';
import { transpose } from '@/lib/utils';


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const TrendChart = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const data: number[][] = []

  const maturities = GET_MATURITY_LEVELS(langStore?.lang).map(m => m?.label)


  labels.forEach((label, index) => {
    const maxControls = Math.floor(Math.random() * 50) + 1;
    let left = maxControls;
    const monthData = [];
    for (let i = 0; i < maturities.length; i++) {
      const controls = Math.floor(Math.random() * left / 2) + 1;
      if (controls <= 0) {
        monthData.push(0);
        break;
      }
      monthData.push(controls);
      left -= controls;
    }
    data.push([maxControls - left, ...monthData]);
  })

  return (
    <Chart type='bar' options={{
      plugins: {
        legend: {
          display: true,
          position: 'right' as const,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    }}
      data={{
        labels: GET_MONTHS(langStore?.lang),
        datasets: [
          {
            type: 'line' as const,
            label: dict?.total || 'Total',
            borderColor: '#1c84f6',
            borderWidth: 1,
            borderDash: [5, 5],
            data: transpose(data)[0],
          },
          ...transpose(data).slice(1).map((d, index) => ({
            type: 'bar' as const,
            label: maturities[index],
            backgroundColor: backgroundColor[index],
            data: d,
            borderColor: borderColor[index],
            borderWidth: 2,
          })),
        ],
      }} />
  )
}
export default TrendChart