import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const RadarGraphic = () => {
    const data = {
        labels: ['Ataque', 'Defensa', 'Magia', 'Agilidad', 'Resistencia'],
        datasets: [
          {
            label: 'Jugador 1',
            data: [80, 70, 60, 90, 75], 
            backgroundColor: 'rgba(255, 99, 132, 0.4)', 
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff', 
            pointHoverBackgroundColor: '#fff', 
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)', 
          },
          {
            label: 'Jugador 2',
            data: [70, 85, 50, 75, 80], 
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-full w-full box-border p-10">
      <Radar options={options} data={data} />
    </div>
  );
};
export default RadarGraphic;