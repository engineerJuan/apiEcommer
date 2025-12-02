import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false
});

export default Role;