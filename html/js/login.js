window.onload = init;

function init() {
  document.querySelector(".button").addEventListener("click", login);
}

function login() {
  var correo = document.getElementById("email").value;
  var contraseña = document.getElementById("password").value;

  axios({
    method: "post",
    url: "http://localhost:3000/admins/login",
    data: {
      correo: correo,
      contraseña: contraseña,
    },
  })
    .then(function (res) {
      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.message);
        window.location.href = "main.html";
      } else {
        alert("Usuario y/o contraseña incorrectos");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
