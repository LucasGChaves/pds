import React from "react";
import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { DatePickerModal } from "react-native-paper-dates";
import { Text } from "react-native";

interface Props {
  label: string;
  handleChange: (e: Date) => void;
  placeholder?: string;
  value: Date;
}

const DatePicker = ({ handleChange, label, placeholder, value }: Props) => {
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      handleChange(params.date);
    },
    [setOpen, value]
  );

  return (
    <Container>
      <Label>{label}</Label>
      <Field
        onPress={() => setOpen(true)}
        style={{
          height: 45,
          paddingLeft: 15,
          backgroundColor: "white",
          borderRadius: 8,
          borderColor: AppStyles.colors.primary30,
          borderWidth: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: value ? "black" : AppStyles.colors.lightText,
          }}
        >
          {value?.toLocaleDateString() ?? "Selecione a data"}
        </Text>
      </Field>
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={value}
        onConfirm={onConfirmSingle}
      />
    </Container>
  );
};

export default DatePicker;

const Container = styled.View`
  height: 70px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
  color: ${AppStyles.colors.lightText};
`;

const Field = styled.TouchableHighlight`
  height: 45px;
  padding-left: 15px;
  background-color: white;
  border-radius: 8px;
  border-color: ${AppStyles.colors.primary30};
  border-width: 2px;
  display: "flex";
  justify-content: "center";
`;
