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
import { useStore } from '@/hooks/use-store';
import useLangStore from '@/store/langagueStore';
import { useUser } from '@clerk/nextjs';
import { trpc } from '@/app/_trpc/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RiskVulnerabilitiesChart() {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()
  const riskAssessments = trpc.riskAssessmentScope.getAll.useQuery({
    userId: user?.id
  })

  const assessments = riskAssessments.data;

  const options = {
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
        text: dict?.riskVulnerabilities ?? 'Risk Vulnerabilities',
      },
    },
  };

  const labels = [
    dict?.enterprisewideRiskAssessment ?? 'Enterprise-wide Risk Assessment',
    dict?.optionalRiskAssessment ?? 'Operational Risk Assessment',
    dict?.informationSecurityRiskAssessment ?? 'Information Security Risk Assessmennt',
    dict?.financialRiskAssessment ?? 'Finincial Risk Assessment',
    dict?.complianceRiskAssessment ?? 'Compliance Risk Assessment',
    dict?.projectRiskAssessment ?? "Project Risk Assessment",
    dict?.hazardRiskAssessment ?? "Hazard Risk Assessment"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: dict?.vulnerabilities ?? 'Vulnerabilities',
        data: [
          assessments?.filter(r => r.type === "entreprise-wide").length,
          assessments?.filter(r => r.type === "operational").length,
          assessments?.filter(r => r.type === "information-security").length,
          assessments?.filter(r => r.type === "financial").length,
          assessments?.filter(r => r.type === "compliance").length,
          assessments?.filter(r => r.type === "project").length,
          assessments?.filter(r => r.type === "hazard").length,
        ],
        borderColor: 'rgb(29, 78, 216)',
        backgroundColor: 'rgb(37, 99, 235)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
