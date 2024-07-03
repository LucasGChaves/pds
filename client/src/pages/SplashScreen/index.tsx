import styled from "styled-components/native";
import AppStyles from "../../styles";
import { Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <Container>
      <Image
        source={require("../../../assets/logo-branca.png")}
        style={{ alignSelf: "center" }}
      />
    </Container>
  );
};

export default SplashScreen;

const Container = styled.View`
  background-color: ${AppStyles.colors.primary};
  flex: 1;
  align-items: center;
`;
