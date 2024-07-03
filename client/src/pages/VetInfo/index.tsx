import styled from "styled-components/native";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppointmentScreensStackParamList } from "../../../App";
import { MOCKED_USERS } from "../../mocks/mocks";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Select, { ItemProps } from "../../shared/components/Select";
import { handleChangeformData } from "../../utils/functions";
import AppStyles from "../../styles";
import { PHOTOS_PATH } from "../../utils/constants";
import { useVet } from "../../shared/hooks/useVet";
import { usePets } from "../../shared/hooks/usePets";
import { useAuthContext } from "../../shared/context/AuthContext";
import { ScheduleAppointmentFormData } from "../../model/appointment";

const VetInfo = ({ navigation }) => {
  const [formData, setFormData] = useState<ScheduleAppointmentFormData>();
  const { user } = useAuthContext();

  const route =
    useRoute<RouteProp<AppointmentScreensStackParamList, "VetInfo">>();
  const id = route.params.vetId;

  const {
    data: vetData,
    isLoading: isLoadingVet,
    error: vetError,
  } = useVet(id);

  const {
    data: pets,
    isLoading: isLoadingPets,
    error: petsError,
  } = usePets({ role: user.role.roleName });

  const petsSelectValues: ItemProps[] = pets?.map(
    (pet): ItemProps => ({
      label: pet.name,
      value: pet.id.toString(),
    })
  );

  const vet = MOCKED_USERS[0];

  const handleSchedule = () => {};

  const DATES_MOCK: ItemProps[] = [
    {
      label: "20/07/2024",
      value: "20/07/2024",
    },
    {
      label: "21/07/2024",
      value: "21/07/2024",
    },
  ];
  const TIMES_MOCK: ItemProps[] = [
    {
      label: "08:00",
      value: "08:00",
    },
    {
      label: "09:00",
      value: "09:00",
    },
  ];

  const { data, isLoading, error } = useVet(id);

  return (
    <LoggedAreaContainer isLoading={isLoading} error={Boolean(error)}>
      <Container>
        <PhotoContainer>
          <Photo source={{ uri: `${PHOTOS_PATH}user_${vet.cpf}.jpg` }} />
          <VetInfoText>{`${vet.name} ${vet.lastName}`}</VetInfoText>
          <VetInfoText>{`CRMV/${vet.address.state} ${vet.crmv}`}</VetInfoText>
          <AddressText>{`${vet.address.city} | Bairro ${vet.address.district} | ${vet.address.street}, ${vet.address.number}`}</AddressText>
        </PhotoContainer>
        <SelectsContainer>
          <Select
            data={DATES_MOCK}
            placeholder="Escolha o dia da consulta"
            handleChangeValue={(value) =>
              handleChangeformData("date", value, formData, setFormData)
            }
            value={formData?.date}
          />
          <Select
            data={TIMES_MOCK}
            placeholder="Escolha o horário da consulta"
            handleChangeValue={(value) =>
              handleChangeformData("time", value, formData, setFormData)
            }
            value={formData?.time}
          />
          <Select
            data={petsSelectValues}
            placeholder="Escolha o o pet que irá na consulta"
            handleChangeValue={(value) =>
              handleChangeformData("petId", value, formData, setFormData)
            }
            value={formData?.petId}
          />
        </SelectsContainer>
        <ButtonContainer>
          <Button
            mode="contained"
            onPress={handleSchedule}
            icon={({}) => (
              <FontAwesome name="calendar-check-o" size={20} color="white" />
            )}
          >
            Agendar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default VetInfo;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
  text-align: center;
`;

const PhotoContainer = styled.View`
  row-gap: 8px;
`;
const Photo = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${AppStyles.colors.noPhotoGray};
  margin: 0 auto;
`;

const VetInfoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const AddressText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const SelectsContainer = styled.View`
  row-gap: 16px;
`;

const ButtonContainer = styled.View``;
