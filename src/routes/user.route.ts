import { Router } from "express";
import { getUser, crearUsiarios, updateUser } from "../controllers/user.controllers";

const routes = Router();

routes.get("/users", getUser);
routes.post("/users", crearUsiarios);
routes.put("/users/:id", updateUser);

export default routes;