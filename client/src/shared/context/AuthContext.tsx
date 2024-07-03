import React, { createContext, useContext, useEffect, useState } from "react";
import { IUserGet } from "../../model/user";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { getToken } from "../../../config/axios";

interface AuthContextType {
  user: IUserGet;
  isUserOwner: boolean;
  isUserVet: boolean;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<IUserGet>({
    id: 1,
    name: "John",
    lastName: "Doe",
    cpf: "123.456.789-00",
    crmv: "12345",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    photoFileName: "john.jpg",
    role: { id: 1, roleName: userTypeEnum.OWNER },
    availableTime: new Date("2024-03-10T09:00:00"),
    address: {
      city: "Belo Horizonte",
      district: "Bandeirantes",
      number: "1",
      state: "MG",
      street: "Rua Margarida",
    },
  });

  const isUserOwner = user.role.roleName === userTypeEnum.OWNER;
  const isUserVet = user.role.roleName === userTypeEnum.VET;

  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = await getToken();
      if (token === "expired" || token == null) {
        setIsSignedIn(false);
      }
      setIsSignedIn(true);
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isUserOwner, isUserVet, isSignedIn, setIsSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Trying to acess AuthContext out of the Provider");
  }

  return context;
};

export { AuthContextProvider, useAuthContext };
