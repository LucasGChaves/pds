import { Router, Response, Request } from "express";
import { UserController } from "../controllers/userController";
import { validateUser, create, update } from "../middlewares/inputValidation/validateUser";
import { Auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();
const auth = new Auth();

router.post("/user/register", validateUser(create), userController.createUser);
router.put("/user/update", validateUser(update), auth.secureEndpoingWithJwt, userController.updateUser);


router.get("/users/test");

export default router;