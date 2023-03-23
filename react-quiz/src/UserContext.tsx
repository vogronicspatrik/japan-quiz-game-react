import { createContext, useState } from "react";

interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
  }

interface ContextProps {
    children: React.ReactNode;
  }

  export const UserContext = createContext<UserContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
  });

  const Context = ({ children }: ContextProps) => {
    const [user, setUser] = useState({
      isLoggedIn: false,
    });

    const handleSetIsLoggedIn = (value: boolean) => {
        setUser({ isLoggedIn: value });
      };
  
    return (
      <UserContext.Provider value={{ isLoggedIn: user.isLoggedIn, setIsLoggedIn: handleSetIsLoggedIn }}>
        {children}
      </UserContext.Provider>
    );
  };

export default Context;