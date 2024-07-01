import { HttpError } from "../../../api/middlewares/errors";
import { Role } from "../../../domain/entities/role";
import { RoleRepositoryInterface } from "../../../domain/ports/roleRepositoryInterface";
import { RoleModel } from "../orm/roleModel";

export class RoleRepository implements RoleRepositoryInterface {
    async findById(id: number): Promise<Role | undefined> {
        const role = await RoleModel.query().findById(id);
        
        if(!role) {
            throw new HttpError("Papel não encontrado.", 404);
        }

        return role;
    }
}