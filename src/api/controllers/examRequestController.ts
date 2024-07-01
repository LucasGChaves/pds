import { Request, Response, NextFunction } from "express";
import { ExamRequestRepository } from "../../infrastructure/adapters/repository/examRequestRepository";
import { ExamRequestService } from "../../application/usecases/examRequestService";
import { HttpError } from "../middlewares/errors";
import { Roles } from "../../infrastructure/rolesDictionary";

const examRequestRepository = new ExamRequestRepository();
const examRequestService = new ExamRequestService(examRequestRepository);

export class ExamRequestController {
    async getExamRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.params) {
                return next(new HttpError("Ocorreu um erro ao buscar o pedido de exame.", 500));
            }

            const userRoleId = req.user.roleId;
            const examRequestId = Number(req.params.id);
            
            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const examRequest = await examRequestService.findById(examRequestId);

            if(!examRequest) {
                return next(new HttpError("Nenhum pedido de exame foi encontrado.", 400));
            }

            res.status(200).json(examRequest);
        } catch(err) {
            next(err);
        }
    }

    async createExamRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.body) {
                return next(new HttpError("Ocorreu um erro ao criar o pedido de exame.", 500));
            }

            const userRoleId = req.user.roleId;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const examRequestData = req.body;
            
            if(!examRequestData.petId) {
                return next(new HttpError("É necessário selecionar um pet para a criação do pedido de exame.", 400));
            }

            const examRequest = await examRequestService.createExamRequest(examRequestData);

            if(!examRequest) {
                return next(new HttpError("Ocorreu um erro ao criar o pedido de exame.", 400));
            }

            res.status(201).json(examRequest);
        } catch(err) {
            next(err);
        }
    }

    async updateExamRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.params || !req.body) {
                return next(new HttpError("Ocorreu um erro ao atualizar o pedido de exame.", 500));
            }

            const userRoleId = req.user.roleId;
            const examRequestId = Number(req.params.id);
            const examRequestData = req.body;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }
            
            const examRequest = await examRequestService.updateExamRequest(examRequestId, examRequestData);

            if(!examRequest) {
                return next(new HttpError("Ocorreu um erro ao atualizar o pedido de exame.", 400));
            }

            res.status(200).json(examRequest);
        } catch(err) {
            next(err);
        }
    }

    async deleteExamRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            if(!req.user || !req.params) {
                return next(new HttpError("Ocorreu um erro ao deletar o pedido de exame.", 500));
            }

            const userRoleId = req.user.roleId;
            const examRequestId = Number(req.params.id);

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }
    
            const deleted = await examRequestService.deleteExamRequest(examRequestId);

            if(!deleted) {
                return next(new HttpError("Ocorreu um erro ao deletar o pedido de exame.", 500));
            }

            res.status(200).send("Pedido de exame deletado com sucesso.");
        } catch(err) {
            next(err);
        }
    }
}