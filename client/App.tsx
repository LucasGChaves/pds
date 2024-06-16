import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ScreenTitle } from "./src/shared/components/Title";
import TextField from "./src/shared/components/TextField";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={styles.container}>
          <ScreenTitle>Cadastro</ScreenTitle>
          <TextField
            placeholder="Email"
            handleChangeText={() => {}}
            title="Email"
          />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
