import { Request, Response, NextFunction } from "express";
import { VaccineRepository } from "../../infrastructure/adapters/repository/vaccineRepository";
import { VaccineService } from "../../application/usecases/vaccineService";
import { HttpError } from "../middlewares/errors";
import { Roles } from "../../infrastructure/rolesDictionary";

const vaccineRepository = new VaccineRepository();
const vaccineService = new VaccineService(vaccineRepository);

export class VaccineController {
    async getVaccine(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vaccineId = req.params && Number(req.params.id);

            const vaccine = await vaccineService.findById(vaccineId);

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
            const userRoleId = req.user && req.user.roleId;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const vaccineData = req.body;

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
            const userRoleId = req.user && req.user.roleId;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }
            
            const vaccineId = req.params && Number(req.params.id);

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