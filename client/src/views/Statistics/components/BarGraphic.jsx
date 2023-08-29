import {  Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect, useState } from "react";
Chart.register(...registerables);

const BarGraph = () => {
  const [dataValues, setDataValues] = useState({
    labels: [],
    datasets: [],
  });
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpRequests()
      ["get"]("http://localhost:3000/registro/statistics/getData", {})
      .then((res) => {
        const APR = [];
        for (const label of Object.keys(res.data.data)) {
          for (const value of res.data.data[label]) {
            if (value.OBS === "APR") {
              APR.push(value.QUANTITY);
            }
          }
        }
        setDataValues({
        labels: Object.keys(res.data.data),
          datasets: [
            {
              label: "Aprobados",
              data: APR,
              backgroundColor: "rgba(75, 192, 192, 0.8)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);

      });
  }, []);

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Temperatura Promedio',
        data: [10, 12, 15, 18, 22, 25, 28, 27, 24, 20, 15, 12], 
        fill: false,
        borderColor: '#FF6384', 
        tension: 0.4, 
        borderWidth: 2, 
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
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarGraph;




