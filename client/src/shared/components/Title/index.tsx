import styled from "styled-components/native";
import AppStyles from "../../../styles";

interface Props {
  orange?: boolean;
}

export const ScreenTitle = styled.Text<Props>`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => (props.orange ? AppStyles.colors.primary : "black")};
`;
