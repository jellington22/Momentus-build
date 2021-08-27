import React, {createContext, useReducer} from 'react';
import firebase from 'firebase';

import { setItem, deleteItem } from '../storage';

const AuthContext = createContext();

const AuthProvider = ({ children } ) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_LOGGED_IN_USER':
          return {
            ...prevState,
            loggedInUser: action.loggedInUser,
            isAuthLoading: false,
          };
        case 'SIGN_IN':
          setItem('loggedInUser', JSON.stringify(action.loggedInUser));
          return {
            ...prevState,
            loggedInUser: action.loggedInUser,
          };
        case 'SIGN_OUT':
          deleteItem('loggedInUser');
          return {
            ...prevState,
            loggedInUser: null,
          };
      }
    },
    {
      isAuthLoading: true,
      loggedInUser: null,
    }
  );

  const actions = {
      signIn: async data => {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: 'SIGN_IN', loggedInUser: userCredential.user });
      },
      signOut: async () => {
        await firebase.auth().signOut();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        dispatch({ type: 'SIGN_IN', loggedInUser: userCredential.user });
      },
      restoreLoggedInUser: loggedInUser => {
        dispatch({ type: 'RESTORE_LOGGED_IN_USER', loggedInUser });
      },
    };

  return <AuthContext.Provider value={{authState: state, authActions: actions}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider }
