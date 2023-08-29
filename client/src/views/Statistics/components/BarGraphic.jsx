import {  Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect, useState } from "react";
Chart.register(...registerables);

const BarGraph = () => {
  const [dataValues, setDataValues] = useState({
    labels: [],
    data: [],
  });
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpRequests()
      // ["get"]("http://localhost:3000/registro/statistics/getData", {})
      // .then((res) => {
      //   const APR = [];
      //   for (const label of Object.keys(res.data.data)) {
      //     for (const value of res.data.data[label]) {
      //       if (value.OBS === "APR") {
      //         APR.push(value.QUANTITY);
      //       }
      //     }
      //   }
      //   setDataValues({
      //   labels: Object.keys(res.data.data),
      //     datasets: [
      //       {
      //         label: "Aprobados",
      //         data: APR,
      //         backgroundColor: "rgba(75, 192, 192, 0.8)",
      //         borderColor: "rgba(75, 192, 192, 1)",
      //         borderWidth: 1,
      //       },
      //     ],
      //   });
      //   setLoading(false);

      // });

      ["get"]("http://localhost:3000/registro/graph/dataAbdSystem", {})
      .then((res) => {
        let labels = []
        let data =[]
        for(const value of res.data.data){
          labels.push(Object.values(value)[0].split(" ")[0])
          data.push(Object.values(value)[1])

        }
        setDataValues({data, labels});

      });
  }, []);

  const data = {
    labels: dataValues.labels,
    datasets: [
      {
        label: 'Top 10 clases con mas ABD',
        data: dataValues.data, 
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




