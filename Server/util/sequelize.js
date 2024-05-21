import { Sequelize } from "sequelize";
const sequelize = new Sequelize("khust", "root", "", {
  dialect: "mysql",
  host: "localhost",
});
export default sequelize;
