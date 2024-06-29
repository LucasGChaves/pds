import { useEffect, useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import TextField from "../../shared/components/TextField";
import styled from "styled-components/native";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { useMyContext } from "../../shared/context/MyContext";
interface FormData {
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  crmv: string;
}

const ProfileEdition = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>();
  const { user } = useMyContext();

  const handleChangeformData = (prop: string, value: string | Date) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const onSubmit = () => {
    if (formData) {
      const { cpf, crmv, email, lastName, name, phone } = formData;
    }

    navigation.navigate("Pets");
  };

  const handleEdit = () => {};

  useEffect(() => {
    setFormData({
      name: user.name,
      lastName: user.lastName,
      cpf: user.cpf,
      crmv: user.crmv,
      email: user.email,
      phone: user.phone,
    });
  }, []);

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle orange>Edição de perfil</ScreenTitle>
        <InputsContainer>
          <TextField
            label="Nome"
            placeholder="Insira seu nome"
            value={formData?.name}
            handleChangeText={(text) => handleChangeformData("name", text)}
          />
          <TextField
            value={formData?.lastName}
            label="Último nome"
            placeholder="Insira seu último nome"
            handleChangeText={(text) => handleChangeformData("lastName", text)}
          />
          <TextField
            value={formData?.cpf}
            label="CPF"
            placeholder="Insira seu CPF"
            handleChangeText={(text) => handleChangeformData("cpf", text)}
          />
          <TextField
            value={formData?.email}
            label="Email"
            placeholder="Insira seu email"
            handleChangeText={(text) => handleChangeformData("email", text)}
          />
          <TextField
            value={formData?.phone}
            label="Telefone"
            placeholder="Insira seu telefone"
            handleChangeText={(text) => handleChangeformData("phone", text)}
          />
          <ShowComponentByRole role={userTypeEnum.VET}>
            <TextField
              value={formData?.crmv}
              label="CRMV"
              placeholder="Insira seu CRMV"
              handleChangeText={(text) => handleChangeformData("crmv", text)}
            />
          </ShowComponentByRole>
        </InputsContainer>
        <ButtonContainer>
          <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
            Editar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default ProfileEdition;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 20px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;
