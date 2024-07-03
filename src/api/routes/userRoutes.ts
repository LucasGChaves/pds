import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateUser, create, update } from "../middlewares/inputValidation/validateUser";
import { Auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();
const auth = new Auth();

router.post("/register", validateUser(create), userController.createUser);
router.put("/", validateUser(update), auth.secureEndpoingWithJwt, userController.updateUser);
router.get("/profile/", auth.secureEndpoingWithJwt, userController.getUserById(true));
router.get("/appointments/", auth.secureEndpoingWithJwt, userController.getUserAppointments);
router.delete("/", auth.secureEndpoingWithJwt, userController.deleteUser);
router.get("/owner/pets/", auth.secureEndpoingWithJwt, userController.getUserPets); //owner
router.get("/vet/patients/", auth.secureEndpoingWithJwt, userController.getVetPatients); //vet
router.get("/exams/", auth.secureEndpoingWithJwt, userController.getUserExams);
router.get("/vaccines/", auth.secureEndpoingWithJwt, userController.getUserVaccines);
router.get("/owner/search/", auth.secureEndpoingWithJwt, userController.getVets); //owner
router.get("/test");
router.get("/owner/search/vet/:id/dates/", auth.secureEndpoingWithJwt, userController.getVetAvailableDates);
router.get("/owner/search/vet/:id/date/times/", auth.secureEndpoingWithJwt, userController.getVetAvailableTimes);
router.get("/:id/", auth.secureEndpoingWithJwt, userController.getUserById(false));
export default router;