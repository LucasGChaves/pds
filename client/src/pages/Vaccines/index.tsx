import styled from "styled-components/native";
import { ScreenTitle } from "../../shared/components/Title";
import { useState } from "react";
import DatePicker from "../../shared/components/DatePicker";
import AppStyles from "../../styles";

const Vaccines = ({ navigation }) => {
  const [filter, setFilter] = useState<Date>();

  return (
    <OrangeContainer>
      <ScreenTitle white>Vacinas</ScreenTitle>
      <DatePicker
        placeholder="Filtre por data"
        handleChange={(date) => setFilter(date)}
        value={filter}
        mode="round"
      />
    </OrangeContainer>
  );
};

export default Vaccines;

const OrangeContainer = styled.View`
  background-color: ${AppStyles.colors.primary30};
  flex: 1;
`;

const WhiteContainer = styled.View``;

const ListContainer = styled.View``;
