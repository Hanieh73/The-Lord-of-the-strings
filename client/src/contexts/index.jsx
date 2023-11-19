import React, { useState, useContext, createContext } from 'react';

//step 1: creating  a context which allows us to share info between components
const ExampleContext = createContext();

//step 2: cerate the provider in order to provide the context to the child components
export const ExampleProvider = ({ children }) => {
  //const [user, setUser] = useState();
  const [exampleState, setExampleState] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(0);
  const [username, setUsername] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [currentGameID, setCurrentGameID] = useState(0);

  return (
    <ExampleContext.Provider
      value={{
        exampleState,
        setExampleState,
        isLoggedIn,
        setIsLoggedIn,
        userID,
        setUserID,
        username,
        setUsername,
        allGames,
        setAllGames,
        currentGameID,
        setCurrentGameID,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
};
//step 3: we have to create a way for components to consume the shared data
export const useExample = () => useContext(ExampleContext);
