import { createContext, useEffect, useState } from "react";
import service from "../services/config";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  const authenticateUser = async () => {
    try {
      const response = await service.get("auth/verify");
      console.log(response);
      setIsLoggedIn(true);
      setIsLoading(false);
      setLoggedUser(response.data.payload);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setIsLoading(false);
      setLoggedUser(null);
    }
  };
  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = { authenticateUser, isLoggedIn };

  if (isLoading) {
    return <h3>Validando credenciales...</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
