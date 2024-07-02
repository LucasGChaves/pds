import styled from "styled-components/native";
import AppStyles from "../../../styles";
import React from "react";
import BackButton from "../BackButton";
import { useNavigation } from "@react-navigation/native";
import DeleteButton from "../DeleteButton";
import ShowComponentByRole from "../ShowComponentByRole";
import { userTypeEnum } from "../../../enums/userTypeEnum";
import LogoutButton from "../LogoutButton";
import Loading from "../Loading";
import InfoCard from "../InfoCard";

interface Props {
  children: React.ReactNode;
  hideBackButton?: boolean;
  handleDelete?: () => void;
  handleLogout?: () => void;
  isLoading?: boolean;
  error?: boolean;
}

const LoggedAreaContainer = ({
  children,
  hideBackButton,
  handleDelete,
  handleLogout,
  isLoading,
  error,
}: Props) => {
  const navigate = useNavigation();

  const handleBack = () => {
    navigate.goBack();
  };

  const getContent = () => {
    if (isLoading) return <Loading />;

    if (error) return <InfoCard type="error" />;

    return children;
  };

  return (
    <Container>
      {!hideBackButton && <BackButton handleClick={handleBack} />}
      <ShowComponentByRole role={userTypeEnum.OWNER}>
        {handleDelete && <DeleteButton handleDelete={handleDelete} />}
      </ShowComponentByRole>
      {handleLogout && <LogoutButton handleLogout={handleLogout} />}
      <Content>{getContent()}</Content>
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
