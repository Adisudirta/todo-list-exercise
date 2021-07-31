if (localStorage.getItem("myToken")) {
  location.href = "../todo.html";
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = [...document.querySelectorAll("#login-form input")].map(
    (e) => e.value
  );
  login(inputValue);
});

async function login([email, pass]) {
  try {
    const token = await postDataLogin(email, pass);
    localStorage.setItem("myToken", token);
    location.href = "./todo.html";
  } catch (err) {
    alert(err);
  }
}

function postDataLogin(email, pass) {
  return fetch("https://shrouded-refuge-36665.herokuapp.com/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        throw new Error(res.message);
      } else {
        return res.token;
      }
    });
}
