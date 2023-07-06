const StudentReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_STUDENT":
      return {
        ...state,
        student: payload,
      };
    case "PUT_CORREO":
      return {
        ...state,
      };
    case "PUT_IMAGE":
      return {
        ...state,
      };
    case "DELETE_IMAGE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default StudentReducer;
