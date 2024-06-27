import React, { createContext, useContext, useState } from "react";
import { IUserGet } from "../../model/user";
import { userTypeEnum } from "../../enums/userTypeEnum";

interface MyContextType {
  user: IUserGet;
}

const MyContext = createContext<MyContextType>(null);

function MyContextProvider({ children }) {
  const [value, setValue] = useState<MyContextType>({
    user: {
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
    },
  });

  return (
    <MyContext.Provider value={{ ...value }}>{children}</MyContext.Provider>
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
