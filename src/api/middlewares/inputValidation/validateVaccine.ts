import { ValidationChain, body, validationResult } from "express-validator"; 
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors";

export const create = [
    body("vaccineName").notEmpty().withMessage("O campo \"Nome da vacina\" é obrigatório").isString().withMessage("O nome inserido não é válido."),
    body("manufacturer").notEmpty().withMessage("O campo \"Fabricante\" é obrigatório").isString().withMessage("O fabricante inserido não é válido."),
    body("batch").notEmpty().withMessage("O campo \"Lote da vacina\" é obrigatório").isString().withMessage("O lote inserido não é válido."),
    body("applicationDate").notEmpty().withMessage("O campo \"Data da aplicação\" é obrigatório").isDate().withMessage("A data inserida não é válida.")
];