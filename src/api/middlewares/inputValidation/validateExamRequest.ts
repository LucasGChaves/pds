import { ValidationChain, body, validationResult } from "express-validator"; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("vetSignature").notEmpty().withMessage("O campo \"Assinatura do(a) veterinário(a)\" é obrigatório").isString().withMessage("A assinatura inserida não é válida."),
    body("result").optional().isString().withMessage("O resultado inserido não é válido.")
];

export const update = [
    body("vetSignature").optional().isString().withMessage("A assinatura inserida não é válida."),
    body("result").optional().isString().withMessage("O resultado inserido não é válido.")
];

export function validateExamRequest(method: ValidationChain[]){
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