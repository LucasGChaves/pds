import React, { ReactNode } from "react";
import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { DatePickerModal } from "react-native-paper-dates";
import { Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  label?: string;
  handleChange: (e: Date) => void;
  placeholder: string;
  value: Date;
  mode: "outlined" | "round";
}

const DatePicker = ({
  handleChange,
  label,
  placeholder,
  value,
  mode,
}: Props) => {
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
      <Field onPress={() => setOpen(true)} mode={mode}>
        <Content>
          <Text
            style={{
              fontSize: 16,
              color: value ? "black" : AppStyles.colors.lightText,
            }}
          >
            {value?.toLocaleDateString() ?? placeholder}
          </Text>
          <Entypo name="calendar" size={24} color={AppStyles.colors.primary} />
        </Content>
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

interface FieldProps {
  mode: "outlined" | "round";
  children: ReactNode;
  onPress: () => void;
}

const Field = ({ mode, children, onPress }: FieldProps) => {
  if (mode == "outlined")
    return (
      <OutlinedField
        onPress={onPress}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </OutlinedField>
    );

  return (
    <RoundField
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {children}
    </RoundField>
  );
};

const Container = styled.View`
  height: 70px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
  color: ${AppStyles.colors.lightText};
`;

const OutlinedField = styled.TouchableHighlight`
  height: 45px;
  background-color: white;
  border-radius: 8px;
  border-color: ${AppStyles.colors.primary30};
  border-width: 2px;
  display: "flex";
  justify-content: "center";
`;

const RoundField = styled.TouchableHighlight`
  height: 45px;
  padding-left: 15px;
  background-color: white;
  border-radius: 25px;
  display: "flex";
  justify-content: "center";
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
`;
