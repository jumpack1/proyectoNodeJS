window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
    headers = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    loadEmpleados();
  } else {
    window.location.href = "index.html";
  }
}

function loadEmpleados() {
  axios
    .get(url + "/empleados", headers)
    .then(function (res) {
      // console.log(res);
      displayEmpleados(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayEmpleados(empleados) {
  var count = 0;
  var tabla = document.getElementById("tabla");
  for (var i = 0; i < empleados.length; i++) {
    count = count + 1;
    if (count > i) {
      tabla.innerHTML +=
        `<tr> <td>${empleados[i].id}</td>` +
        `<td>${empleados[i].nombre}</td>` +
        `<td>${empleados[i].apellidos}</td>` +
        `<td>${empleados[i].telefono}</td>` +
        `<td>${empleados[i].correo}</td>` +
        `<td>${empleados[i].direccion}</td>` +
        `<td><button onclick=deleteEmpleados(${empleados[i].id}) class="btn btn-danger btn-sm me-3">Eliminar</button>` + // `<td><img src="../img/delete.png" id=${i}> ` +
        `<button onclick=editEmpleados(${empleados[i].id}) class="btn btn-primary btn-sm">Editar</button></td></tr>`;
    }
  }
  var deleteButtons = document.querySelectorAll(".delete");
  var editButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", deleteEmpleados());
  });

  editButtons.forEach(function (btn) {
    btn.addEventListener("click", editEmpleados());
  });
}

function deleteEmpleados(id) {
  if (id) {
    axios
      .delete(url + "/empleados/" + id, headers)
      .then(function (res) {
        console.log(res);
        location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function editEmpleados(id) {
  if (id) {
    // var nombre = document.getElementById("nombre").value;
    // var apellidos = document.getElementById("apellidos").value;
    // var telefono = document.getElementById("telefono").value;
    // var correo = document.getElementById("correo").value;
    // var direccion = document.getElementById("direccion").value;

    // console.log(nombre, apellidos, telefono, correo, direccion);
    axios
      .get(url + "/empleados/" + id, headers)
      .then(function (res) {
        console.log(res);
        var nombre = res.data.nombre;
        console.log(nombre);
        // window.location.href = "editEmp.html";
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
