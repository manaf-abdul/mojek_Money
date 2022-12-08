import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expected, invested, setResult,returns }) => {
  const data = {
    labels: ['Invested Amount', 'Estimated Returns'],
    datasets: [
      {
        label: 'Rs',
        data: [ invested,expected],
        backgroundColor: [
          'rgb(121, 121, 210)',
          'rgb(179, 179, 204)',
        ],
        borderColor: [
          'rgb(121, 121, 210)',
          'rgb(179, 179, 204)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className='pb-4'>
        <Button onClick={() => setResult(false)}>Try Again</Button>
      </div>
      <h4>Returns : {returns}</h4>
      <h4>Invested Amount : {invested}</h4>
      <h4>Estimated Returns : {expected}</h4>
      <Doughnut data={data} />
    </>
  )
}

export default PieChart
