const TeacherReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_TEACHER":
      return {
        ...state,
        teacher: payload,
      };
      case "PUT_VIDEO":
        return {
          ...state,
        };
    default:
      return state;
  }
};

export default TeacherReducer;
