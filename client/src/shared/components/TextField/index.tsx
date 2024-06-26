import React, { useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import styled from "styled-components/native";
import { HelperText, TextInput } from "react-native-paper";
import { useCustomTheme } from "../../../customTheme";
import AppStyles from "../../../styles";

interface Props {
  label: string;
  maskType?: "phone" | "data";
  type?: "text" | "password";
  handleChangeText: (e: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  value: string;
}

const TextField = ({
  handleChangeText,
  label,
  maskType,
  type,
  placeholder,
  error,
  errorMessage,
  value,
}: Props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const theme = useCustomTheme();

  const obterMascara = () => {
    if (maskType === "phone") {
      return "(99) 99999-9999";
    }

    if (maskType === "data") {
      return "99/99/9999";
    }
    return "";
  };

  return (
    <Container>
      <Label>{label}</Label>
      {maskType ? (
        <MaskedTextInput
          onChangeText={(text, rawText) => handleChangeText(rawText)}
          mask={obterMascara()}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.lightText}
          value={value}
          style={{
            height: 45,
            paddingLeft: 15,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: theme.colors.primary30,
            borderWidth: 2,
            fontSize: 16,
          }}
        />
      ) : (
        <TextInput
          mode="outlined"
          onChangeText={(text) => handleChangeText(text)}
          secureTextEntry={!passwordVisibility && type === "password"}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder={placeholder}
          value={value}
          autoCorrect={false}
          style={{
            height: 45,
            backgroundColor: "white",
          }}
          outlineStyle={{
            borderRadius: 8,
            borderColor: theme.colors.primary30,
            borderWidth: 2,
          }}
          placeholderTextColor={theme.colors.lightText}
          right={
            type === "password" && (
              <TextInput.Icon
                icon={passwordVisibility ? "eye" : "eye-off"}
                onPress={handlePasswordVisibility}
                color={AppStyles.colors.primary}
              />
            )
          }
        />
      )}
      <HelperText type="error" visible={error}>
        {errorMessage}
      </HelperText>
    </Container>
  );
};

export default TextField;

const Container = styled.View`
  height: 70px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
  color: ${AppStyles.colors.lightText};
`;
