import "flowbite";
import Video from "./components/Video";
import { StoreContext } from "../../store/ContextExample";
import { useContext, useEffect, useState } from "react";
import Sidevar from "./components/Sidevar";
import axios from "axios";

const ViewTeacher = () => {
  const { state, dispatch, periodo } = useContext(StoreContext);

  const [classes, setClasses] = useState([]);


  useEffect(() => {
    const getClassTeacher = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/section/sectionsForProfessors/${
            state.user.ID_USER
          }/${periodo.ID_PERIOD}`
        );
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClassTeacher();
  }, [state.user.ID_USER]);

  console.log("clases", classes);

  return (
    <>
<Sidevar/>
      <div className="grid grid-cols-3 gap-6 p-4 sm:ml-64 -mt-4">
        <div className="col-span-2">
          <div className="bg-gray-200 m-8 rounded-xl w-auto h-96  ">
            <Video />
          </div>
        </div>
        <div className="overflow-hidden hover:overflow-auto h-96 mt-8 mr-8">
          <div className="flex flex-col">
          {classes.map((clase) => (

            <div className="bg-gray-200 mb-4 rounded-xl w-auto flex flex-col items-center font-bold text-sm p-2" key={clase.ID_SECTION}>
                <div>{clase.CODE_COURSE}</div>
                
              <div>{clase.NAME}</div>
              <div className="flex gap-2">
                <div>{clase.SECTION_CODE}</div> -
                <div>{clase.DAYS}</div>
              </div>
              <div className="flex gap-2">
                <div>{clase.START_TIME}</div> -
                <div>{clase.END_TIME}</div>
              </div>
            </div>
          ))}
          
        
          </div>
        </div>
     
      </div>
    </>
  );
};

export default ViewTeacher;
