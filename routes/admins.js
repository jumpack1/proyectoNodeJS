const { json } = require("express");
const express = require("express");
const admins = express.Router();
const db = require("../config/database");
const jwt = require("jsonwebtoken");

admins.post("/login", async (req, res, next) => {
  const { correo, contraseña } = req.body;
  const query = `SELECT * FROM administradores WHERE correo='${correo}' AND contraseña='${contraseña}'`;
  const rows = await db.query(query);
  console.log(rows);

  if (correo && contraseña) {
    if (rows.length == 1) {
      const token = jwt.sign(
        {
          id: rows[0].id,
          correo: rows[0].correo,
        },
        "debugkey"
      );
      return res.status(200).json({ code: 200, message: token });
    } else {
      return res
        .status(200)
        .json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

module.exports = admins;
