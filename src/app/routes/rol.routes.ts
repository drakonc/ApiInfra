import { Router } from "express";
import rolController from "../controller/rol.controller";

class RolRouter {
  public router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/rol", rolController.listar);
    this.router.get("/rol/:IdRol", rolController.listarOne);
    this.router.post("/rol", rolController.insertar);
  }
}

const rolRouter = new RolRouter();
export default rolRouter.router;
