import { Bubble } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BubbleGraphic = () => {
    const data = {
        datasets: [
          {
            label: 'Ciudades',
            data: [
              { x: 8000000, y: 50000, r: 200000 }, 
              { x: 12000000, y: 60000, r: 300000 },
              { x: 5000000, y: 45000, r: 150000 },
              { x: 10000000, y: 55000, r: 250000 },
              { x: 3000000, y: 35000, r: 100000 },
            ], 
            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
          },
        ],
      };

      const options = {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Población',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'PIB Per Cápita',
            },
          },
        },
      };

  return (
    <div className="h-full w-full box-border p-10">
      <Bubble options={options} data={data} />
    </div>
  );
};
export default BubbleGraphic;