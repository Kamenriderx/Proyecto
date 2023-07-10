import { useReducer } from "react";
import ConversationReducer from "./ConversationReducer";
import ConversationContext from "./ConversationContext";
import { httpRequests } from "../../../../utils/helpers/httpRequests.js";

const ConversationState = (props) => {
  const initialState = {
    conversation: null,
  };

  const [state, dispatch] = useReducer(ConversationReducer, initialState);

  const getConversation = async (stateUser) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/conversation/${stateUser.user.ID_USER}/1`,
        { ...config }
      );

      // console.log('GET_STUDENT: ',res.data.user)

      dispatch({
        type: "GET_CONVERSATION",
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
    <ConversationContext.Provider
      value={{
        stateConversation: state.conversation,
        getConversation,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
