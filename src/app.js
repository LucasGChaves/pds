import express from "express";
import passport from "./api/middlewares/passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./api/routes/userRoutes";
import authRouter from "./api/routes/authRoutes";
import petRouter from "./api/routes/petRoutes";
import appointmentRouter from "./api/routes/appointmentRoutes";
import vaccineRouter from "./api/routes/vaccineRoutes";
import examRouter from "./api/routes/examRequestRoutes";
import { ErrorHandler } from "./api/middlewares/errors";
import "./infrastructure/adapters/database/db";
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/pet", petRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/exam", examRouter);
app.use("/api/vaccine", vaccineRouter);
app.use(ErrorHandler);

export default app;