import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";
import CustomChip from "../CustomChip";
interface Props {
  name: string;
  // specialty: string;
  photo: string;
  address: {
    city: string;
    neightborhood: string;
    street: string;
    number: string;
  };
  handleClick: () => void;
}
const VetCard = ({ address, name, photo, handleClick }: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{`Dr. ${name}`}</OrangeBorderCardTitle>
        <AddressChipContainer>
          <Entypo name="location-pin" size={24} color="black" />
          <AddressTextContainer>
            <AddressText>{`${address.city}, ${address.neightborhood}`}</AddressText>
            <AddressText>{`${address.street}, ${address.number}`}</AddressText>
          </AddressTextContainer>
        </AddressChipContainer>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default VetCard;

const AddressChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AddressTextContainer = styled.View``;
const AddressText = styled.Text`
  font-weight: bold;
`;
