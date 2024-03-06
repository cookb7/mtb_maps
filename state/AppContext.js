import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  trails: [],
  mapCenterCoords: []
  };

const AppReducer = (state, action) => {
    switch (action.type) {
      case "SET_TRAILS":
        return {
          ...state,
          trails: action.payload,
        };
      default:
        return state;
    }
  };

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
  
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export const useAppContext = () => useContext(AppContext);