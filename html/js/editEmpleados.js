window.onload = getInfo;
var headers = {};
var url = "http://localhost:3000";

function getInfo() {
  document
    .getElementById("nombre")
    .setAttribute("value", localStorage.getItem("nombre"));
  document
    .getElementById("apellidos")
    .setAttribute("value", localStorage.getItem("apellidos"));
  document
    .getElementById("telefono")
    .setAttribute("value", localStorage.getItem("telefono"));
  document
    .getElementById("correo")
    .setAttribute("value", localStorage.getItem("correo"));
  document
    .getElementById("direccion")
    .setAttribute("value", localStorage.getItem("direccion"));

  document
    .querySelector(".btn-primary")
    .addEventListener("click", updateEmpleados);
}

function updateEmpleados(id) {
  var id = localStorage.getItem("id");
  console.log(id);
  if (id) {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var telefono = document.getElementById("telefono").value;
    var correo = document.getElementById("correo").value;
    var direccion = document.getElementById("direccion").value;
    axios({
      method: "put",
      url: "http://localhost:3000/empleados/" + id,
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
}
