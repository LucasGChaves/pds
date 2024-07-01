import User from "../../domain/entities/user";

declare global {
    namespace Express {
        interface User {
            id: number;
            email: string;
            cpf: string;
            roleId: number
        }

        interface Request {
            user?: User;
        }
    }
}