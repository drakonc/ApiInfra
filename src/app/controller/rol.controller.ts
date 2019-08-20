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
    const busqueda = await mysql.query("SELECT * FROM rol WHERE IdRol = ?", [newRol.IdRol]);
    if (busqueda.length > 0) {
      return res.status(200).json({ result: "Ya se encuentra creado un Rol Con El ID: " + newRol.IdRol });
    } else {
      const result = await mysql.query("INSERT INTO rol SET ?", [newRol]);
      if (result.serverStatus === 2) return res.status(200).json({ result: "Se Inserto el Rol: " + newRol.NombreRol + " Correctamente" });
      else return res.status(200).json({ result: "Error al Insertar el Rol: " + newRol.NombreRol });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<Response> {
    const rol: Rol = req.body;
    const { IdRol } = req.params;
    const busqueda = await mysql.query("SELECT * FROM rol WHERE IdRol = ?", [IdRol]);
    console.log(IdRol);
    if (busqueda.length > 0) {
      const result = await mysql.query("UPDATE rol SET ? WHERE IdRol = ?", [rol, IdRol]);
      if (result.serverStatus === 2) return res.status(200).json({ result: "Se Actualizo el Rol: " + rol.NombreRol + " Correctamente" });
      else return res.status(200).json({ result: "Error al Actualizar el Rol: " + rol.NombreRol });
    } else return res.status(200).json({ result: "No se Encontro el Elemento Buscado" });
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const { IdRol } = req.params;
    const busqueda = await mysql.query("SELECT * FROM rol WHERE IdRol = ?", [IdRol]);
    if (busqueda.length > 0) {
      const result = await mysql.query("DELETE FROM rol WHERE IdRol = ?", [IdRol]);
      if (result.serverStatus === 2) return res.status(200).json({ result: "Se Elimino el Rol Correctamente" });
      else return res.status(200).json({ result: "Error al Eliminar el Rol" });
    } else return res.status(200).json({ result: "No se Encontro el Elemento Buscado" });
  }
}

const rol = new RolController();
export default rol;
