import { useState } from "react";
import UserTypeSelectionPage from "./UserTypeSelectionPage";

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
      return <></>;
    case "vet":
      return <></>;
  }

  return <></>;
};

export default SignUp;
