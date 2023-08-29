import { Line } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineGraphic = () => {
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'Ventas Mensuales',
            data: [100, 120, 150, 130, 180, 200, 220, 210, 190, 160, 140, 170],
            fill: false,
            borderColor: '#FF6384',
            tension: 0.4, 
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
      <Line options={options} data={data} />
    </div>
  );
};
export default LineGraphic;