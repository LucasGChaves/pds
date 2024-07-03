import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { Auth } from "../middlewares/auth";
import { validateAppointment, create, update } from "../middlewares/inputValidation/validateAppointment";

const router = Router();
const appointmentController = new AppointmentController();
const auth = new Auth();

router.get("/:id/", auth.secureEndpoingWithJwt, appointmentController.getAppointment);
router.post("/vet/", validateAppointment(create), auth.secureEndpoingWithJwt, appointmentController.createNewAppointmentAsVet);
router.put("/:id/owner/", auth.secureEndpoingWithJwt, appointmentController.createNewAppointmentAsOwner);
router.put("/:id/vet/", validateAppointment(update), auth.secureEndpoingWithJwt, appointmentController.updateAppointment);
router.put("/:id/owner/cancel", auth.secureEndpoingWithJwt, appointmentController.cancelAppointmentAsOwner);
router.delete("/:id/vet/", auth.secureEndpoingWithJwt, appointmentController.deleteAppointmentAsVet);

export default router;