import React, { createContext, useReducer } from 'react';
import { initialState, UseReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export default ({ children }) => {
  const [ state, dispatch ] = useReducer(UseReducer, initialState);
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
}