import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { User } from "../../domain/entities/user";
import "cookie-parser";
import "express-async-errors";
import { HttpError } from "./errors";

dotenv.config();

const userRepository = new UserRepository();

const jwtOptions: StrategyOptions = {
    jwtFromRequest: req => req.cookies.token,
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await userRepository.findByEmail(jwtPayload.email) || await userRepository.findByCpf(jwtPayload.cpf);
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new LocalStrategy({usernameField: "identifier", passwordField: "password"},
    async (identifier, password, done) => {
        try {
            let user: User | undefined;
            console.log("\ntest\n");
            console.log({identifier: identifier, password: password});
            if(identifier.includes('@')) {
                user = await userRepository.findByEmail(identifier);
                if(!user) {
                    return done(new HttpError("Email ou senha incorretos.", 401), false);
                }
            }
            else {
                user = await userRepository.findByCpf(identifier);
                if(!user) {
                    return done(new HttpError("CPF ou senha incorretos.", 401), false);
                }
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                let identifierType = identifier.includes('@') ? "Email" : "CPF";
                return done(new HttpError(identifierType + " ou senha incorretos.", 401), false);
            }
            console.log("User: " + JSON.stringify(user));
            return done(null, {id: user.id, email: user.email, cpf: user.cpf, roleId: user.roleId});
        } catch (err) {
            return done(err, false);
        }
    }
));

export default passport;