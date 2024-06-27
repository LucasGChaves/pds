import { Button, Searchbar, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import { FlatList, ScrollView } from "react-native";
import { useState } from "react";
import { MOCKED_PETS } from "../../mocks/mocks";
import MyPetCard from "../../shared/components/Cards/MyPetCard";
import CircularAddButton from "../../shared/components/CircularAddButton";

const Pets = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    navigation.navigate("PetRegistration");
  };

  const handleCardClick = (id: string) => {
    navigation.navigate("PetDetails", id);
  };

  return (
    <LoggedAreaContainer hideBackButton>
      <Container>
        <ScreenTitle>Meus pets</ScreenTitle>
        <Searchbar
          placeholder="Busque pelo nome do pet"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          nestedScrollEnabled
          // style={{ height: "56%" }}
          style={{ maxHeight: 425, height: "58%" }}
          data={MOCKED_PETS}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <MyPetCard
              age={item.age}
              breed={item.breed}
              handleClick={() => handleCardClick(item.id.toString())}
              name={item.name}
              photo={item.photo}
            />
          )}
        />
      </Container>
      <AddButtonContainer>
        <CircularAddButton handleClick={handleAdd} />
      </AddButtonContainer>
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
`;
