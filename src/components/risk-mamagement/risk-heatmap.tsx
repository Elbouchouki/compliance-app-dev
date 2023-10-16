'use client'

import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const xLabels = ['Negligible', 'Low', 'Moderate', 'Significant', 'Catastrophic'];
const yLabels = ['Improbable', 'Remote', 'Occasional', 'Probable', 'Frecuent'];
const data = [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10], [3, 6, 9, 12, 15], [4, 8, 12, 16, 20], [5, 10, 15, 20, 25]];

const RiskHeatMap = () => {
  return (
    <HeatMapGrid
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      cellHeight='30px'
      cellRender={(x, y, value) => (
        <div className='text-white' title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
      )}
      xLabelsStyle={(index) => ({
        color: '#fff',
        fontSize: '.6rem'
      })}
      yLabelsStyle={() => ({
        fontSize: '.7rem',
        textTransform: 'uppercase',
        color: '#fff'
      })}
    />
  )
}

export default RiskHeatMap;