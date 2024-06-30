import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { ReactNode } from "react";
import AppStyles from "../../../../styles";

interface Props {
  children: ReactNode;
  photo: string;
  handleClick?: () => void;
}
const OrangeBorderCardSkeleton = ({ children, handleClick, photo }: Props) => {
  return (
    <Container onPress={handleClick}>
      <Photo source={{ uri: photo }} />
      {children}
      <Entypo name="chevron-right" size={40} color={AppStyles.colors.primary} />
    </Container>
  );
};

export default OrangeBorderCardSkeleton;

const Container = styled.TouchableOpacity`
  border-radius: 15px;
  border-color: ${AppStyles.colors.primary30};
  border-width: 3px;
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const Photo = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${AppStyles.colors.noPhotoGray};
`;

export const OrangeBorderCardTitle = styled.Text`
  font-size: 18px;
`;

export const OrangeBorderCardContent = styled.View`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 60%;
  align-items: flex-start;
`;
