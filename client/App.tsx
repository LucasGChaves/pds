import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { theme } from "./src/customTheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyProfile from "./src/pages/MyProfile";
import Pets from "./src/pages/Pets";
import MyAppointments from "./src/pages/MyAppointments";
import PetRegistration from "./src/pages/PetRegistration";
import PetDetails from "./src/pages/PetDetails";
import Vaccines from "./src/pages/Vaccines";
import Vets from "./src/pages/Vets";
import NewAppointment from "./src/pages/NewAppointment";
import ProfileEdition from "./src/pages/ProfileEdition";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MyContextProvider } from "./src/shared/context/MyContext";
import { pt, registerTranslation } from "react-native-paper-dates";
import VaccineRegistration from "./src/pages/VaccineRegistration";
import OwnerInfo from "./src/pages/OwnerInfo";

registerTranslation("pt", pt);

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
    <MyContextProvider>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={navTheme}>
            <SafeAreaView style={{ flex: 1 }}>
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
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </MyContextProvider>
  );
}

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Pets"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { paddingBottom: 5 },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Pets"
        component={PetsScreens}
        options={{
          tabBarLabel: "Pets",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="paw"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentScreens}
        options={{
          tabBarLabel: "Conusltas",
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="user-doctor"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PetsScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pets" component={Pets} />
      <Stack.Screen name="PetRegistration" component={PetRegistration} />
      <Stack.Screen name="PetDetails" component={PetDetails} />
      <Stack.Screen name="OwnerInfo" component={OwnerInfo} />
      <Stack.Screen name="Vaccines" component={Vaccines} />
      <Stack.Screen
        name="VaccineRegistration"
        component={VaccineRegistration}
      />
    </Stack.Navigator>
  );
};

const AppointmentScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MyAppointments"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Vets" component={Vets} />
      <Stack.Screen name="NewAppointment" component={NewAppointment} />
    </Stack.Navigator>
  );
};

const ProfileScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileEdition"
        component={ProfileEdition}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
