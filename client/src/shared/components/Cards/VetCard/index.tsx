import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";
import CustomChip from "../CustomChip";
interface Props {
  name: string;
  specialty: string;
  photo: string;
  distance: string;
  handleClick: () => void;
}
const VetCard = ({ distance, name, photo, specialty, handleClick }: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{`Dr. ${name}`}</OrangeBorderCardTitle>
        <CustomChip text={specialty} color="blue" />
        <DistanceChipContainer>
          <Entypo name="location-pin" size={24} color="black" />
          <DistanceText>Distância {distance}</DistanceText>
        </DistanceChipContainer>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default VetCard;

const DistanceChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  column-gap: 5px;
`;
const DistanceText = styled.Text`
  font-weight: bold;
`;
