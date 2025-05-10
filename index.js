import express from "express";
import cors from "cors";
import ClothingRoute from "./routes/ClothingRoute.js";

const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use("/api", ClothingRoute);

app.listen(5000, () => console.log("Server connected"));
