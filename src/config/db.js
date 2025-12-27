const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";

const mongoURI =
  env === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Conectado com o banco de dados");
  } catch (error) {
    console.error("Erro ao conectar no banco de dados", error);
    process.exit(1);
  }
};

module.exports = connectDB;
