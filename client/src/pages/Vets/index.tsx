import { Searchbar } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { useState } from "react";
import { MOCKED_USERS } from "../../mocks/mocks";
import { useAuthContext } from "../../shared/context/AuthContext";
import VetCard from "../../shared/components/Cards/VetCard";
import { handleChangeformData } from "../../utils/functions";
import { PHOTOS_PATH } from "../../utils/constants";
import { IVetFiltersFormData } from "../../model/user";
import Loading from "../../shared/components/Loading";
import { useVets } from "../../shared/hooks/useVets";
import InfoCard from "../../shared/components/InfoCard";

const Vets = ({ navigation }) => {
  const [formData, setFormData] = useState<IVetFiltersFormData>();

  const { isUserVet } = useAuthContext();

  const handleCardClick = (id: string) => {
    navigation.navigate("VetInfo", { vetId: id });
  };

  const { data, isLoading, error } = useVets();

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle>Veterinários</ScreenTitle>
        <Searchbar
          placeholder={"Filtre por cidade"}
          onChangeText={(text) =>
            handleChangeformData("city", text, formData, setFormData)
          }
          value={formData?.city}
        />
        <Searchbar
          placeholder={"Filtre por bairro"}
          onChangeText={(text) =>
            handleChangeformData("district", text, formData, setFormData)
          }
          value={formData?.district}
        />
        {!error ? (
          <FlatList
            ListEmptyComponent={
              isLoading ? <Loading /> : <InfoCard type="emptyList" />
            }
            nestedScrollEnabled
            style={{ height: "60%" }}
            data={MOCKED_USERS}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <VetCard
                name={item.name}
                photo={`${PHOTOS_PATH}user_${item.cpf}.jpg`}
                address={{
                  city: "Belo Horizonte",
                  district: "Cidade Nova",
                  street: "Rua Fulana",
                  number: "22",
                }}
                handleClick={() => handleCardClick(item.id.toString())}
              />
            )}
          />
        ) : (
          <InfoCard type="error" />
        )}
      </Container>
    </LoggedAreaContainer>
  );
};

export default Vets;

const Container = styled.View`
  row-gap: 28px;
`;
