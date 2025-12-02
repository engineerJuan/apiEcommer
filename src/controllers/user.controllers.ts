import { Request, Response } from "express";
import UserService from "../services/user.service";
import User from "../models/user_model";
import Role from "../models/role_model"; 

const userServiceInstance = new UserService();

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userServiceInstance.getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// Crear usuario
export const crearUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password, id_role } = req.body;

    if (!nombre || !email || !password || !id_role) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    // Verificar que el rol exista
    const existeRol = await Role.findOne({ where: { id: id_role } });
    if (!existeRol) {
      return res.status(400).json({
        message: `El rol con id ${id_role} no existe`,
      });
    }

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password,
      id_role,
    });

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: nuevoUsuario,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { nombre, email, password, id_role } = req.body;

    if (!id_role) {
      return res.status(400).json({
        message: "El rol es obligatorio",
      });
    }

    const roleExist = await Role.findOne({ where: { id: id_role } });
    if (!roleExist) {
      return res.status(400).json({
        message: "El rol no existe",
      });
    }

    await User.update(
      { nombre, email, password, id_role },
      { where: { id } }
    );

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};