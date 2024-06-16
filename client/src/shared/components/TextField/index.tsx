import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface Props {
  title: string;
  mask?: "phone" | "data";
  type?: "text" | "password";
  handleChangeText: (e: string) => void;
  placeholder: string;
}

const TextField = ({
  handleChangeText,
  title,
  mask,
  type,
  placeholder,
}: Props) => {
  0;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Container>
      <Title>{title}</Title>
      {mask ? (
        <MaskedTextInput
          onChangeText={(text, rawText) => handleChangeText(text)}
        />
      ) : (
        <TextFieldWrapper>
          <TextInput
            onChangeText={(text) => handleChangeText(text)}
            secureTextEntry={passwordVisibility}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder={placeholder}
            autoCorrect={false}
            style={{ borderWidth: 2, width: 250 }}
          />
          <TouchableOpacity
            onPress={handlePasswordVisibility}
            style={{ width: 30 }}
          >
            {passwordVisibility ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        </TextFieldWrapper>
      )}
    </Container>
  );
};

export default TextField;

const Container = styled.View``;

const Title = styled.Text``;

const TextFieldWrapper = styled.View`
  display: "flex";
  width: "100%";
`;
