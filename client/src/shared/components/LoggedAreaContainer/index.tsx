import styled from "styled-components/native";
import AppStyles from "../../../styles";
import React from "react";
import BackButton from "../BackButton";
import { useNavigation } from "@react-navigation/native";
import DeleteButton from "../DeleteButton";

interface Props {
  children: React.ReactNode;
  hideBackButton?: boolean;
  showDeleteButton?: boolean;
  handleDelete?: () => void;
}

const LoggedAreaContainer = ({
  children,
  hideBackButton,
  showDeleteButton,
  handleDelete,
}: Props) => {
  const navigate = useNavigation();

  const handleBack = () => {
    navigate.goBack();
  };

  return (
    <Container>
      {!hideBackButton && <BackButton handleClick={handleBack} />}
      {showDeleteButton && <DeleteButton handleDelete={handleDelete} />}
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
