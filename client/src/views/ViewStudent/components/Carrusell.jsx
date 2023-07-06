import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../store/ContextExample";
import StudentContext from "../context/StudentContext";

import { MdDeleteForever } from "react-icons/Md";



const Carrusell = ({ user }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [nameImage, setNameImage] = useState([]);

  //este estado se enviara al server
  console.log("nameImage:, ", nameImage);
  

  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const {stateStudent, getStudent, deleteImage} = useContext(StudentContext)

  useEffect(() => {
    getStudent(state)
  },[state])

  console.log('seggStudentCarrusel: ',stateStudent)
  
  const handleFileChange = (event) => {
    const files = event.target.files;

    setNameImage((prevImages) => [...prevImages.slice(-2), files[0]]);

    const selectedFiles = Array.from(files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages.slice(-2), ...imageUrls]);
  };

  const handleDelete = async (id) => {
    await deleteImage(state, id)
    await getStudent(state)
  };

  return (
    <>
      {stateStudent && (
        <>
          <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out transform">
                  {stateStudent.user.user.hasOwnProperty("multimedia") ? (
                    <>
                      {stateStudent.user.user.multimedia.map((imageUrl) => (
                        <>
                          <div className="text-center">
                            <button
                              onClick={() =>
                                handleDelete(imageUrl.ID_MULTIMEDIA)
                              }
                            >
                      <MdDeleteForever className="text-3xl text-red-600 hover:text-red-800"/>
                            </button>
                            <img
                              key={imageUrl.ID_MULTIMEDIA}
                              className="w-52 h-52 object-cover border-2 m-1 border-gray-700"
                              src={imageUrl.URL}
                            />
                          </div>
                        </>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Carrusell;
