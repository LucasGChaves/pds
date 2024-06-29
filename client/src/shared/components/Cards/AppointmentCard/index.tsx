import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomChip from "../CustomChip";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";

interface Props {
  viewer: "vet" | "owner";
  pacientName: string;
  vetName: string;
  ownerName: string;
  date: Date;
  photo: string;
  handleClick: () => void;
  isFinished: boolean;
}
const AppointmentCard = ({
  vetName,
  pacientName,
  date,
  handleClick,
  ownerName,
  viewer,
  photo,
  isFinished,
}: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{pacientName}</OrangeBorderCardTitle>
        <CustomChip
          text={viewer === "owner" ? `Dr(a). ${vetName}` : ownerName}
          color={viewer === "owner" ? "blue" : "green"}
          icon={<MaterialIcons name="account-circle" size={24} color="white" />}
        />
        <DateText isFinished={isFinished}>
          {isFinished ? "Finalizada" : date.toLocaleDateString()}
        </DateText>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default AppointmentCard;

interface DateTextProps {
  isFinished: boolean;
}

const DateText = styled.Text<DateTextProps>`
  font-weight: bold;
  color: ${(props) =>
    props.isFinished ? AppStyles.colors.red : AppStyles.colors.green};
`;
