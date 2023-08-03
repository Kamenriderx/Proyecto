const ConversationReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_CONVERSATION":
      return {
        ...state,
        conversation: payload,
      };

    default:
      return state;
  }
};

export default ConversationReducer;
