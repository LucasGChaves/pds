import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";
import CustomChip from "../CustomChip";
interface Props {
  name: string;
  species: string;
  age: number;
  ownerName: string;
  photo: string;
  handleClick: () => void;
}
const PatientCard = ({
  age,
  name,
  ownerName,
  species,
  handleClick,
  photo,
}: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{name}</OrangeBorderCardTitle>
        <ChipsWrapper>
          <CustomChip text={species} color="blue" />
          <CustomChip text={age + " anos"} color="blue" />
          <CustomChip
            text={ownerName}
            color="orange"
            icon={
              <MaterialIcons name="account-circle" size={16} color="white" />
            }
          />
        </ChipsWrapper>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default PatientCard;

const ChipsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
