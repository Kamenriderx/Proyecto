import BarGraph from "./components/BarGraphic";
import BubbleGraphic from "./components/BubbleGraphic";
import DoughnutGraphic from "./components/DoughnutGraphic";
import LineGraphic from "./components/LineGraphic";
import PieGraphic from "./components/PieGraphic";
import PolarAreaGraphic from "./components/PolarArea";
import RadarGraphic from "./components/RadarGraphic";
import ScatterGraphic from "./components/ScatterGraphic";import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center flex-col mt-10 bg-white">
      <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
      <div className="w-2/3 h-[500px] rounded-md mb-5  shadow-lg">
        <div className="w-full h-1/2 flex">
          <div className="w-2/3">
            <BarGraph />
          </div>

          <div className="w-1/3 h-full" >
            <div >
              <LineGraphic/>
            </div>

          </div>
        </div>
        <div className="flex ">
          <div className="w-1/2">
            <DoughnutGraphic/>
          </div>
          <div className="w-1/2">

            <DoughnutGraphic/>
          </div>
        </div>

        
      </div>
      <div className="w-2/3 h-[300px]  flex flex-row  justify-between mb-5">
        <div className="w-[49%] h-full  shadow-2xl rounded-md ">
          <PieGraphic />
        </div>
        <div className="w-[49%] h-full  shadow-2xl rounded-md">
          <LineGraphic />
        </div>
      </div>
      <div className="w-2/3   h-[300px]  flex flex-row  justify-between mb-5">
        <div className="w-[49%] h-full  shadow-2xl rounded-md ">
          <DoughnutGraphic />
        </div>
        <div className="w-[49%] h-full  shadow-2xl rounded-md">
          <PolarAreaGraphic />
        </div>
      </div>
      <div className="w-2/3   h-[300px]  flex flex-row  justify-between mb-5">
        <div className="w-[49%] h-full  shadow-2xl rounded-md ">
          <RadarGraphic />
        </div>
        <div className="w-[49%] h-full  shadow-2xl rounded-md">
          <ScatterGraphic />
        </div>
      </div>
      <div className="w-2/3   h-[300px]  flex flex-row  justify-between mb-5">
        <div className="w-[49%] h-full  shadow-2xl rounded-md ">
          <BubbleGraphic />
        </div>
        <div className="w-[49%] h-full  shadow-2xl rounded-md">
          <BubbleGraphic />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
