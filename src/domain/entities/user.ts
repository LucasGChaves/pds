export class User {

  id!: number;
  firstName!: string;
  lastName!: string;
  password?: string;
  email!: string;
  phone!: string;
  cpf!: string;
  crmv?: string;
  photoFileName?: string;
  roleId!: number;
  
  constructor (user: Partial<User>) {
    Object.assign(this, user);
  }
}