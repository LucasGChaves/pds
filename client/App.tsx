import { NavigationContainer } from "@react-navigation/native";

import { ScreenTitle } from "./src/shared/components/Title";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { theme } from "./src/customTheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={TesteScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const TesteScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, rowGap: 20 }}>
      <ScreenTitle>Cadastro</ScreenTitle>
    </SafeAreaView>
  );
};
