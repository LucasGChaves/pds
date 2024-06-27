import { DefaultTheme, useTheme } from "react-native-paper";
import AppStyles from "./styles";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...AppStyles.colors,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level3: AppStyles.colors.primary10,
    },
  },
};

export type AppTheme = typeof theme;
export const useCustomTheme = () => useTheme<AppTheme>();
