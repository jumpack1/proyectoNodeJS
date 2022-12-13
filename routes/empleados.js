const { json } = require("express");
const express = require("express");
const empleados = express.Router();
const db = require("../config/database");

//Crear nuevo
empleados.post("/add", async (req, res, next) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;

  if (nombre && apellidos && telefono && correo && direccion) {
    let query =
      "INSERT INTO empleados(nombre, apellidos, telefono, correo, direccion) ";
    query += `VALUES('${nombre}','${apellidos}','${telefono}','${correo}','${direccion}')`;

    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, messsage: "Se agregó un nuevo empleado" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

//Eliminar
empleados.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE FROM empleados WHERE id=${req.params.id}`;

  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Empleado borrado correctamente" });
  }
  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

//Actualizar
empleados.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;

  if (nombre && apellidos && telefono && correo && direccion) {
    let query = `UPDATE empleados SET nombre='${nombre}' ,apellidos='${apellidos}',`;
    query += `telefono='${telefono}',correo='${correo}' WHERE id=${req.params.id};`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Empleado actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

//Seleccionar todo
empleados.get("/", async (req, res, next) => {
  const emp = await db.query("SELECT * FROM empleados");
  return res.status(200).json({ code: 200, message: emp });
});

//Buscar por id
empleados.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  var count = await db.query("SELECT MAX(id) as count FROM empleados");
  var totalIds = JSON.parse(JSON.stringify(count[0].count));
  if (id >= 1 && id <= totalIds) {
    const emp = await db.query("SELECT * FROM empleados WHERE id=" + id + ";");
    return res.status(200).json({ code: 200, message: emp });
  } else {
    return res
      .status(404)
      .send({ code: 404, message: "Empleado no encontrado" });
  }
});

//Buscar por nombre
empleados.get("/:nombre([A-Za-z]+)", async (req, res, next) => {
  const nombre = req.params.nombre;

  if (nombre) {
    const emp = await db.query(
      "SELECT * FROM empleados WHERE nombre= ?",
      nombre
    );
    if (emp.length > 0) {
      return res.status(200).json({ code: 200, message: emp });
    }
    return res
      .status(404)
      .send({ code: 404, message: "Empleado no encontrado" });
  }
});

module.exports = empleados;
