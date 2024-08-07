import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import TextField from "../../shared/components/TextField";
import styled from "styled-components/native";
import DatePicker from "../../shared/components/DatePicker";
import UploadButton from "../../shared/components/UploadButton";
import { PetsScreensStackParamList } from "../../../App";
import { handleChangeformData } from "../../utils/functions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuthContext } from "../../shared/context/AuthContext";
import { PHOTOS_PATH } from "../../utils/constants";
import { IPet, IPetRegistrationFormData } from "../../model/pet";
import PetRepository from "../../shared/repository/petRepository";
import { useSnackbarContext } from "../../shared/context/SnackbarContext";
import { useQueryClient } from "react-query";
import { ReactQueryCache } from "../../enums/reactQueryCacheEnum";

const PetRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState<IPetRegistrationFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackbarParams } = useSnackbarContext();
  const { user, isUserOwner } = useAuthContext();

  const [image, setImage] = useState<ImagePicker.ImagePickerResult>(null);

  const route =
    useRoute<RouteProp<PetsScreensStackParamList, "PetRegistration">>();
  const existingPet = route.params?.pet;

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

  const savePhoto = async (petId: string) => {
    const directoryInfo = await FileSystem.getInfoAsync(PHOTOS_PATH);
    const photoName = `pet_${petId}_${user.cpf}.jpg`;
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(PHOTOS_PATH);
    }

    const photos = await FileSystem.readDirectoryAsync(PHOTOS_PATH);
    if (photos.find((existingPhotoName) => existingPhotoName === photoName)) {
      FileSystem.deleteAsync(`${PHOTOS_PATH}/${photoName}`);
    }

    await FileSystem.moveAsync({
      from: image.assets[0].uri,
      to: `${PHOTOS_PATH}/${photoName}`,
    });
  };

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    if (formData) {
      const { birthDate, breed, name, species } = formData;
      const petRepository = new PetRepository(user.role.roleName);

      setIsLoading(true);
      try {
        let pet: IPet;
        if (existingPet) {
          pet = await petRepository.edit({
            birthDate: birthDate,
            breed: breed,
            name: name,
            species: species,
            id: existingPet.id,
          });
        } else {
          pet = await petRepository.create({
            birthDate: birthDate,
            breed: breed,
            name: name,
            species: species,
          });
        }

        if (image) {
          await savePhoto(pet.id.toString());
        }
        queryClient.invalidateQueries(ReactQueryCache.PETS);
        navigation.navigate("Pets");
      } catch (error) {
        setSnackbarParams({
          show: true,
          text: "Ocorreu um erro. Tente novamente",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (existingPet)
      setFormData({
        birthDate: new Date(existingPet.birthDate),
        breed: existingPet.breed,
        name: existingPet.name,
        species: existingPet.species,
      });
  }, []);

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle orange>
          {existingPet ? "Edição de pet" : "Cadastro de pet"}
        </ScreenTitle>
        <InputsContainer>
          <TextField
            value={formData?.name}
            label="Nome"
            placeholder="Insira o nome do pet"
            handleChangeText={(text) =>
              handleChangeformData("name", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.species}
            label="Espécie"
            placeholder="Insira a espécie do pet"
            handleChangeText={(text) =>
              handleChangeformData("species", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.breed}
            label="Raça"
            placeholder="Insira a raça do pet"
            handleChangeText={(text) =>
              handleChangeformData("breed", text, formData, setFormData)
            }
          />

          <DatePicker
            handleChange={(d) =>
              handleChangeformData("birthDate", d, formData, setFormData)
            }
            label="Data de nascimento"
            value={formData?.birthDate}
            placeholder="Selecione a data"
            mode="outlined"
          />
        </InputsContainer>
        <ButtonContainer>
          <PhotoChoiceContainer>
            {image && <Photo source={{ uri: image.assets[0].uri }} />}
            <UploadButton handleClick={handleChoosePhoto} />
          </PhotoChoiceContainer>
          <Button
            mode="contained"
            style={{ width: 200 }}
            onPress={onSubmit}
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default PetRegistration;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  row-gap: 150px;
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
