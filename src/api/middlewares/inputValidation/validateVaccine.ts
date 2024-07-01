import { ValidationChain, body, validationResult } from "express-validator"; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("vaccineName").notEmpty().withMessage("O campo \"Nome da vacina\" é obrigatório").isString().withMessage("O nome inserido não é válido."),
    body("manufacturer").notEmpty().withMessage("O campo \"Fabricante\" é obrigatório").isString().withMessage("O fabricante inserido não é válido."),
    body("batch").notEmpty().withMessage("O campo \"Lote da vacina\" é obrigatório").isString().withMessage("O lote inserido não é válido."),
    body("applicationDate").notEmpty().withMessage("O campo \"Data da aplicação\" é obrigatório").isDate().withMessage("A data inserida não é válida.")
];

export function validateVaccine(method: ValidationChain[]){
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