import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PieGraphic = () => {
    const data = {
        labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
        datasets: [
          {
            data: [30, 25, 20, 25], 
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
      <Pie options={options} data={data} />
    </div>
  );
};
export default PieGraphic;