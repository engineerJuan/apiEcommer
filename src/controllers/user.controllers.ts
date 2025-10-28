import { Request, Response } from "express";
import { userService } from "../services/user.servise";
import User from "../models/user_model";

const userServiceInstance = new userService();

// Obtener todos los usuarios
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userServiceInstance.getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Insertar datos
export const crearUsiarios = async (req: any, res: any) => {
  try {
    const { nombre, email, password, id_role } = req.body;

    const existeRol = await User.findOne({ where: { id: id_role } });
    if (!existeRol) {
      return res.status(400).json({ 
        message: `El rol con id ${id_role} no existe` 
      });
    }

    if (!nombre || !email || !password || !id_role) {
      return res.status(400).json({ 
        message: 'Todos los campos son obligatorios' 
      });
    }

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password,
      id_role,
    });

    return res.status(200).json({ 
      message: 'Usuario creado exitosamente' 
    });

  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Actualizar datos
export const updateUser = async (req: any, resp: any) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, id_role } = req.body;

    if (!id_role) {
      return resp.status(400).json({
        message: "El rol es obligatorio",
      });
    }

    const roleExist = await User.findOne({ where: { id: id_role } });
    if (!roleExist) {
      return resp.status(400).json({
        message: "El rol no existe",
      });
    }

    const usuarioActualizado = await User.update(
      {
        nombre,
        email,
        password,
        id_role,
      },
      {
        where: { id },
      }
    );

    return resp.status(200).json({
      message: "Usuario actualizado exitosamente",
    });

  } catch (error) {
    return resp.status(500).json({ message: error });
  }
};