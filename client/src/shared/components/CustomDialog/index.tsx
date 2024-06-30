import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface Props {
  text: string;
  isVisible: boolean;
  handleHide: () => void;
  handleOk: () => void;
}

const CustomDialog = ({ handleOk, text, isVisible, handleHide }: Props) => {
  return (
    <View>
      <Portal>
        <Dialog visible={isVisible} onDismiss={handleHide}>
          <Dialog.Content>
            <Text variant="bodyMedium">{text}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleHide}>Cancelar</Button>
            <Button onPress={handleOk}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CustomDialog;
