import { Button, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../shared/components/DataListWithDivider";
import VaccineIcon from "../../assets/icons/VaccineIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppStyles from "../../styles";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { Ionicons } from "@expo/vector-icons";
import { useMyContext } from "../../shared/context/MyContext";

const PetDetails = ({ navigation }) => {
  const { user } = useMyContext();

  const data: DataListValueType[] = [
    {
      leftValue: "Espécie",
      rightValue: "Cachorro",
    },
    {
      leftValue: "Raça",
      rightValue: "Poodle",
    },
    {
      leftValue: "Idade",
      rightValue: "12 anos",
    },
  ];

  const ownerValues: DataListValueType = {
    leftValue: "Tutor",
    rightValue: "Fulanoildo da Silva",
  };

  if (user.role.roleName === userTypeEnum.VET) {
    data.push(ownerValues);
  }

  const handleVaccines = () => {
    navigation.navigate("Vaccines");
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleShowOwnerInfo = () => {
    navigation.navigate("OwnerInfo");
  };

  return (
    <LoggedAreaContainer handleDelete={handleDelete}>
      <Container>
        <PhotoContainer>
          <Photo />
          <PetName>Dudu</PetName>
        </PhotoContainer>
        <Button
          icon={({}) => <VaccineIcon fill="white" />}
          mode="contained"
          onPress={handleVaccines}
          style={{ backgroundColor: AppStyles.colors.primary40 }}
        >
          Ver vacinas
        </Button>
        <DataListWithDivider data={data} />
        <ShowComponentByRole role={userTypeEnum.OWNER}>
          <Button
            labelStyle={{ color: "black" }}
            icon={({}) => (
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
            )}
            mode="outlined"
            style={{
              width: 150,
              marginHorizontal: "auto",
              borderColor: AppStyles.colors.primary30,
            }}
            onPress={handleEdit}
          >
            Editar
          </Button>
        </ShowComponentByRole>
        <ShowComponentByRole role={userTypeEnum.VET}>
          <Button
            icon={({}) => <Ionicons name="person" size={24} color="black" />}
            mode="outlined"
            onPress={handleShowOwnerInfo}
            labelStyle={{ color: "black" }}
            style={{
              borderColor: AppStyles.colors.primary20,
            }}
          >
            Informações de contato do tutor
          </Button>
        </ShowComponentByRole>
      </Container>
    </LoggedAreaContainer>
  );
};

export default PetDetails;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
  text-align: center;
`;

const PhotoContainer = styled.View`
  row-gap: 16px;
`;
const Photo = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: gray;
  margin: 0 auto;
`;

const PetName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
