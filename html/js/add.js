window.onload = init;

function init() {
  document
    .querySelector(".btn-primary")
    .addEventListener("click", addEmpleados);
  console.log("AKI");
}

function addEmpleados() {
  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellidos").value;
  var telefono = document.getElementById("telefono").value;
  var correo = document.getElementById("correo").value;
  var direccion = document.getElementById("direccion").value;

  axios({
    method: "post",
    url: "http://localhost:3000/empleados/add",
    data: {
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
    },
  })
    .then(function (res) {
      console.log(res);
      window.location.href = "main.html";
    })
    .catch(function (err) {
      console.log(err);
    });
}
