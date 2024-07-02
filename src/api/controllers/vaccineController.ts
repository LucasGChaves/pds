import { Request, Response, NextFunction } from "express";
import { VaccineRepository } from "../../infrastructure/adapters/repository/vaccineRepository";
import { VaccineService } from "../../application/usecases/vaccineService";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "../../application/usecases/userService";
import { HttpError } from "../middlewares/errors";
import { Roles } from "../../infrastructure/rolesDictionary";

const vaccineRepository = new VaccineRepository();
const vaccineService = new VaccineService(vaccineRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class VaccineController {
    async getVaccine(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.params) {
                return next(new HttpError("Ocorreu um erro ao buscar a vacina.", 500));
            }

            const userRoleId = req.user.roleId;
            const vaccineId = Number(req.params.id);

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }


            const vaccine = await userService.findVaccineByIdAndReturnFullObject(vaccineId);

            if(!vaccine) {
                return next(new HttpError("Nenhuma vacina foi encontrada.", 400));
            }

            res.status(200).json(vaccine);
        } catch(err) {
            next(err);
        }
    }

    async createVaccine(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.body) {
                return next(new HttpError("Ocorreu um erro ao criar a vacina.", 500));
            }

            const userRoleId = req.user && req.user.roleId;
            const vaccineData = req.body;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }


            if(!vaccineData.petId) {
                return next(new HttpError("É necessário selecionar um pet para a criação da vacina.", 400));
            }
        
            const vaccine = await vaccineService.createVaccine(vaccineData);

            if(!vaccine) {
                return next(new HttpError("Ocorreu um erro ao registrar a vacina.", 400));
            }

            res.status(201).json(vaccine);
        } catch(err) {
            next(err);
        }
    }
    async deleteVaccine(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.params) {
                return next(new HttpError("Ocorreu um erro ao deletar a vacina.", 500));
            }

            const userRoleId = req.user.roleId;
            const vaccineId = Number(req.params.id);

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }
            

            const deleted = await vaccineService.deleteVaccine(vaccineId);

            if(!deleted) {
                return next(new HttpError("Ocorreu um erro ao deletar a vacina.", 500));
            }

            res.status(200).send("Vacina deletada com sucesso.");
        } catch(err) {
            next(err);
        }
    }
}