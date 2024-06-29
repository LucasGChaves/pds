import { ValidationChain, body, validationResult } from "express-validator";
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("firstName").notEmpty().withMessage("O campo \"Nome\" é obrigatório."),
    body("lastName").notEmpty().withMessage("O campo \"Sobrenome\" é obrigatório."),
    body("email").notEmpty().withMessage("O campo \"Email\" é obrigatório.")
    .isEmail().withMessage("O email inserido não é válido."),
    body("phone").notEmpty().withMessage("O campo \"Celular\" é obrigatório."),
    body("cpf").notEmpty().withMessage("O campo \"CPF\" é obrigatório.")
    .custom(value => {
        if(!cpf.isValid(value)) {
            throw new Error ("O \"CPF\" informado não é válido.");
        }
        return true;
    }).customSanitizer(value => cpf.format(value)),
    body("cnpj").optional().custom(value => {
        if(!cnpj.isValid(value)) {
            throw new Error ("O \"CNPJ\" informado não é válido.");
        }
    }).customSanitizer(value => cnpj.format(value))
];

export const login = [
    body("identifier").notEmpty().withMessage("Informe o Email ou CPF cadastrado.")
    .custom(value => {
        if(!value.includes("@")) {
            if(!cpf.isValid(value)) {
                throw new Error ("O \"CPF\" informado não é válido.");
            }
            return true;
        }
        return true;
    })
    .customSanitizer(value => {
        if(!value.includes("@") && cpf.isValid(value)) {
            return cpf.format(value);
        }
        return value;
    }),
    body("password").notEmpty().withMessage("O campo \"Senha\" é obrigatório."),
    body("cpf").optional().custom(value => {
        if(!cpf.isValid(value)) {
            throw new Error ("O \"CPF\" informado não é válido.");
        }
        return true;
    }).customSanitizer(value => cpf.format(value))
];

export const update = [
    body("email").optional().isEmail().withMessage("O email inserido não é válido."),
    body("cpf").optional().custom(value => {
        if(!cpf.isValid(value)) {
            throw new Error ("O \"CPF\" informado não é válido.");
        }
        return true;
    })
    .customSanitizer(value => cpf.format(value)),
    body("cnpj").optional().custom(value => {
        if(!cnpj.isValid(value)) {
            throw new Error ("O \"CNPJ\" informado não é válido.");
        }
    }).customSanitizer(value => cnpj.format(value))
]

export function validateUser(method: ValidationChain[]){
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