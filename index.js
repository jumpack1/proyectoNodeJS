//Dependencias
const morgan = require("morgan");
const express = require("express");
const app = express();

//Rutas
const empleados = require("./routes/empleados");
//Middlewares

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/empleados", empleados);
app.listen(3000, () => {
  console.log("HOLAAA");
});
