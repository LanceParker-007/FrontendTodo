import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom useContext Hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
