//Dependencias
const morgan = require("morgan");
const express = require("express");
const app = express();

//Rutas
const empleados = require("./routes/empleados");
const admins = require("./routes/admins");

//Middlewares
const auth = require("./middleware/auth");
const cors = require("./middleware/cors");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admins", admins);
app.use("/empleados", empleados);
app.use(notFound);
app.use(auth);

app.listen(3000, () => {
  console.log("HOLAAA");
});
