import { useState } from "react";
import UserTypeSelectionPage from "./UserTypeSelectionPage";
import OwnerRegister from "./OwnerRegister";
import VetRegister from "./VetRegister";

const SignUp = ({ navigation }) => {
  const [page, setPage] = useState<"typeSelection" | "owner" | "vet">(
    "typeSelection"
  );

  const [selectedUserType, setSelectedUserType] = useState<string>();
  const handleChangeSelectedUser = (value: string) => {
    setSelectedUserType(value);
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleUserTypeSelectionNextPage = () => {
    if (selectedUserType)
      setPage(selectedUserType === "owner" ? "owner" : "vet");
  };

  const handleRegister = () => {};

  const handleBackToUserTypeSelection = () => {
    setPage("typeSelection");
  };

  switch (page) {
    case "typeSelection":
      return (
        <UserTypeSelectionPage
          handleChangeSelectValue={handleChangeSelectedUser}
          selectValue={selectedUserType}
          handleBack={handleBackToLogin}
          handleNextPage={handleUserTypeSelectionNextPage}
        />
      );
    case "owner":
      return <OwnerRegister handleBack={handleBackToUserTypeSelection} />;
    case "vet":
      return <VetRegister handleBack={handleBackToUserTypeSelection} />;
  }

  return <></>;
};

export default SignUp;
