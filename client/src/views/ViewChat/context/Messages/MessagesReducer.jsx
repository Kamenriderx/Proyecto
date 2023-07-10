const MessagesReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_MESSAGES":
      return {
        ...state,
        messages: payload,
      };

    default:
      return state;
  }
};

export default MessagesReducer;
