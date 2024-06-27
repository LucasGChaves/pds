import { Button, Text } from "react-native-paper";
import LoggedAreaContainer from "../../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../../shared/components/DataListWithDivider";
import VaccineIcon from "../../../assets/icons/VaccineIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppStyles from "../../../styles";

const PetDetails = ({ navigation }) => {
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

  const handleVaccines = () => {
    navigation.navigate("Vaccines");
  };

  const handleEdit = () => {};

  return (
    <LoggedAreaContainer>
      <Container>
        <PhotoContainer>
          <Photo />
          <PetName>Dudu</PetName>
        </PhotoContainer>
        <Button
          icon={({}) => <VaccineIcon fill="white" />}
          mode="contained"
          onPress={handleVaccines}
        >
          Ver vacinas
        </Button>
        <DataListWithDivider data={data} />
        <Button
          labelStyle={{ color: "black" }}
          icon={({ color }) => (
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
      </Container>
    </LoggedAreaContainer>
  );
};

export default PetDetails;

const Container = styled.View`
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
