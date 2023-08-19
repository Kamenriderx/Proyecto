import axios from "axios";
import { createContext, useReducer, useState, useEffect } from "react";

const StoreContext = createContext();

const initialState = {
  login: false,
  user: {},
  token: "",
  socket: null,
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
    case "SOCKET":
      return {
        ...state,
        socket: action.socket,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [periodo, setPeriodo] = useState([]);

  useEffect(() => {
    const getPeriodo = async () => {
      try {
        const response = await axios(
          "http://localhost:3000/registro/period/getPeriodCurrent"
        );
        setPeriodo(response.data.period);
      } catch (error) {
        console.log(error);
      }
    };
    getPeriodo();
  }, []);

  console.log("PERIODO DESDE EL CONTEXT", periodo);

  return (
    <StoreContext.Provider value={{ state, dispatch, periodo }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
