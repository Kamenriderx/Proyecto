import "flowbite";
import Video from "./components/Video";
import { StoreContext } from "../../store/ContextExample";
import { useContext, useEffect, useState } from "react";
import Sidevar from "./components/Sidevar";
import axios from "axios";
import { httpRequests } from "../../utils/helpers/httpRequests";
import ReactPlayer from "react-player";
import { BsCameraVideoOffFill } from 'react-icons/bs';


const ViewTeacherPublic = ({ ID_USER_PROFFESOR, chek}) => {
  const { state, dispatch, periodo } = useContext(StoreContext);

  const [classes, setClasses] = useState([]);
  const getClassTeacher = async () => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/section/sectionsForProfessors/${ID_USER_PROFFESOR}/${2}`
      );
      setClasses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [video, setVideo] = useState(null);

  const getVideo = async () => {
    try {
      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/video/${ID_USER_PROFFESOR}`,
        {}
      );
      console.log("GET_VIDEO: ", res.data.videoURL);
      setVideo(res.data.videoURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setVideo(null)
  }, [chek]);

  useEffect(() => {
    getClassTeacher();
    getVideo();
  }, [ID_USER_PROFFESOR]);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4 ">
        <div className="col-span-2">
          <div className="bg-gray-200 my-8 rounded-xl h-96">
            {video ? (
              <div className="h-80">
                <ReactPlayer
                  url={video}
                  controls={true}
                  width="100%"
                  height="100%"
                />

            </div>
            ) : (
              <div className="flex justify-center">
                <BsCameraVideoOffFill size={50}/>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-hidden hover:overflow-auto h-96 mt-8 ">
          <div className="flex flex-col">
            {classes.map((clase) => (
              <div
                className="bg-gray-200 mb-4 rounded-xl w-auto flex flex-col items-center font-bold text-sm p-2"
                key={clase.ID_SECTION}
              >
                <div>{clase.CODE_COURSE}</div>

                <div>{clase.NAME}</div>
                <div className="flex gap-2">
                  <div>{clase.SECTION_CODE}</div> -<div>{clase.DAYS}</div>
                </div>
                <div className="flex gap-2">
                  <div>{clase.START_TIME}</div> -<div>{clase.END_TIME}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTeacherPublic;
