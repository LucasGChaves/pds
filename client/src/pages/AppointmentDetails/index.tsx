import styled from "styled-components/native";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { ScreenTitle } from "../../shared/components/Title";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppointmentScreensStackParamList } from "../../../App";
import AppointmentDetailsCard from "../../shared/components/Cards/AppointmentDetailCard";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { MOCKED_APPOINTMENTS } from "../../mocks/mocks";
import CircularAddButton from "../../shared/components/CircularAddButton";
import AppStyles from "../../styles";
import { useEffect, useState } from "react";
import AppointmentDescription from "../../shared/components/AppointmentDescription";
import { handleChangeformData } from "../../utils/functions";
import { useAuthContext } from "../../shared/context/AuthContext";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { PHOTOS_PATH } from "../../utils/constants";
import { IAppointmentDetailsFormData } from "../../model/appointment";
import { useAppointment } from "../../shared/hooks/useAppointment";
import InfoCard from "../../shared/components/InfoCard";

const AppointmentDetails = ({ navigation }) => {
  const route =
    useRoute<
      RouteProp<AppointmentScreensStackParamList, "AppointmentDetails">
    >();
  const id = route.params.appointmentId;

  const { isUserOwner } = useAuthContext();

  const [formData, setFormData] = useState<IAppointmentDetailsFormData>();

  const [showDescription, setShowDescription] = useState(false);

  const appointment = MOCKED_APPOINTMENTS[1];

  useEffect(() => {
    if (appointment?.description) {
      setFormData({ description: appointment.description });
      setShowDescription(true);
    }
  }, []);

  const handleFinishAppointment = () => {};

  const handleAttachExamRequest = () => {};

  const handleAttachExamResult = () => {};

  const handleChipClick = () => {
    navigation.navigate("PetDetails", { petId: appointment.pet.id });
  };

  const handleAddDescription = () => {
    setShowDescription(true);
  };

  const { user } = useAuthContext();
  const { data, error, isLoading } = useAppointment({
    role: user.role.roleName,
    id: id,
  });

  return (
    <LoggedAreaContainer isLoading={isLoading} error={Boolean(error)}>
      <Container>
        <ScreenTitle>Consulta n° {id}</ScreenTitle>
        {!error ? (
          <Content>
            <AppointmentDetailsCard
              date={appointment.appointmentDate.toLocaleDateString()}
              handleChipClick={handleChipClick}
              vetName={appointment.vet.name}
              ownerName={appointment.pet.owner.name}
              petName={appointment.pet.name}
              viewerType={isUserOwner ? "owner" : "vet"}
              photo={`${PHOTOS_PATH}pet_${appointment.pet.id}_${appointment.pet.owner.cpf}.jpg`}
            />
            {showDescription ? (
              <AppointmentDescription
                descriptionField={formData?.description}
                handleChangeDescription={(description) =>
                  handleChangeformData(
                    "description",
                    description,
                    formData,
                    setFormData
                  )
                }
                appointment={appointment}
              />
            ) : (
              <>
                <ShowComponentByRole role={userTypeEnum.VET}>
                  <TouchableDescriptionContainerWrapper
                    onPress={handleAddDescription}
                  >
                    <DescriptionContainer>
                      <CircularAddButton />
                      <DescriptionText>
                        Adicionar descrição da consulta
                      </DescriptionText>
                    </DescriptionContainer>
                  </TouchableDescriptionContainerWrapper>
                </ShowComponentByRole>
                <ShowComponentByRole role={userTypeEnum.OWNER}>
                  <DescriptionContainerWrapper>
                    <DescriptionContainer>
                      <DescriptionText>
                        O veterinário ainda não adicionou a descrição da
                        consulta
                      </DescriptionText>
                    </DescriptionContainer>
                  </DescriptionContainerWrapper>
                </ShowComponentByRole>
              </>
            )}

            <ButtonsContainer>
              <ShowComponentByRole role={userTypeEnum.VET}>
                <Button
                  mode="outlined"
                  icon={({}) => (
                    <Feather
                      name="upload"
                      size={20}
                      color={AppStyles.colors.primary}
                    />
                  )}
                  onPress={handleAttachExamRequest}
                  style={{ borderColor: AppStyles.colors.primary30 }}
                >
                  Anexar pedido de exame
                </Button>
                <Button
                  mode="contained"
                  icon={({}) => (
                    <Feather name="check" size={24} color="white" />
                  )}
                  onPress={handleFinishAppointment}
                >
                  Concluir consulta
                </Button>
              </ShowComponentByRole>
              <ShowComponentByRole role={userTypeEnum.OWNER}>
                <Button
                  mode="contained"
                  icon={({}) => (
                    <Feather name="upload" size={20} color="white" />
                  )}
                  onPress={handleAttachExamResult}
                >
                  Anexar resultado de exame
                </Button>
              </ShowComponentByRole>
            </ButtonsContainer>
          </Content>
        ) : (
          <InfoCard type="error" />
        )}
      </Container>
    </LoggedAreaContainer>
  );
};

export default AppointmentDetails;

const Container = styled.View`
  flex: 1;
  row-gap: 16px;
`;

const Content = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const TouchableDescriptionContainerWrapper = styled.TouchableOpacity`
  align-items: center;
`;

const DescriptionContainerWrapper = styled.View`
  align-items: center;
`;
const DescriptionContainer = styled.View`
  align-items: center;
  width: 250px;
  row-gap: 4px;
`;

const DescriptionText = styled.Text`
  text-align: center;
  font-size: 16px;
`;

const ButtonsContainer = styled.View`
  row-gap: 16px;
  padding-bottom: 16px;
`;
