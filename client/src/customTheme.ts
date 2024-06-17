import { DefaultTheme, useTheme } from "react-native-paper";
import AppStyles from "./styles";

export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...AppStyles.colors
    },
  };
  
  export type AppTheme = typeof theme;
  export const useCustomTheme = () => useTheme<AppTheme>();