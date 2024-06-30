import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { MaterialIcons } from "@expo/vector-icons";
interface Props {
  type: "emptyList" | "error";
}

const InfoCard = ({ type }: Props) => {
  return (
    <Container
      style={{
        backgroundColor:
          type === "error"
            ? AppStyles.colors.error
            : AppStyles.colors.noPhotoGray,
      }}
    >
      {type === "error" && (
        <MaterialIcons name="error-outline" size={24} color="black" />
      )}
      <Text>
        {type === "error"
          ? "Ocorreu um erro ao listar os dados. Tente novamente mais tarde"
          : "Não há itens a serem listados"}
      </Text>
    </Container>
  );
};

export default InfoCard;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  border-radius: 4px;
`;

const Text = styled.Text`
  font-size: 16px;
`;
