import { createContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  login: false,
  user: {},
  token: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: true,
      };
    case "LOGOUT":
      return {
        ...state,
        login: false,
      };
    case "USER":
      return {
        ...state,
        user: action.user,
      };
    case "TOKEN":
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
