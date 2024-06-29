import { Dispatch, SetStateAction } from "react";

export const handleChangeformData = (
  prop: string,
  value: any,
  formData: any,
  setFormData: Dispatch<SetStateAction<any>>
) => {
  setFormData({
    ...formData,
    [prop]: value,
  });
};
