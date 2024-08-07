import { Request, Response, NextFunction } from "express";
import { AppointmentRepository } from "../../infrastructure/adapters/repository/appointmentRepository";
import { AppointmentService } from "../../application/usecases/appointmentService";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "../../application/usecases/userService";
import { ExamRequestRepository } from "../../infrastructure/adapters/repository/examRequestRepository";
import { ExamRequestService } from "../../application/usecases/examRequestService";
import { HttpError } from "../middlewares/errors";
import { Roles } from "../../infrastructure/rolesDictionary";

const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const examRequestRepository = new ExamRequestRepository();
const examRequestService = new ExamRequestService(examRequestRepository);

export class AppointmentController {
    async getAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const appointmentId = req.params && Number(req.params.id);

            const appointment = await userService.findAppointmentByIdAndReturnFullObject(appointmentId);
            
            if(!appointment) {
                return next(new HttpError("Nenhuma consulta foi encontrada.", 400));
            }
            
            const examRequest = await userService.findExamRequestByAppointmentId(appointmentId);

            if(!examRequest) {
                res.status(200).json(appointment);
            }
            else {
                let returnObject: any = {...appointment, examRequest: examRequest};
                res.status(200).json(returnObject);
            }
        } catch(err) {
            next(err);
        }
    }

    async createNewAppointmentAsVet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            if(!req.user || !req.body) {
                return next(new HttpError("Ocorreu um erro ao disponibilizar um novo horário pra consulta.", 500));
            }

            const userRoleId = req.user.roleId;
            const userId = Number(req.user.id);
            const appointmentDate = req.body.appointmentDate;
            const appointmentTime = req.body.appointmentTime;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const appointment = await userService.scheduleAppointmentAsVet(userId, appointmentDate, appointmentTime);

            if(!appointment) {
                return next(new HttpError("Ocorreu um erro ao criar a consulta.", 500));
            }

            res.status(201).json(appointment);
        } catch(err) {
            next(err)
        }
    }

    async createNewAppointmentAsOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            if(!req.user || !req.params || !req.body) {
                return next(new HttpError("Ocorreu um erro ao marcar nova consulta.", 500));
            }

            const userRoleId = req.user.roleId;
            const appointmentId = Number(req.params.id);
            const petId = req.body.petId;

            if(!userRoleId || userRoleId === Number(Roles.vet)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            console.log("APPOINTMENT AND PET: " + appointmentId, petId);
            const appointment = await userService.scheduleAppointmentForOwner(appointmentId, petId);

            if(!appointment) {
                return next(new HttpError("Nenhuma consulta foi encontrada.", 500));
            }

            res.status(201).json(appointment);
        } catch(err) {
            next(err);
        }
    }

    async updateAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.user || !req.params || !req.body) {
                return next(new HttpError("Ocorreu um erro ao atualizar a consulta.", 500));
            }

            const userRoleId = req.user.roleId;
            const appointmentId = Number(req.params.id);
            let appointmentDataCopy:any = {...req.body};
            const examRequestData = appointmentDataCopy.examRequest === undefined ? undefined : {...appointmentDataCopy.examRequest, appointmentId: appointmentId};
            delete appointmentDataCopy.examRequest;

            if(examRequestData) {
                const createdExamRequest = await examRequestService.createExamRequest(examRequestData);

                if(!createdExamRequest) {
                    return next(new HttpError("Ocoreu um erro ao criar o pedido de exame.", 500));
                }
            }

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const appointment = await appointmentService.updateAppointment(appointmentId, appointmentDataCopy);

            if(!appointment) {
                return next(new HttpError("Nenhuma consulta foi encontrada.", 500));
            }

            res.status(200).json(appointment);
        } catch(err) {
            next(err);
        }
    }

    async cancelAppointmentAsOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const appointmentId = req.params && Number(req.params.id);
            const userRoleId = req.user && req.user.roleId;

            if(!userRoleId || userRoleId === Number(Roles.vet)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const appointment = await userService.cancelAppointmentAsOwner(appointmentId);
            
            if(!appointment) {
                return next(new HttpError("Ocorreu um erro ao cancelar a consulta.", 500));
            }

            res.status(200).send("Consulta cancelada com sucesso.");
        } catch(err) {
            next(err);
        }
    }

    async deleteAppointmentAsVet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const appointmentId = req.params && Number(req.params.id);
            const userRoleId = req.user && req.user.roleId;

            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const deleted = await userService.cancelAppointmentAsVet(appointmentId);
            
            if(!deleted) {
                return next(new HttpError("Ocorreu um erro ao cancelar a consulta.", 500));
            }

            res.status(200).send("Horário removido com sucesso.");
        } catch(err) {
            next(err);
        }
    }
}