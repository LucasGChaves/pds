import { ValidationChain, body, validationResult } from "express-validator"; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("appointmentDate").notEmpty().withMessage("O campo \"Data da consulta\" é obrigatório.").isDate().withMessage("A data inserida não é válida."),
    body("appointmentTime").notEmpty().withMessage("O campo \"Horário da consulta\" é obrigatório").isString().withMessage("O horário inserido não é válido."),
    body("description").optional().isString().withMessage("A descrição inserida não é válida.")
];

export const update = [
    body("appointmentDate").optional().isDate().withMessage("A data inserida não é válida."),
    body("appointmentTime").optional().isString().withMessage("O horário inserido não é válido."),
    body("description").optional().isString().withMessage("A descrição inserida não é válida."),
    body("scheduled").optional().isBoolean().withMessage("Não foi possível marcar o horário selecionado.")
];

export function validateAppointment(method: ValidationChain[]){
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            for (const validation of method) {
                await validation.run(req);
              }
              const result = validationResult(req);
              if(!result.isEmpty()) {
                return next(new HttpError(result.array()[0].msg, 400));
              }
              console.log(JSON.stringify(req.body))
              next();
        } catch (err) {
            next(err);
        }
    };
}