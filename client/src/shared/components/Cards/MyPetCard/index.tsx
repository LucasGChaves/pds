import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";
import CustomChip from "../CustomChip";

interface Props {
  name: string;
  breed: string;
  age: string;
  photo: string;
  handleClick: () => void;
}
const MyPetCard = ({ age, breed, handleClick, name, photo }: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{name}</OrangeBorderCardTitle>
        <CustomChip text={breed} color="green" />
        <AgeText>{age} anos</AgeText>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default MyPetCard;

const AgeText = styled.Text`
  font-weight: bold;
  color: ${AppStyles.colors.lightText};
`;
