import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ScatterGraphic = () => {
    const data = {
        datasets: [
          {
            label: 'Estudiantes',
            data: [
              { x: 3, y: 75 },
              { x: 5, y: 90 },
              { x: 2, y: 60 },
              { x: 7, y: 85 },
              { x: 4, y: 70 },
              { x: 6, y: 80 },
            ], 
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
      <Scatter options={options} data={data} />
    </div>
  );
};
export default ScatterGraphic;