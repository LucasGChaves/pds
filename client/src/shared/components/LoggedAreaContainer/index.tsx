import styled from "styled-components/native";
import AppStyles from "../../../styles";
import React from "react";
import BackButton from "../BackButton";
import { useNavigation } from "@react-navigation/native";
import DeleteButton from "../DeleteButton";
import ShowComponentByRole from "../ShowComponentByRole";
import { userTypeEnum } from "../../../enums/userTypeEnum";
import LogoutButton from "../LogoutButton";

interface Props {
  children: React.ReactNode;
  hideBackButton?: boolean;
  handleDelete?: () => void;
  handleLogout?: () => void;
}

const LoggedAreaContainer = ({
  children,
  hideBackButton,
  handleDelete,
  handleLogout,
}: Props) => {
  const navigate = useNavigation();

  const handleBack = () => {
    navigate.goBack();
  };

  return (
    <Container>
      {!hideBackButton && <BackButton handleClick={handleBack} />}
      <ShowComponentByRole role={userTypeEnum.OWNER}>
        {handleDelete && <DeleteButton handleDelete={handleDelete} />}
      </ShowComponentByRole>
      {handleLogout && <LogoutButton handleLogout={handleLogout} />}
      <Content>{children}</Content>
    </Container>
  );
};

export default LoggedAreaContainer;

const Container = styled.View`
  flex: 1;
  background-color: ${AppStyles.colors.primary30};
  padding: 10px;
`;

const Content = styled.View`
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: white;
  flex: 1;
  border-radius: 12px;
  padding-top: 20px;
`;
