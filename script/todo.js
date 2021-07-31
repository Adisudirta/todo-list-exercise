let myTodo = [];

document.addEventListener("DOMContentLoaded", async function () {
  try {
    myTodo = await getTodo();
    showTodo();
  } catch (err) {
    alert(err);
  }
});

document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = [...document.querySelectorAll("#todo-form input")];
  setAndGetTodo(inputValue.map((e) => e.value));
  inputValue.forEach((e) => (e.value = ""));
});

async function setAndGetTodo([title, description]) {
  try {
    await postTodo(title, description);
    myTodo = await getTodo();
    showTodo();
  } catch (err) {
    alert(err);
  }
}

function showTodo() {
  const container = document.querySelector(".container-todo");
  const allTodo = myTodo
    .map((e) => {
      return ` <div class="todo">
      <div class="todo-title">
        <h3>${e.title}</h3>
      </div>
      <div class="todo-btn">
        <button id="btn-detail">Detail</button>
        <button id="btn-clear">Clear</button>
      </div>
    </div>`;
    })
    .reduce((acc, curr) => acc + curr);
  container.innerHTML = allTodo;
}

function postTodo(title, description) {
  return fetch("https://shrouded-refuge-36665.herokuapp.com/api/todos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("myToken"),
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
}

function getTodo() {
  return fetch("https://shrouded-refuge-36665.herokuapp.com/api/todos", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("myToken"),
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}
