import { Button } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../shared/components/DataListWithDivider";
import AppStyles from "../../styles";
import { useAuthContext } from "../../shared/context/AuthContext";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PHOTOS_PATH } from "../../utils/constants";

const MyProfile = ({ navigation }) => {
  const { user } = useAuthContext();

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
      rightValue: "email@email.com",
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
    // TODO: logout de fato
    navigation.navigate("Login");
  };

  const handleEdit = () => {
    navigation.navigate("ProfileEdition");
  };

  return (
    <LoggedAreaContainer hideBackButton handleLogout={handleLogout}>
      <Container>
        <PhotoContainer>
          <Photo source={{ uri: `${PHOTOS_PATH}user_${user.cpf}.jpg` }} />
          <UserName>Albert Stevano Bajefski</UserName>
        </PhotoContainer>
        <DataListWithDivider
          data={user.role.roleName === userTypeEnum.OWNER ? ownerData : vetData}
        />
        <ButtonsContainer>
          <Button
            icon={({}) => (
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={AppStyles.colors.primary}
              />
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
const Photo = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${AppStyles.colors.noPhotoGray};
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
