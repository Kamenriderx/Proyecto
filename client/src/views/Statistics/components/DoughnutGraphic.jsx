import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DoughnutGraphic = () => {
    const data = {
        labels: ['Alimentación', 'Transporte', 'Vivienda', 'Ocio', 'Otros'],
        datasets: [
          {
            data: [30, 20, 15, 10, 25], 
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#E7E9ED'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#E7E9ED'],
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
      <Doughnut options={options} data={data} />
    </div>
  );
};
export default DoughnutGraphic;