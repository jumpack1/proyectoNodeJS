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
    document
      .querySelector(".delete")
      .addEventListener("click", deleteEmpleados);
  } else {
    window.location.href = "index.html";
  }
}
