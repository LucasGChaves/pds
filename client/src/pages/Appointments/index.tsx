import { Searchbar, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { useState } from "react";
import { MOCKED_APPOINTMENTS } from "../../mocks/mocks";
import CircularAddButton from "../../shared/components/CircularAddButton";
import AppointmentCard from "../../shared/components/Cards/AppointmentCard";
import { useAuthContext } from "../../shared/context/AuthContext";
import { PHOTOS_PATH } from "../../utils/constants";
import { useAppointments } from "../../shared/hooks/useAppointments";
import InfoCard from "../../shared/components/InfoCard";
import Loading from "../../shared/components/Loading";

const Appointments = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isUserVet, user } = useAuthContext();

  const handleAdd = () => {
    if (isUserVet) {
      navigation.navigate("NewAppointmentTime");
      return;
    }
    navigation.navigate("Vets");
  };

  const handleCardClick = (id: string) => {
    navigation.navigate("AppointmentDetails", { appointmentId: id });
  };

  const { data, error, isLoading } = useAppointments({
    role: user.role.roleName,
  });

  return (
    <LoggedAreaContainer hideBackButton>
      <Container>
        <ScreenTitle>Minhas consultas</ScreenTitle>
        <Searchbar
          placeholder={
            isUserVet
              ? "Busque pelo pet/tutor(a)"
              : "Busque pelo pet/veterinario(a)"
          }
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {!error ? (
          <FlatList
            ListEmptyComponent={
              isLoading ? <Loading /> : <InfoCard type="emptyList" />
            }
            nestedScrollEnabled
            style={{ height: "60%" }}
            data={MOCKED_APPOINTMENTS}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <AppointmentCard
                viewer={isUserVet ? "vet" : "owner"}
                date={item.appointmentDate}
                ownerName={item.pet.owner.name}
                pacientName={item.pet.name}
                isFinished={item.id % 2 > 0}
                vetName={item.vet.name}
                photo={`${PHOTOS_PATH}pet_${item.pet.id}_${item.pet.owner.cpf}.jpg`}
                handleClick={() => handleCardClick(item.id.toString())}
              />
            )}
          />
        ) : (
          <InfoCard type="error" />
        )}
      </Container>
      <AddButtonContainer>
        <CircularAddButton handleClick={handleAdd} isCalendarIcon={isUserVet} />
      </AddButtonContainer>
    </LoggedAreaContainer>
  );
};

export default Appointments;

const Container = styled.View`
  row-gap: 32px;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;
