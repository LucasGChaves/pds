import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../shared/components/DataListWithDivider";
import AppStyles from "../../styles";
import { PHOTOS_PATH } from "../../utils/constants";
import { PetsScreensStackParamList } from "../../../App";
import { RouteProp, useRoute } from "@react-navigation/native";

const OwnerInfo = ({ navigation }) => {
  const route = useRoute<RouteProp<PetsScreensStackParamList, "OwnerInfo">>();
  const { cpf, email, phone } = route.params.data;

  const data: DataListValueType[] = [
    {
      leftValue: "Email",
      rightValue: email,
    },
    {
      leftValue: "Telefone",
      rightValue: phone,
    },
  ];

  return (
    <LoggedAreaContainer>
      <Container>
        <PhotoContainer>
          <Photo source={{ uri: `${PHOTOS_PATH}user_${cpf}.jpg` }} />
          <PetName>Fulanildo</PetName>
        </PhotoContainer>
        <DataListWithDivider data={data} />
      </Container>
    </LoggedAreaContainer>
  );
};

export default OwnerInfo;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
  text-align: center;
`;

const PhotoContainer = styled.View`
  row-gap: 16px;
`;
const Photo = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${AppStyles.colors.noPhotoGray};
  margin: 0 auto;
`;

const PetName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
