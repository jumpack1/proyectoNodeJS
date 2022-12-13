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
        `<tr class = "show"> <td>${empleados[i].id}</td>` +
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
  var editButtons = document.querySelectorAll(".get");

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
    axios
      .get(url + "/empleados/" + id, headers)
      .then(function (res) {
        console.log(res);
        localStorage.setItem("id", res.data.message[0].id);
        localStorage.setItem("nombre", res.data.message[0].nombre);
        localStorage.setItem("apellidos", res.data.message[0].apellidos);
        localStorage.setItem("telefono", res.data.message[0].telefono);
        localStorage.setItem("correo", res.data.message[0].correo);
        localStorage.setItem("direccion", res.data.message[0].direccion);

        window.location.href = "editEmp.html";
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function displaySearchEmpleados(empleados) {
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
  var editButtons = document.querySelectorAll(".get");

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", deleteEmpleados());
  });

  editButtons.forEach(function (btn) {
    btn.addEventListener("click", editEmpleados());
  });
}

function searchEmpleados(value) {
  if (value) {
    axios
      .get(url + "/empleados/" + value, headers)
      .then(function (res) {
        var hide = document.querySelectorAll(".show");
        console.log(hide);
        hide.forEach(function (tr) {
          tr.style.display = "none";
        });
        displaySearchEmpleados(res.data.message);
        var returnBtn = document.getElementById("returnBtn");
        returnBtn.style.display = "inline";
      })
      .catch(function (err) {
        alert("No se encontró el usuario");
        console.log(err);
      });
  } else if (!value) {
    alert("Favor de escribir algo");
  }
}
