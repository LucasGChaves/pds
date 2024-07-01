import { Router } from "express";
import { PetController } from "../controllers/petController";
import { Auth } from "../middlewares/auth";
import { validatePet, create, update } from "../middlewares/inputValidation/validatePet";

const router = Router();
const petController = new PetController();
const auth = new Auth();

router.get("/pet/:id/", auth.secureEndpoingWithJwt, petController.createPet);
router.post("/pet/", validatePet(create), auth.secureEndpoingWithJwt, petController.updatePet);
router.put("/pet/:id/", validatePet(update), auth.secureEndpoingWithJwt, petController.updatePet);
router.delete("/pet/:id/", auth.secureEndpoingWithJwt, petController.deletePet);
router.get("/pet/:id/vaccines/", auth.secureEndpoingWithJwt, petController.getVaccines);

export default router;