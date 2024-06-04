import express from "express";
import contactRouter from "./routes/contacts.router.js";
// import { connectDB } from "./config/dbConnection.js";
const app = express();
const PUERTO = 8081;


app.use(express.json());
app.use("/api/contacts", contactRouter);

app.listen(PUERTO,()=>{
    console.log(`Server running on port ${PUERTO}`);
});
