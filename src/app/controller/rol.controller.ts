import { Request, Response } from "express";
import mysql from "../config/database";
import { Rol } from "../model/rol.model";

class RolController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const result = await mysql.query("SELECT * FROM rol");
    if (result.length > 0) return res.status(200).json(result);
    else return res.status(200).json({ result: "No Hay Roles Creados" });
  }

  public async listarOne(req: Request, res: Response): Promise<Response> {
    const { IdRol } = req.params;
    const result = await mysql.query("SELECT * FROM rol WHERE IdRol = ?", [IdRol]);
    if (result.length > 0) return res.status(200).json(result[0]);
    else return res.status(200).json({ result: "No se Encontro el Elemento Buscado" });
  }

  public async insertar(req: Request, res: Response): Promise<Response> {
    const newRol: Rol = req.body;
    const result = await mysql.query("INSERT INTO rol SET ?", [newRol]);
    if (result.serverStatus === 2) return res.status(200).json({ result: "Se Inserto el Rol: " + newRol.NombreRol + " Correctamente" });
    else return res.status(200).json({ result: "Error al Insertar el Rol: " + newRol.NombreRol });
  }
}

const rol = new RolController();
export default rol;
