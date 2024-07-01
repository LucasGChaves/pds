import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateUser, create, update } from "../middlewares/inputValidation/validateUser";
import { Auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();
const auth = new Auth();

router.post("/user/register", validateUser(create), userController.createUser);
router.put("/user/", validateUser(update), auth.secureEndpoingWithJwt, userController.updateUser);
router.get("/user/profile", auth.secureEndpoingWithJwt, userController.getUserById(true));
router.get("/user/:id", auth.secureEndpoingWithJwt, userController.getUserById);
router.delete("/user/", auth.secureEndpoingWithJwt, userController.deleteUser);
router.get("/user/owner/pets", auth.secureEndpoingWithJwt, userController.getUserPets); //owner
router.get("/user/vet/patients", auth.secureEndpoingWithJwt, userController.getVetPatients); //vet
router.get("/user/appointments", auth.secureEndpoingWithJwt, userController.getUserAppointments);
router.get("/user/exams", auth.secureEndpoingWithJwt, userController.getUserExams);
router.get("/user/vaccines", auth.secureEndpoingWithJwt, userController.getUserVaccines);
router.get("/user/owner/search", auth.secureEndpoingWithJwt, userController.getVets); //owner
router.get("/users/test");

export default router;