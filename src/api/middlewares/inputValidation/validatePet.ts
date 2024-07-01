import { ValidationChain, body, validationResult } from "express-validator"; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("name").notEmpty().withMessage("O campo \"Nome\" é obrigatório.").isAlpha().withMessage("O nome inserido não é válido."),
    body("birthDate").notEmpty().withMessage("O campo \"Data de nascimento\" é obrigatório.").isDate().withMessage("A data de nascimento inserida não é válida."),
    body("species").notEmpty().withMessage("O campo \"Espécie\" é obrigatório.").isAlpha().withMessage("A espécie inserida não é válida."),
    body("breed").optional().isAlpha().withMessage("A raça inserida não é válida.")
];

export const update = [
    body("name").optional().isAlpha().withMessage("O nome inserido não é válido."),
    body("birthDate").optional().isDate().withMessage("A data de nascimento inserida não é válida."),
    body("species").optional().isAlpha().withMessage("A espécie inserida não é válida."),
    body("breed").optional().isAlpha().withMessage("A raça inserida não é válida.")
];

export function validatePet(method: ValidationChain[]){
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