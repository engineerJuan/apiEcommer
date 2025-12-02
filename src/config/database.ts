import { Sequelize } from  "sequelize";
import  dotenv from "dotenv";

dotenv.config();

const bdName = process.env.BD_NAME as string;
const bdUser = process.env.BD_USER as string;
const bdHost = process.env.BD_HOST;
const bdPassword = process.env.BD_PASSWORD;

const sequelize = new Sequelize( bdName, bdUser, bdPassword,{
    host: bdHost,
    dialect: "mysql",
    logging: false,
});

export default sequelize;