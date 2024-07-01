import { ValidationChain, body, validationResult } from "express-validator";
import { cpf } from 'cpf-cnpj-validator'; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("firstName").notEmpty().withMessage("O campo \"Nome\" é obrigatório.").isAlpha().withMessage("O nome inserido não é válido."),
    body("lastName").notEmpty().withMessage("O campo \"Sobrenome\" é obrigatório.").isAlpha().withMessage("O sobrenome inserido não é válido."),
    body("email").notEmpty().withMessage("O campo \"Email\" é obrigatório.")
    .isEmail().withMessage("O email inserido não é válido."),
    body("phone").notEmpty().withMessage("O campo \"Celular\" é obrigatório."),
    body("cpf").notEmpty().withMessage("O campo \"CPF\" é obrigatório.")
    .custom(value => {
        if(!cpf.isValid(value)) {
            throw new Error ("O CPF inserido não é válido.");
        }
        return true;
    }).customSanitizer(value => cpf.format(value)),
    body("address").notEmpty().withMessage("O campo \"Endereço\" é obrigatório."),
    body("address.state").notEmpty().withMessage("O campo \"Estado\" é obrigatório."),
    body("address.city").notEmpty().withMessage("O campo \"Cidade\" é obrigatório."),
    body("address.district").notEmpty().withMessage("O campo \"Bairro\" é obrigatório."),
    body("address.street").notEmpty().withMessage("O campo \"Rua\" é obrigatório."),
    body("address.number").notEmpty().withMessage("O campo \"Número\" é obrigatório.").isNumeric().withMessage("O número inserido não é válido."),
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
    body("firstName").optional().isAlpha().withMessage("O nome inserido não é válido."),
    body("lastName").optional().isAlpha().withMessage("O sobrenome inserido não é válido."),
    body("email").optional().isEmail().withMessage("O email inserido não é válido."),
    body("cpf").optional().custom(value => {
        if(!cpf.isValid(value)) {
            throw new Error ("O \"CPF\" informado não é válido.");
        }
        return true;
    })
    .customSanitizer(value => cpf.format(value))
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