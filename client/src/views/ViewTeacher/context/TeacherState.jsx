import { useReducer } from "react";
import TeacherReducer from "./TeacherReducer";
import TeacherContext from './TeacherContext'
import { httpRequests } from "../../../utils/helpers/httpRequests.js";

const TeacherState = (props) => {
  const initialState = {
    teacher: null,
  };

  const [state, dispatch] = useReducer(TeacherReducer, initialState);

  const getTeacher = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/user/getPerfil/${stateUser.user.ID_USER}`,
        { ...config }
      );

      dispatch({
        type: "GET_TEACHER",
        payload: res.data,
      });

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putVideo = async (stateUser, video) => {
    
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const formData = new FormData();
      formData.append("file", video);

      const res = await httpRequests()["put"](
        `http://localhost:3000/registro/user/uploadVideo/${stateUser.user.ID_USER}`,
        { body: formData, ...config }
      );

      console.log("resVideo: ", res);

      dispatch({
        type: "PUT_VIDEO",
        payload: res.data,
      });


      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <TeacherContext.Provider
      value={{
        stateTeacher: state.teacher,
        getTeacher,
        putVideo
      }}
    >
      {props.children}
    </TeacherContext.Provider>
  );
};

export default TeacherState;
