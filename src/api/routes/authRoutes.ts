import { Router, Request, Response } from "express";
import { Auth } from "../middlewares/auth";
import { validateUser, login } from "../middlewares/inputValidation/validateUser";

const router = Router();
const auth = new Auth();

router.post("/login", validateUser(login), auth.login, (req: Request, res: Response) => {res.send("Login realizado com sucesso.")});
router.post("/logout", auth.logout, (_, res) => {res.send("Logout realizado com sucesso.")});
router.get('/', auth.secureEndpoingWithJwt, (_, res) => {res.status(200).send("this is a secure endpoint.")});

export default router;