import { Button } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../shared/components/DataListWithDivider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppStyles from "../../styles";
import { useMyContext } from "../../shared/context/MyContext";
import { userTypeEnum } from "../../enums/userTypeEnum";

const MyProfile = ({ navigation }) => {
  const { user } = useMyContext();

  const vetData: DataListValueType[] = [
    {
      leftValue: "Email",
      rightValue: "Cachorro",
    },
    {
      leftValue: "CPF",
      rightValue: "111.111.111-11",
    },
    {
      leftValue: "Telefone",
      rightValue: "(31)99999-9999",
    },
    {
      leftValue: "CRMV",
      rightValue: "479837429834 ",
    },
  ];

  const ownerData: DataListValueType[] = [
    {
      leftValue: "Email",
      rightValue: "Cachorro",
    },
    {
      leftValue: "CPF",
      rightValue: "111.111.111-11",
    },
    {
      leftValue: "Telefone",
      rightValue: "(31)99999-9999",
    },
  ];

  const handleLogout = () => {
    // TODO: login de fato
    navigation.navigate("Login");
  };

  const handleEdit = () => {
    navigation.navigate("ProfileEdition");
  };

  return (
    <LoggedAreaContainer hideBackButton>
      <Container>
        <PhotoContainer>
          <Photo />
          <UserName>Albert Stevano Bajefski</UserName>
        </PhotoContainer>
        <DataListWithDivider
          data={user.role.roleName === userTypeEnum.OWNER ? ownerData : vetData}
        />
        <ButtonsContainer>
          <Button
            labelStyle={{ color: "black" }}
            icon={({}) => (
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
            )}
            mode="outlined"
            style={{
              width: 150,
              marginHorizontal: "auto",
              borderColor: AppStyles.colors.primary30,
            }}
            onPress={handleEdit}
          >
            Editar
          </Button>
          <Button
            icon={({}) => (
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={AppStyles.colors.red}
              />
            )}
            mode="outlined"
            onPress={handleLogout}
            labelStyle={{ color: "black" }}
            style={{
              width: 150,

              borderColor: AppStyles.colors.red,
            }}
          >
            Sair
          </Button>
        </ButtonsContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default MyProfile;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
  text-align: center;
`;

const PhotoContainer = styled.View`
  row-gap: 16px;
`;
const Photo = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: gray;
  margin: 0 auto;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
`;
