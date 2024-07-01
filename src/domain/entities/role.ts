export class Role {

    id!: number;
    roleName!: string;

    constructor (role: Partial<Role>) {
        Object.assign(this, role);
      }
}