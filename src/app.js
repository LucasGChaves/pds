import express from "express";
import passport from "./api/middlewares/passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./api/routes/userRoutes";
import authRouter from "./api/routes/authRoutes";
import { ErrorHandler } from "./api/middlewares/errors";
import "./infrastructure/adapters/database/db";
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", userRoutes);
app.use("/auth", authRouter);
app.use(ErrorHandler);

export default app;