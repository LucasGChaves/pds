import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

app.get('/', (_, res) => {res.status(200).send("Hello world!")});
app.listen(process.env.SERVER_PORT, () => {console.log("running on port " + process.env.SERVER_PORT + "...")});