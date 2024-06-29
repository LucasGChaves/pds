import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "../../application/usecases/userService";
import { validationResult } from "express-validator";
import { HttpError } from "../middlewares/errors";
import jwt from "jsonwebtoken";
import { Auth } from "../middlewares/auth";

const auth = new Auth();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors = validationResult(req);
            if(errors.isEmpty()) {
                let uncryptedPassword = req.body.password;
                const user = await userService.createUser(req.body);
                
                if(req.cookies && Object.keys(req.cookies).length) {
                    req.cookies = {};
                }

                if(!user) {
                    return next(new HttpError("Ocorreu um erro ao criar o usuário.", 500));
                }
                
                req.body.identifier = user.email || user.cpf;
                req.body.password = uncryptedPassword;
                auth.login(req, res, next, true);
            }
            else {
                next(new HttpError(errors.array().toString(), 422));
            }
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user && req.user.id;
            const updatedData = req.body;
            
            if(userId && Object.keys(updatedData).length) {
                const updatedUser = await userService.updateUser(userId, updatedData);
                res.status(200).json(updatedUser);
            }
            else {
                return next(new HttpError("Ocorreu um erro ao editar usuário. Tente novamente.", 500));
            }

        } catch (err: any) {
            next(err);
        }
    }
}