import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import AppStyles from "../../../styles";

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator
        size="large"
        animating={true}
        color={AppStyles.colors.primary70}
      />
    </Container>
  );
};

export default Loading;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
