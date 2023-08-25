import { useContext, useEffect, useState } from "react";
import AlertThree from "../../../components/AlertThree.jsx";
import ReactPlayer from "react-player";
import { StoreContext } from "../../../store/ContextExample.jsx";
import TeacherContext from "../context/TeacherContext.jsx";

const Video = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const [propAlert, setPropAlert] = useState({});
  const [error, setError] = useState(false);

  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de docente
  const { stateTeacher, getTeacher, putVideo } = useContext(TeacherContext);

  useEffect(() => {
    getTeacher(state);
  }, []);

  console.log("steTeacherVide: ", stateTeacher);
  // console.log("URL:", stateTeacher.user.user.multimedia[0].URL);


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setError(false);

    if (!file?.name.includes("mp4")) {
      setError(true);

      if (!file) {
        setPropAlert({
          text: "Debe seleccionar un archivo.",
          icon: "error",
          title: "Error",
        });
      } else {
        setPropAlert({
          text: "El Archivo no es un video (mp4), favor intentar con otro archivo.",
          icon: "error",
          title: "Error",
        });
      }
      return;
    }

    if(stateTeacher.user.user.multimedia.length  == 1 ){
      alert('Solo se puede subir un video.')
    }

    setVideoUrl(URL.createObjectURL(event.target.files[0]));

    await putVideo(state,event.target.files[0])
    await getTeacher(state)

  };

  return (
    <>
      {stateTeacher && (
        <>
          {error ? (
            <>
              <AlertThree alerta={propAlert} />
              <div className="flex flex-col">
                <input
                  type="file"
                  accept=".mp4"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  className="rounded-full "
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <input
                  type="file"
                  accept=".mp4"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  className="rounded-full"
                />
                <div className="h-80">
                  <>
                {stateTeacher?.user?.user?.multimedia?.length  == 1 && (
                  <ReactPlayer
                    url={stateTeacher?.user?.user?.multimedia[0].URL}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                )}
                  </>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Video;
