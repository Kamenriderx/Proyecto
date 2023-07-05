import fondoPerfil from "../../../assets/fondoPerfil.jpg";

import { useState } from "react";
import AlertThree from "../../../components/AlertThree.jsx";

const Avatar = ({ user }) => {
  const [image, setImage] = useState(fondoPerfil);
  const [nameImageSelected, setNameImageSelected] = useState("");
  const [propAlert, setPropAlert] = useState({});
  const [error, setError] = useState(false);

  //este estado se le enviara al server
  console.log("nameImageSelected: ", nameImageSelected);

  const handleImageChange = (e) => {
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

    setNameImageSelected(selectedImage);
    setImage(URL.createObjectURL(selectedImage));
    setError(false);
  };

  return (
    <>
      {user.visitante ? (
        <div className="h-32 w-32 m-4">
          <img
            src={image || "placeholder.jpg"}
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
                src={image || "placeholder.jpg"}
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
              src={image || "placeholder.jpg"}
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
  );
};

export default Avatar;
