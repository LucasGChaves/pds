import { IAppointment } from "../model/appointment";
import { IPet } from "../model/pet";
import { IRole } from "../model/role";
import { IUserGet } from "../model/user";
import { IVaccine } from "../model/vaccine";

export const MOCKED_ROLES: IRole[] = [
  { id: 1, roleName: "Tutor" },
  { id: 2, roleName: "Veterinário" },
];

export const MOCKED_USERS: IUserGet[] = [
  {
    id: 1,
    name: "John",
    lastName: "Doe",
    cpf: "123.456.789-00",
    crmv: "12345",
    email: "john.doe@example.com",
    phone: "(11) 99999-9999",
    photoFileName: "john.jpg",
    role: MOCKED_ROLES[1], // Veterinarian
    availableTime: new Date("2024-03-10T09:00:00"),
    address: {
      city: "Belo Horizonte",
      district: "Bandeirantes",
      number: "1",
      state: "MG",
      street: "Rua Margarida",
    },
  },
  {
    id: 2,
    name: "Jane",
    lastName: "Smith",
    cpf: "987.654.321-00",
    crmv: "54321",
    email: "jane.smith@example.com",
    phone: "(11) 88888-8888",
    photoFileName: "jane.jpg",
    role: MOCKED_ROLES[1], // Veterinarian
    availableTime: new Date("2024-03-10T14:00:00"),
    address: {
      city: "Belo Horizonte",
      district: "Bandeirantes",
      number: "1",
      state: "MG",
      street: "Rua Margarida",
    },
  },
  {
    id: 3,
    name: "Alice",
    lastName: "Johnson",
    cpf: "456.789.123-00",
    crmv: "",
    email: "alice.johnson@example.com",
    phone: "(11) 77777-7777",
    photoFileName: "alice.jpg",
    role: MOCKED_ROLES[2], // Pet Owner
    availableTime: new Date(),
    address: {
      city: "Belo Horizonte",
      district: "Bandeirantes",
      number: "1",
      state: "MG",
      street: "Rua Margarida",
    },
  },
  {
    id: 4,
    name: "Bob",
    lastName: "Williams",
    cpf: "789.123.456-00",
    crmv: "",
    email: "bob.williams@example.com",
    phone: "(11) 66666-6666",
    photoFileName: "bob.jpg",
    role: MOCKED_ROLES[2], // Pet Owner
    availableTime: new Date(),
    address: {
      city: "Belo Horizonte",
      district: "Bandeirantes",
      number: "1",
      state: "MG",
      street: "Rua Margarida",
    },
  },
];

export const MOCKED_PETS: IPet[] = [
  {
    id: 1,
    name: "Buddy",
    owner: MOCKED_USERS[2], // Alice
    birthDate: new Date("2020-05-10"),
    species: "Dog",
    breed: "Golden Retriever",
    photo: "buddy.jpg",
    age: 3,
  },
  {
    id: 2,
    name: "Mia",
    owner: MOCKED_USERS[3], // Bob
    birthDate: new Date("2018-12-01"),
    species: "Cat",
    breed: "Siamese",
    photo: "mia.jpg",
    age: 5,
  },
  {
    id: 3,
    name: "Rex",
    owner: MOCKED_USERS[2], // Alice
    birthDate: new Date("2022-03-15"),
    species: "Dog",
    breed: "German Shepherd",
    photo: "rex.jpg",
    age: 1,
  },
  {
    id: 4,
    name: "Fluffy",
    owner: MOCKED_USERS[3], // Bob
    birthDate: new Date("2017-08-20"),
    species: "Cat",
    breed: "Persian",
    photo: "fluffy.jpg",
    age: 6,
  },
  {
    id: 5,
    name: "Fluffy",
    owner: MOCKED_USERS[3], // Bob
    birthDate: new Date("2017-08-20"),
    species: "Cat",
    breed: "Persian",
    photo: "fluffy.jpg",
    age: 6,
  },
  {
    id: 6,
    name: "Fluffy",
    owner: MOCKED_USERS[3], // Bob
    birthDate: new Date("2017-08-20"),
    species: "Cat",
    breed: "Persian",
    photo: "fluffy.jpg",
    age: 6,
  },
  {
    id: 7,
    name: "Fluffy",
    owner: MOCKED_USERS[3], // Bob
    birthDate: new Date("2017-08-20"),
    species: "Cat",
    breed: "Persian",
    photo: "fluffy.jpg",
    age: 6,
  },
];

export const MOCKED_APPOINTMENTS: IAppointment[] = [
  {
    id: 1,
    appointmentDate: new Date("2024-03-10T09:00:00"),
    pet: MOCKED_PETS[0], // Buddy
    vet: MOCKED_USERS[0], // John Doe (Vet)
    description: "Routine Checkup - V10 Vaccination",
    examRequest: "None",
  },
  {
    id: 2,
    appointmentDate: new Date("2023-12-25T14:30:00"),
    pet: MOCKED_PETS[1], // Mia
    vet: MOCKED_USERS[1], // Jane Smith (Vet)
    examRequest: "Blood test, X-ray",
  },
  {
    id: 3,
    appointmentDate: new Date("2024-01-18T10:15:00"),
    pet: MOCKED_PETS[2], // Rex
    vet: MOCKED_USERS[0], // John Doe (Vet)
    description: "Post-surgery follow-up - Castration",
    examRequest: "Wound evaluation",
  },
  {
    id: 4,
    appointmentDate: new Date("2024-02-05T15:45:00"),
    pet: MOCKED_PETS[0], // Buddy
    vet: MOCKED_USERS[1], // Jane Smith (Vet)
    description: "Annual Checkup - General health check",
    examRequest: "Complete blood test, Urine",
  },
  {
    id: 5,
    appointmentDate: new Date("2024-02-05T15:45:00"),
    pet: MOCKED_PETS[0], // Buddy
    vet: MOCKED_USERS[1], // Jane Smith (Vet)
    description: "Annual Checkup - General health check",
    examRequest: "Complete blood test, Urine",
  },
];

export const MOCKED_VACCINES: IVaccine[] = [
  {
    id: 1,
    vaccineName: "V10",
    manufacturer: "VetLab",
    batch: "VX10-202303",
    pet: MOCKED_PETS[0], // Buddy
    vet: MOCKED_USERS[0], // John Doe (Vet)
    applicationDate: new Date("2020-05-05"),
  },
  {
    id: 2,
    vaccineName: "Rabies",
    manufacturer: "PetShield",
    batch: "RB-202312",
    pet: MOCKED_PETS[1], // Mia
    vet: MOCKED_USERS[1], // Jane Smith (Vet)
    applicationDate: new Date("2020-05-05"),
  },
  {
    id: 3,
    vaccineName: "Feline Leukemia",
    manufacturer: "CatCare",
    batch: "FL-202401",
    pet: MOCKED_PETS[1], // Mia
    vet: MOCKED_USERS[1], // Jane Smith (Vet)
    applicationDate: new Date("2020-05-05"),
  },
  {
    id: 4,
    vaccineName: "Canine Parvovirus",
    manufacturer: "DogHealth",
    batch: "CP-202402",
    pet: MOCKED_PETS[2], // Rex
    vet: MOCKED_USERS[0], // John Doe (Vet)
    applicationDate: new Date("2020-05-05"),
  },
  {
    id: 5,
    vaccineName: "Canine Parvovirus",
    manufacturer: "DogHealth",
    batch: "CP-202402",
    pet: MOCKED_PETS[2], // Rex
    vet: MOCKED_USERS[0], // John Doe (Vet)
    applicationDate: new Date("2020-05-05"),
  },
  {
    id: 6,
    vaccineName: "Canine Parvovirus",
    manufacturer: "DogHealth",
    batch: "CP-202402",
    pet: MOCKED_PETS[2], // Rex
    vet: MOCKED_USERS[0], // John Doe (Vet)
    applicationDate: new Date("2020-05-05"),
  },
];
