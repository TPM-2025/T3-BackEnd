import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "user"
const Clothing = db.define(
  "clothes", // Nama Tabel
  {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    category: Sequelize.STRING,
    brand: Sequelize.STRING,
    sold: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    stock: Sequelize.INTEGER,
    yearReleased: Sequelize.INTEGER,
    material: Sequelize.STRING,
  },
  { freezeTableName: true }
);

db.sync().then(() => console.log("Database synced"));

export default Clothing;
