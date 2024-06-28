import React, { createContext, useContext, useState } from "react";
import { IUserGet } from "../../model/user";
import { userTypeEnum } from "../../enums/userTypeEnum";

interface MyContextType {
  user: IUserGet;
  isUserOwner: boolean;
  isUserVet: boolean;
}

const MyContext = createContext<MyContextType>(null);

function MyContextProvider({ children }) {
  const [user, setUser] = useState<IUserGet>({
    id: 1,
    name: "John",
    lastName: "Doe",
    cpf: "123.456.789-00",
    crmv: "12345",
    cnpj: "67.467.532/0001-04",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    photoFileName: "john.jpg",
    role: { id: 1, roleName: userTypeEnum.VET }, // Veterinarian
    availableTime: new Date("2024-03-10T09:00:00"),
  });

  const isUserOwner = user.role.roleName === userTypeEnum.OWNER;
  const isUserVet = user.role.roleName === userTypeEnum.VET;

  return (
    <MyContext.Provider value={{ user, isUserOwner, isUserVet }}>
      {children}
    </MyContext.Provider>
  );
}

const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Trying to acess MyContext out of the Provider");
  }

  return context;
};

export { MyContextProvider, useMyContext };
