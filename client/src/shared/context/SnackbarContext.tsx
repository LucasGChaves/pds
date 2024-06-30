import { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

interface SnackbarContextType {
  setSnackbarParams: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      text: string;
    }>
  >;
}

const SnackbarContext = createContext<SnackbarContextType>(null);

const SnackbarContextProvider = ({ children }) => {
  const [snackbarParams, setSnackbarParams] = useState<{
    show: boolean;
    text: string;
  }>();

  const handleHide = () => {
    setSnackbarParams({ show: false, text: "" });
  };

  return (
    <SnackbarContext.Provider value={{ setSnackbarParams }}>
      <CustomSnackbar
        handleHide={handleHide}
        isVisible={snackbarParams?.show}
        text={snackbarParams?.text}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

interface SnackbarProps {
  text: string;
  isVisible: boolean;
  handleHide: () => void;
}

const CustomSnackbar = ({ handleHide, isVisible, text }: SnackbarProps) => {
  return (
    <Snackbar visible={isVisible} duration={8000} onDismiss={handleHide}>
      {text}
    </Snackbar>
  );
};

const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("Trying to acess SnackbarContext out of the Provider");
  }
  return context;
};

export { SnackbarContextProvider, useSnackbarContext };
