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
import Appointments from "./src/pages/Appointments";
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
import NewAppointmentTime from "./src/pages/NewAppointmentTime";
import VetInfo from "./src/pages/VetInfo";
import AppointmentDetails from "./src/pages/AppointmentDetails";

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
        name="PetsScreens"
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
        name="AppointmentScreens"
        component={AppointmentScreens}
        options={{
          tabBarLabel: "Consultas",
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

export type PetsScreensStackParamList = {
  PetRegistration?: {
    pet: {
      id: string;
      name: string;
      species: string;
      breed: string;
      birthDate: string;
    };
  };
  PetDetails: { petId: string };
  Pets: undefined;
  OwnerInfo: { data: { email: string; phone: string; cpf: string } };
  name: undefined;
  VaccineRegistration: undefined;
  Vaccines: undefined;
};

const PetsScreens = () => {
  const Stack = createNativeStackNavigator<PetsScreensStackParamList>();

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

export type AppointmentScreensStackParamList = {
  VetInfo?: {
    vetId: string;
  };
  Appointments: undefined;
  AppointmentDetails: { appointmentId: string };
  Vets: undefined;
  NewAppointment: undefined;
  NewAppointmentTime: undefined;
};

const AppointmentScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Appointments"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Vets" component={Vets} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="NewAppointment" component={NewAppointment} />
      <Stack.Screen name="NewAppointmentTime" component={NewAppointmentTime} />
      <Stack.Screen name="VetInfo" component={VetInfo} />
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
