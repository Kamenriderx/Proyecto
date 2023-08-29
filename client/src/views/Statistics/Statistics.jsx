import BarGraph from "./components/BarGraphic";
import BubbleGraphic from "./components/BubbleGraphic";
import DoughnutGraphic from "./components/DoughnutGraphic";
import LineGraphic from "./components/LineGraphic";
import PieGraphic from "./components/PieGraphic";
import PolarAreaGraphic from "./components/PolarArea";
import RadarGraphic from "./components/RadarGraphic";
import ScatterGraphic from "./components/ScatterGraphic";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center flex-col mt-10 bg-white">
      <div className="flex mx-48">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>

      <div className="w-2/3 h-[500px] rounded-md mb-5  shadow-lg flex ">
        <div className="w-[800px] h-[400px]  shadow-2xl rounded-md m-10 ">
          <PieGraphic />
        </div>
        <div className="w-[800px] h-[400px]  shadow-2xl rounded-md  m-10">
          <BarGraph />
        </div>
      </div>
      <div className="w-2/3 h-[500px] rounded-md mb-5  shadow-lg flex justify-center">
        <div className="w-[800px] h-[400px]  shadow-2xl rounded-md  m-10">
          <DoughnutGraphic />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
