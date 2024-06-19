import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import styled from "styled-components/native";
import AppStyles from "../../../styles";

interface ItemProps {
  label: string;
  value: string;
}

interface Props {
  data: ItemProps[];
  placeholder: string;
  label: string;
  value: string;
  handleChangeValue: (value: string) => void;
}

const Select = ({
  data,
  handleChangeValue,
  label,
  placeholder,
  value,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container>
      <Label>{label}</Label>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: AppStyles.colors.primary },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          handleChangeValue(item.value);
          setIsFocus(false);
        }}
        // renderInputSearch={() => (
        //   <TextInput
        //     style={{
        //       borderWidth: 0.5,
        //       borderColor: "#DDDDDD",
        //       paddingHorizontal: 8,
        //       marginBottom: 5,
        //       margin: 6,
        //       height: 45,
        //       borderRadius: 8,
        //     }}
        //     value={value}
        //     onChangeText={(e) => {
        //       handleChangeValue(e);
        //     }}
        //     // placeholderTextColor="rgba(0,0,0,.5)"
        //   />
        // )}
      />
    </Container>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: AppStyles.colors.primary30,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: AppStyles.colors.lightText,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const Container = styled.View`
  padding: 0px 20px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
  color: ${AppStyles.colors.lightText};
`;
