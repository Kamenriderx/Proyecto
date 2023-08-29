import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PolarAreaGraphic = () => {
    const data = {
        labels: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
        datasets: [
          {
            data: [20, 40, 15, 25],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
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
      <PolarArea options={options} data={data} />
    </div>
  );
};
export default PolarAreaGraphic;