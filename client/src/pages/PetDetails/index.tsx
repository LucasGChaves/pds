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
import { useAuthContext } from "../../shared/context/AuthContext";
import { PetsScreensStackParamList } from "../../../App";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PHOTOS_PATH } from "../../utils/constants";

const petToBeEdited = {
  id: 2,
  name: "Buddy",
  owner: {
    id: 4,
    name: "Bob",
    lastName: "Williams",
    cpf: "789.123.456-00",
    crmv: "",
    cnpj: "67.467.532/0001-04",
    email: "bob.williams@example.com",
    phone: "(11) 66666-6666",
    photoFileName: "bob.jpg",
    role: { id: 1, name: "owner" }, // Pet Owner
    availableTime: new Date(),
  }, // Alice
  birthDate: new Date("2020-05-15"),
  species: "Dog",
  breed: "Golden Retriever",
  photo: "buddy.jpg",
  age: 3,
};

const PetDetails = ({ navigation }) => {
  const { user } = useAuthContext();

  const route = useRoute<RouteProp<PetsScreensStackParamList, "PetDetails">>();
  const id = route.params.petId;

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

  const handleEdit = () => {
    navigation.navigate("PetRegistration", {
      pet: {
        id: petToBeEdited.id,
        name: petToBeEdited.name,
        species: petToBeEdited.species,
        breed: petToBeEdited.breed,
        birthDate: petToBeEdited.birthDate.toUTCString(),
      },
    });
  };

  const handleDelete = () => {};

  const handleShowOwnerInfo = () => {
    // TODO: passar informações do dono
    navigation.navigate("OwnerInfo", {
      data: {
        email: "email@email.com",
        phone: "(31) 93333-3333",
        cpf: "123.456.789-00",
      },
    });
  };

  return (
    <LoggedAreaContainer handleDelete={handleDelete}>
      <Container>
        <PhotoContainer>
          {/* TODO: mudar codigo abaixo para pegar o cpf do owner que vem no pet */}
          <Photo source={{ uri: `${PHOTOS_PATH}pet_${id}_${user.cpf}.jpg` }} />
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
            icon={({}) => (
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={AppStyles.colors.primary}
              />
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
