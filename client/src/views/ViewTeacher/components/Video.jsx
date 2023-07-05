import { useState } from "react";
import AlertThree from "../../../components/AlertThree.jsx";
import ReactPlayer from "react-player";

const Video = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [nameVideo, setNameVideo] = useState("");

  const [propAlert, setPropAlert] = useState({});
  const [error, setError] = useState(false);

  //este estado se enviara al server
  console.log("nameVideo: ", nameVideo);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(false)

    if (!file?.name.includes("mp4")) {
      setError(true);
      console.log("agua");

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
      return
    }
    setVideoUrl(URL.createObjectURL(event.target.files[0]))
    setNameVideo(event.target.files[0])
  };

  return (
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
              className="rounded-full "
            />
            <br />
            {videoUrl && <ReactPlayer url={videoUrl} controls={true} width='100%'
          height='100%'/>}
          </div>
        </>
      )}
    </>
  );
};

export default Video;
