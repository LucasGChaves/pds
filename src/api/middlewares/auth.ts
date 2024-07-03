import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import { HttpError } from "./errors";

dotenv.config();

export class Auth {
    login(req: Request, res: Response, next: NextFunction, afterRegister = false): void {
        passport.authenticate("local", {session: false}, (err:any, user:any, info:any) => {
            try {
                if(req.cookies && req.cookies.token) {
                    return next(new HttpError("Usuário já realizou o login.", 400));
                }
                console.log("User on auth: " + JSON.stringify(user));
                if(err || !user) {
                    //console.log("USER is: " + user);
                    let errorMessage = null;
                    if(info?.message) {
                        errorMessage = info.message;
                    }
                    else if(err?.message) {
                        errorMessage = err.message;
                    }
                    else {
                        errorMessage = "Usuário não encontrado. Tente novamente.";
                    }
                    return next(new HttpError(errorMessage, 400));
                }

                const payload = {
                    "id": user.id,
                    "email": user.email,
                    "cpf": user.cpf,
                    "roleId": user.roleId
                };

                req.login(payload, {session: false}, (err) => {
                    if(err) {
                        return next(err);
                    }

                    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "4h"});

                    if(afterRegister) {
                        return res.cookie("token", token).status(200).send("Usuário registrado com sucesso.");
                    }

                    res.cookie("token", token).status(200);
                    next();
                })
            } catch(err) {
                next(err)
            }
        })(req, res, next);
    }

    secureEndpoingWithJwt(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate("jwt", (err:any, user:any, info:any) => {
            if(err || !user) {
                throw new HttpError("Sem autorização para acessar.", 401);
            }
            req.user = user;
            next();
        })(req, res, next);
    }

    logout(req: Request, res: Response, next: NextFunction): void {
        try {
            if(req.cookies["token"]) {
                res.clearCookie('token').status(204);
                next();
                //res.redirect('/');
            }
            else {
                return next(new HttpError("Não há nenhuma sessão para ser finalizada", 400));
            }
        } catch (err) {
            next(err);
        }
    }
}