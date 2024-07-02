import styled from "styled-components/native";
import { ScreenTitle } from "../../shared/components/Title";
import { useState } from "react";
import DatePicker from "../../shared/components/DatePicker";
import AppStyles from "../../styles";
import BackButton from "../../shared/components/BackButton";
import { FlatList } from "react-native";
import { MOCKED_VACCINES } from "../../mocks/mocks";
import VaccineCard from "../../shared/components/Cards/VaccineCard";
import CircularAddButton from "../../shared/components/CircularAddButton";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import CustomDialog from "../../shared/components/CustomDialog";
import { useVaccines } from "../../shared/hooks/useVaccines";
import Loading from "../../shared/components/Loading";
import InfoCard from "../../shared/components/InfoCard";

const Vaccines = ({ navigation }) => {
  const [filter, setFilter] = useState<Date>();
  const [exclusionDialog, setExclusionDialog] = useState<{
    isVisible: boolean;
    itemId: string;
  }>({ isVisible: false, itemId: "-1" });

  const handleHideDialog = () => {
    setExclusionDialog({ isVisible: false, itemId: "-1" });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAdd = () => {
    navigation.navigate("VaccineRegistration");
  };

  const handleCardClick = (id: string) => {
    setExclusionDialog({ isVisible: true, itemId: id });
  };

  const handleDelete = () => {};

  const { data, error, isLoading } = useVaccines();

  return (
    <OrangeContainer>
      <CustomDialog
        handleOk={handleDelete}
        text="Tem certeza que deseja excluir essa vacina?"
        isVisible={exclusionDialog.isVisible}
        handleHide={handleHideDialog}
      />
      <BackButton handleClick={handleBack} isWhite />

      <OrangeContent>
        <ScreenTitle white>Vacinas</ScreenTitle>
        <DatePicker
          placeholder="Filtre por data"
          handleChange={(date) => setFilter(date)}
          value={filter}
          mode="round"
        />
      </OrangeContent>
      <WhiteContainer>
        <ListContainer>
          {!error ? (
            <FlatList
              ListEmptyComponent={
                isLoading ? <Loading /> : <InfoCard type="emptyList" />
              }
              nestedScrollEnabled
              style={{ maxHeight: 380 }}
              data={MOCKED_VACCINES}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => (
                <VaccineCard
                  batch={item.batch}
                  manufacturer={item.manufacturer}
                  vaccineName={item.vaccineName}
                  vetName={item.vet.name}
                  handleClick={() => handleCardClick(item.id.toString())}
                  date={new Date()}
                />
              )}
            />
          ) : (
            <InfoCard type="error" />
          )}
        </ListContainer>
        <AddButtonContainer>
          <CircularAddButton handleClick={handleAdd} />
        </AddButtonContainer>
      </WhiteContainer>
    </OrangeContainer>
  );
};

export default Vaccines;

const OrangeContainer = styled.View`
  background-color: ${AppStyles.colors.primary30};
  flex: 1;
  justify-content: space-between;
  padding-top: 8px;
`;

const OrangeContent = styled.View`
  padding: 0px 20px;
  row-gap: 32px;
`;

const WhiteContainer = styled.View`
  background-color: white;
  height: 70%;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
`;

const ListContainer = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-top: 40px;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;
