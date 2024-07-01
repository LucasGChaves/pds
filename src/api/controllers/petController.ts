import { Request, Response, NextFunction } from "express";
import { PetRepository } from "../../infrastructure/adapters/repository/petRepository";
import { PetService } from "../../application/usecases/petService";
import { Pet } from "../../domain/entities/pet";
import { validationResult } from "express-validator";
import { HttpError } from "../middlewares/errors";

const petRepository = new PetRepository();
const petService = new PetService(petRepository);

export class PetController {
    async createPet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors = validationResult(req);

            if(errors.isEmpty()) {
                const pet = await petService.createPet(req.body);

                if(!pet) {
                    return next(new HttpError("Ocorreu um erro ao salvar as informações do pet.", 500));
                }

                res.status(201).send("Pet registrado com sucesso.");
            }
            else {
                return next(new HttpError("Ocorreu um erro ao registrar o pet.", 500));
            }
        } catch (err) {
            next(err);
        }
    }

    async updatePet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petId = req.params && req.params.id && Number(req.params.id);
            const updatedData = req.body;
            
            if(!petId || !updatedData || (updatedData && !Object.keys(updatedData).length)) {
                return next(new HttpError("Não foi possível obter o perfil do pet especificado.", 500));
            }

            const updatedPet = await petService.updatePet(petId, updatedData);

            if(!updatedPet) {
                return next(new HttpError("Não foi possível atualizar o perfil do pet especificado.", 500));
            }

            res.status(200).send("As informações do pet foram atualizadas com sucesso.");

        } catch (err) {
            next(err);
        }
    }

    async getPetById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petId = req.params && req.params.id && Number(req.params.id);
            
            if(!petId) {
                return next(new HttpError("Não foi possível obter o perfil do pet especificado.", 500));
            }

            const pet = await petService.findById(petId);

            if(!pet) {
                return next(new HttpError("Não foi possível obter o perfil do pet especificado.", 500));
            }

            res.status(200).json(pet);
        } catch (err) {
            next(err);
        }
    }

    async deletePet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petId = req.params && req.params.id && Number(req.params.id);

            if(!petId) {
                return next(new HttpError("Não foi possível obter o perfil do pet especificado.", 500));
            }

            const isPetDeleted = await petService.deletePet(petId);

            if(!isPetDeleted) {
                return next(new HttpError("Ocorreu um erro ao deletar o pet. Tente novamente.", 500));
            }
            
            res.status(200).send("Pet deletado com sucesso.");
        } catch (err) {
            next(err);
        }
    }

    async getVaccines(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petId = req.params && Number(req.params.id);

            const vaccines = await petService.getPetVaccines(petId);

            if(!vaccines) {
                return next(new HttpError("Nenhuma vacina foi encontrada.", 400));
            }

            res.status(200).json(vaccines);
        } catch (err) {
            next(err);
        }
    }
}