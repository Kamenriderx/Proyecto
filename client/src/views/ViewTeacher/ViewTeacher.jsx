import "flowbite";
import Video from "./components/Video";
import Sidevar from "./components/Sidevar";

const ViewTeacher = () => {
  return (
    <>
      <Sidevar />

      <div className="grid grid-cols-3 gap-6 p-4 sm:ml-64 ">
        <div className="col-span-2">
   <div className="bg-gray-200 m-8 rounded-xl w-auto h-96  ">
    <Video/>
   </div>
        </div>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 h-96 mt-8 mr-8">
          <div className="flex flex-col">
            <div className="bg-gray-200 mb-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase1</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 2</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 3</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 4</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 5</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 6</div> <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 7</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 8</div>
            <div className="bg-gray-200 my-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 9</div> <div className="bg-gray-200 mt-4 rounded-xl w-auto h-12 flex items-center justify-center font-bold">Clase 10</div>
          </div>
        </div>
        <div className="col-span-3 ml-4">
          <div className="flex ">
            <div className="basis-1/4 bg-gray-200 m-4 rounded-xl w-auto h-36"></div>
            <div className="basis-1/4 bg-gray-200 m-4 rounded-xl w-auto h-36"></div>
            <div className="basis-1/4 bg-gray-200 m-4 rounded-xl w-auto h-36"></div>
            <div className="basis-1/4 bg-gray-200 m-4 mr-8 rounded-xl w-auto h-36"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTeacher;
