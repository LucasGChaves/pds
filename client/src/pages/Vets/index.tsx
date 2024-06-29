import { Searchbar, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { useState } from "react";
import { MOCKED_APPOINTMENTS, MOCKED_USERS } from "../../mocks/mocks";
import CircularAddButton from "../../shared/components/CircularAddButton";
import AppointmentCard from "../../shared/components/Cards/AppointmentCard";
import { useMyContext } from "../../shared/context/MyContext";
import VetCard from "../../shared/components/Cards/VetCard";

const Vets = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isUserVet } = useMyContext();

  const handleCardClick = (id: string) => {};

  return (
    <LoggedAreaContainer hideBackButton>
      <Container>
        <ScreenTitle>Veterinários</ScreenTitle>
        <Searchbar
          placeholder={"Busque por cidade ou bairro"}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          nestedScrollEnabled
          style={{ height: "60%" }}
          data={MOCKED_USERS}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <VetCard
              name={item.name}
              photo=""
              address={{
                city: "Belo Horizonte",
                neightborhood: "Cidade Nova",
                street: "Rua Fulana",
                number: "22",
              }}
              handleClick={() => handleCardClick(item.id.toString())}
            />
          )}
        />
      </Container>
    </LoggedAreaContainer>
  );
};

export default Vets;

const Container = styled.View`
  row-gap: 32px;
`;
