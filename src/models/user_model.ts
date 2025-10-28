import { Model, DataType,Optional, DataTypes } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs"

interface UserAttributes{
    id: number;
    nombre: string;
    email: string;
    password?: string;     
    id_role: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{
    password: string;
}
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public password!: string;
    public id_role!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async comprobarPassword(password: string): Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }
}

User.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },

    nombre: {
        type:  new DataTypes.STRING(128),
        allowNull: false,
    },

    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        }
    },

    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },

    id_role: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
},{
    tableName: 'usuarios',
    sequelize,
    timestamps: false,
});

export default User