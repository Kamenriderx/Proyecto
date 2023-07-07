import { useReducer } from "react";
import StudentReducer from "./StudentReducer";
import StudentContext from "./StudentContext";
import { httpRequests } from "../../../utils/helpers/httpRequests.js";

const StudentState = (props) => {
  const initialState = {
    student: null,
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  const getStudent = async (stateUser) => {
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

      // console.log('GET_STUDENT: ',res.data.user)

      dispatch({
        type: "GET_STUDENT",
        payload: res.data,
      });

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putCorreo = async (stateUser, email) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["put"](
        `http://localhost:3000/registro/user/updateEmail/${stateUser.user.ID_USER}`,
        {body:{EMAIL:email}, ...config }
      );

      console.log('PUT_CORREO: ',res)

      dispatch({
        type: "PUT_CORREO",
        payload: res.data,
      });


      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putImage = async (stateUser, imageSelected) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const formData = new FormData();
      formData.append("files", imageSelected);

      const res = await httpRequests()["put"](
        `http://localhost:3000/registro/user/uploadPhotos/${stateUser.user.ID_USER}`,
        { body: formData, ...config }
      );

      console.log("resImage: ", res);

      dispatch({
        type: "PUT_IMAGE",
        payload: res.data,
      });

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (stateUser,id) => {
    console.log(id)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["del"](
        `http://localhost:3000/registro/user/deleteMultimedia/${id}`,
        { ...config }
      );

      console.log("resDeleteImage: ", res);

      dispatch({
        type: 'DELETE_IMAGE',
        payload: res.data
      })

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        stateStudent: state.student,
        getStudent,
        putCorreo,
        putImage,
        deleteImage,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
