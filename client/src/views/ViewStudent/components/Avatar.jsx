import fondoPerfil from "../../../assets/fondoPerfil.jpg";

import { useContext, useEffect, useState } from "react";
import AlertThree from "../../../components/AlertThree.jsx";
import { StoreContext } from "../../../store/ContextExample";

import StudentContext from "../context/StudentContext";

const Avatar = ({ user }) => {
  const [image, setImage] = useState(fondoPerfil);
  const [propAlert, setPropAlert] = useState({});
  const [error, setError] = useState(false);

  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const { stateStudent, getStudent, putImage } = useContext(StudentContext);

  useEffect(() => {
    getStudent(state);
  }, [state]);

  //este estado se le enviara al server
  // console.log("nameImageSelected: ", nameImageSelected);

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    // console.log('selectedImage: ',selectedImage)

    if (!selectedImage?.type.includes("image")) {
      setImage(fondoPerfil);
      setError(true);

      if (!selectedImage) {
        setPropAlert({
          text: "Debe seleccionar un archivo.",
          icon: "error",
          title: "Error",
        });
      } else {
        setPropAlert({
          text: "El Archivo no es una imagen, favor intentar con otro archivo.",
          icon: "error",
          title: "Error",
        });
      }
      return;
    }

    // console.log('stateStudent.user.user.multimedia.length: ', stateStudent.user.user.multimedia.length)
    if (stateStudent?.user?.user?.multimedia?.length === 3) {
      alert("Solo puede subir como máximo tres imágenes.");
    }

    setImage(URL.createObjectURL(e.target.files[0]));
    setError(false);

    await putImage(state, e.target.files[0]);
    await getStudent(state);
  };

  // console.log('multimedia: ',perfil.data.user.user.multimedia[perfil.data.user.user.multimedia.length - 1].URL)

  return (
    <>
      {stateStudent && (
        <>
          {user.visitante ? (
            <div className="h-32 w-32 m-4">
              <img
                src={
                  stateStudent.user.user.hasOwnProperty("multimedia")
                    ? stateStudent.user.user.multimedia[
                        stateStudent.user.user.multimedia.length - 1
                      ].URL
                    : fondoPerfil
                }
                alt="seleccine imagen"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          ) : error ? (
            <>
              <AlertThree alerta={propAlert} />
              <div className="h-32 w-32 m-4">
                <label htmlFor="avatar" className="cursor-pointer">
                  <img
                    src={
                      stateStudent.user.user.hasOwnProperty("multimedia")
                        ? stateStudent.user.user.multimedia[
                            stateStudent.user.user.multimedia.length - 1
                          ].URL
                        : fondoPerfil
                    }
                    alt="seleccine imagen"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </label>
                <input
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  id="avatar"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </>
          ) : (
            <div className="h-32 w-32 m-4">
              <label htmlFor="avatar" className="cursor-pointer">
                <img
                  src={
                    stateStudent.user.user.multimedia.length > 0
                      ? stateStudent.user.user.multimedia[
                          stateStudent.user.user.multimedia.length - 1
                        ].URL
                      : fondoPerfil
                  }
                  alt="seleccione imagen"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </label>
              <input
                accept=".jpg, .jpeg, .png"
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Avatar;
