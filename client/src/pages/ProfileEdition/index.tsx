import { useEffect, useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import TextField from "../../shared/components/TextField";
import styled from "styled-components/native";
import ShowComponentByRole from "../../shared/components/ShowComponentByRole";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { useAuthContext } from "../../shared/context/AuthContext";
import UploadButton from "../../shared/components/UploadButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { PHOTOS_PATH } from "../../utils/constants";
import { handleChangeformData } from "../../utils/functions";
import { IProfileEditionFormData } from "../../model/user";

const ProfileEdition = ({ navigation }) => {
  const [formData, setFormData] = useState<IProfileEditionFormData>();
  const { user } = useAuthContext();

  const [image, setImage] = useState<ImagePicker.ImagePickerResult>(null);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const savePhoto = async () => {
    const directoryInfo = await FileSystem.getInfoAsync(PHOTOS_PATH);
    const photoName = `user_${user.cpf}.jpg`;
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(PHOTOS_PATH);
    }

    const photos = await FileSystem.readDirectoryAsync(PHOTOS_PATH);
    if (photos.find((existingPhotoName) => existingPhotoName === photoName)) {
      FileSystem.deleteAsync(photoName);
    }

    await FileSystem.moveAsync({
      from: image.assets[0].uri,
      to: `${PHOTOS_PATH}/${photoName}`,
    });
  };

  const onSubmit = async () => {
    if (formData) {
      const { cpf, crmv, email, lastName, name, phone } = formData;
    }

    await savePhoto();
  };

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
            handleChangeText={(text) =>
              handleChangeformData("name", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.lastName}
            label="Último nome"
            placeholder="Insira seu último nome"
            handleChangeText={(text) =>
              handleChangeformData("lastName", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.cpf}
            label="CPF"
            placeholder="Insira seu CPF"
            handleChangeText={(text) =>
              handleChangeformData("cpf", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.email}
            label="Email"
            placeholder="Insira seu email"
            handleChangeText={(text) =>
              handleChangeformData("email", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.phone}
            label="Telefone"
            placeholder="Insira seu telefone"
            handleChangeText={(text) =>
              handleChangeformData("phone", text, formData, setFormData)
            }
          />
          <ShowComponentByRole role={userTypeEnum.VET}>
            <TextField
              value={formData?.crmv}
              label="CRMV"
              placeholder="Insira seu CRMV"
              handleChangeText={(text) =>
                handleChangeformData("crmv", text, formData, setFormData)
              }
            />
          </ShowComponentByRole>
        </InputsContainer>
        <ButtonsContainer>
          <PhotoChoiceContainer>
            {image && <Photo source={{ uri: image.assets[0].uri }} />}
            <UploadButton handleClick={handleChoosePhoto} />
          </PhotoChoiceContainer>
          <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
            Editar
          </Button>
        </ButtonsContainer>
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

const ButtonsContainer = styled.View`
  margin-top: 10px;
  align-items: center;
  row-gap: 16px;
`;

const PhotoChoiceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Photo = styled.Image`
  width: 50px;
  height: 50px;
`;
