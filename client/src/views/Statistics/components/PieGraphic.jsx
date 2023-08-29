import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from 'react';
import { httpRequests } from '../../../utils/helpers/httpRequests';
Chart.register(...registerables);

const PieGraphic = () => {
  const [dataValues, setDataValues] = useState({
    labels: [],
    data: [],
  });
  useEffect(() => {
    httpRequests()["get"]("http://localhost:3000/registro/statistics/getData", {})
      .then((res) => {
        let dataValues = res.data.data[Object.keys(res.data.data)[0]];
        let labels =[];
        let data =[] ;
        for(const value of dataValues){
          labels.push(Object.values(value)[1])
          data.push(Object.values(value)[0])
        }
        console.log(data,labels)
        setDataValues({
          data,
          labels
        })
      });
  }, []);

    const data = {
        labels: dataValues.labels,
        datasets: [
          {
            label:"Distribucion de observacion sobre estudiantes",
            data: dataValues.data, 
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#4CAF50' ],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#4CAF50'],
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