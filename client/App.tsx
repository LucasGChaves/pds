import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { PaperProvider } from "react-native-paper";
import { theme } from "./src/customTheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import { SafeAreaView } from "react-native-safe-area-context";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={navTheme}>
          <SafeAreaView style={{ flex: 1, paddingTop: 8 }}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
