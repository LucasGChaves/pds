import { ItemProps } from "../shared/components/Select";
import * as FileSystem from "expo-file-system";

export const BRASILIAN_STATES: ItemProps[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espirito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const TIMES: ItemProps[] = [
  {
    label: "8:00",
    value: "8:00",
  },
  {
    label: "8:30",
    value: "8:30",
  },
  {
    label: "9:00",
    value: "9:00",
  },
  {
    label: "10:30",
    value: "10:30",
  },
  {
    label: "11:00",
    value: "11:00",
  },
  {
    label: "11:30",
    value: "11:30",
  },
  {
    label: "12:00",
    value: "12:00",
  },
  {
    label: "12:30",
    value: "12:30",
  },
  {
    label: "13:00",
    value: "13:00",
  },
  {
    label: "13:30",
    value: "13:30",
  },
  {
    label: "14:00",
    value: "14:00",
  },
  {
    label: "14:30",
    value: "14:30",
  },
  {
    label: "15:00",
    value: "15:00",
  },
  {
    label: "15:30",
    value: "15:30",
  },
  {
    label: "16:00",
    value: "16:00",
  },
  {
    label: "16:30",
    value: "16:30",
  },
  {
    label: "17:00",
    value: "17:00",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
  {
    label: "18:30",
    value: "18:30",
  },
  {
    label: "19:00",
    value: "19:00",
  },
];

export const PHOTOS_PATH = `${FileSystem.documentDirectory}photos/`;
