import { useReducer } from "react";
import MessagesReducer from "./MessagesReducer";
import MessagesContext from "./MessagesContext";
import { httpRequests } from "../../../../utils/helpers/httpRequests.js";

const MessagesState = (props) => {
  const initialState = {
    messages: null,
  };

  const [state, dispatch] = useReducer(MessagesReducer, initialState);

  const getMessages = async (stateUser, id) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/message/${id}/1`,
        { ...config }
      );

      // console.log('GET_STUDENT: ',res.data.user)

      dispatch({
        type: "GET_MESSAGES",
        payload: res.data,
      });

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        stateMessages: state.messages,
        getMessages,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesState;
