// array untuk menampung data todo
let myTodo = [];

//ketika tulisan logout diklik
document.querySelector("header p").addEventListener("click", function () {
  localStorage.clear("myToken");
  location.href = "./index.html";
});

// ketika DOM sudah di-load oleh browser dgn baik maka get data todo
document.addEventListener("DOMContentLoaded", async function () {
  try {
    myTodo = await getTodo();
    showTodo();
  } catch (err) {
    console.log(err);
  }
});

//ketika form pengisian todo-list di submit maka post data dan get data Todo
document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = [...document.querySelectorAll("#todo-form input")];
  setAndGetTodo(inputValue.map((e) => e.value));
  inputValue.forEach((e) => (e.value = ""));
});

// ketika button detail di-klik, maka tampilkan detail todo
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-detail")) {
    const idTodo = parseInt(e.target.getAttribute("idTodo"));
    const todoIndex = searchIndex(idTodo);
    dialog(`<h1>${myTodo[todoIndex].title}</h1>
    <h2>Description:</h2>
    <p>${myTodo[todoIndex].description}</p>
    <h2>Created at:</h2>
    <p>${myTodo[todoIndex].createdAt.slice(0, 10)}</p>
    `);
  }
});

// ketika button clear diklik maka remove data todo
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-clear")) {
    const idTodo = parseInt(e.target.getAttribute("idTodo"));
    removeTodo(idTodo);
    showTodo();
  }
});

//function untuk menangkap error pada fetch ketika melakukan oprasi delete
async function removeTodo(id) {
  const messege = await deleteData(id);
  myTodo = await getTodo();
  if (myTodo.length !== 0) {
    showTodo();
  } else {
    const containerTodo = document.querySelector(".container-todo");
    containerTodo.innerHTML = `<h1>Empty Activity<h1>`;
  }
  successModal("Delete Success!", messege);
}

//function untuk delete data todo pada database
function deleteData(id) {
  showLoading();
  return fetch(`https://shrouded-refuge-36665.herokuapp.com/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("myToken"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      Swal.close();
      return res.message;
    });
}

// function untuk mencari tau index suatu elemen berdasarkan property id
function searchIndex(idTodo) {
  let index;
  myTodo.forEach((e, i) => {
    if (e.id === idTodo) {
      index = i;
    }
  });
  return index;
}

// function untuk menangkap error fetch
async function setAndGetTodo([title, description]) {
  try {
    await postTodo(title, description);
    myTodo = await getTodo();
    showTodo();
  } catch (err) {
    errorModal("Something wrong!", err);
  }
}

// function untuk menampilkan data todo pada halaman website
function showTodo() {
  const container = document.querySelector(".container-todo");
  const allTodo = myTodo
    .map((e) => {
      return ` <div class="todo">
      <div class="todo-title">
        <h3>${e.title}</h3>
      </div>
      <div class="todo-btn">
        <button class="btn-detail" idTodo="${e.id}">Detail</button>
        <button class="btn-clear" idTodo="${e.id}">Clear</button>
      </div>
    </div>`;
    })
    .reduce((acc, curr) => acc + curr);
  container.innerHTML = allTodo;
}

// function yang berfungsi untuk mengirim data yang diinputkan dari form
function postTodo(title, description) {
  showLoading();
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
    .then((res) => {
      Swal.close();
      return res;
    });
}

// function yang berfungsi untuk mendapatkan data todo dari database
function getTodo() {
  showLoading();
  return fetch("https://shrouded-refuge-36665.herokuapp.com/api/todos", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("myToken"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      Swal.close();
      return res;
    });
}
