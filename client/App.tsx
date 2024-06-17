import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScreenTitle } from "./src/shared/components/Title";
import TextField from "./src/shared/components/TextField";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { theme } from "./src/customTheme";
import Select from "./src/shared/components/Select";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState(null);

  const handleChangeValue = (value: string) => {
    setValue(value);
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScreenTitle>Cadastro</ScreenTitle>
          <TextField
            placeholder="Email"
            handleChangeText={() => {}}
            label="Email"
            maskType="phone"
          />
          <Select
            data={data}
            handleChangeValue={handleChangeValue}
            label="Labelaa"
            placeholder="Placeholder"
            value="value"
          />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}
