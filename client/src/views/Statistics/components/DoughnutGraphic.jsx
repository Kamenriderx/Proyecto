import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from 'react';
import { httpRequests } from '../../../utils/helpers/httpRequests';
Chart.register(...registerables);

const DoughnutGraphic = () => {
  const [dataValues, setDataValues] = useState({
    labels: [],
    data: [],
  });
  useEffect(() => {
    httpRequests()["get"]("http://localhost:3000/registro/graph/dataAprSystem", {})
      .then((res) => {
        console.log("Datos",res.data);
        let labels = []
        let data =[]
        for(const value of res.data.data){
          labels.push(Object.values(value)[0].split(" ")[0])
          data.push(Object.values(value)[1])
          
        }
        setDataValues({
          labels,
          data
        })

      });
  }, []);



    const data = {
        labels: dataValues.labels,
        datasets: [
          {
            data: dataValues.data, 
            backgroundColor:['#E57373', '#64B5F6', '#FFD54F', '#81C784', '#B0BEC5', '#9575CD', '#7986CB', '#4DB6AC', '#FF8A65', '#A1887F'],
            hoverBackgroundColor: ['#E57373', '#64B5F6', '#FFD54F', '#81C784', '#B0BEC5', '#9575CD', '#7986CB', '#4DB6AC', '#FF8A65', '#A1887F'],
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