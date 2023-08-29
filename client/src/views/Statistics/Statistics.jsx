import { useState } from "react";
import BarGraph from "./components/BarGraphic";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="flex justify-start mx-5 mb-5">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Statistics;
