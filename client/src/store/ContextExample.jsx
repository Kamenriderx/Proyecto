import { createContext,useReducer } from "react";


const StoreContext = createContext();

const initialState = {
    login:false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
          return {
            ...state,
            login: true,
          };
        case 'LOGOUT':
          return {
            ...state,
            login: false,
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

export {StoreProvider,StoreContext};