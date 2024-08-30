import { Sequelize } from "sequelize";
import { Measure } from "../models/measure.js"
import { Customer } from "../models/customer.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3"
});

Customer.init(sequelize)
Measure.init(sequelize)

Customer.hasMany(Measure, { foreignKey: 'CustomerId'})

export default sequelize;