import { Button, Searchbar, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import { FlatList, ScrollView } from "react-native";
import { useState } from "react";
import { MOCKED_PETS } from "../../mocks/mocks";
import MyPetCard from "../../shared/components/Cards/MyPetCard";
import CircularAddButton from "../../shared/components/CircularAddButton";
import PatientCard from "../../shared/components/Cards/PatientCard";
import { useAuthContext } from "../../shared/context/AuthContext";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { PHOTOS_PATH } from "../../utils/constants";
import InfoCard from "../../shared/components/InfoCard";
import { usePets } from "../../shared/hooks/usePets";
import Loading from "../../shared/components/Loading";

const Pets = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isUserOwner, user } = useAuthContext();

  const handleAdd = () => {
    navigation.navigate("PetRegistration");
  };

  const handleCardClick = (id: string) => {
    navigation.navigate("PetDetails", { petId: id });
  };

  const { data, error, isLoading } = usePets({
    role: user.role.roleName,
  });

  return (
    <LoggedAreaContainer hideBackButton>
      <Container>
        <ScreenTitle>
          {isUserOwner ? "Meus pets" : "Meus pacientes"}
        </ScreenTitle>
        <Searchbar
          placeholder="Busque pelo nome do pet"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {!error ? (
          <FlatList
            nestedScrollEnabled
            ListEmptyComponent={
              isLoading ? <Loading /> : <InfoCard type="emptyList" />
            }
            style={
              isUserOwner
                ? { maxHeight: 425, height: "58%" }
                : { height: "62%" }
            }
            data={MOCKED_PETS}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => {
              return isUserOwner ? (
                <MyPetCard
                  age={item.age}
                  breed={item.breed}
                  handleClick={() => handleCardClick(item.id.toString())}
                  name={item.name}
                  photo={PHOTOS_PATH + `pet_${item.id}_${item.owner.cpf}.jpg`}
                />
              ) : (
                <PatientCard
                  age={item.age}
                  species={item.species}
                  ownerName={item.owner.name}
                  handleClick={() => handleCardClick(item.id.toString())}
                  name={item.name}
                  photo={PHOTOS_PATH + `pet_${item.id}_${item.owner.cpf}.jpg`}
                />
              );
            }}
          />
        ) : (
          <InfoCard type="error" />
        )}
      </Container>
      <ShowComponentByRole role={userTypeEnum.OWNER}>
        <AddButtonContainer>
          <CircularAddButton handleClick={handleAdd} />
        </AddButtonContainer>
      </ShowComponentByRole>
    </LoggedAreaContainer>
  );
};

export default Pets;

const Container = styled.View`
  row-gap: 32px;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 999;
`;
