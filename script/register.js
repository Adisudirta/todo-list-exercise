// function createObj(email, pass, confirmPass) {
//   this.email = email;
//   this.pass = pass;
//   this.confirmPass = confirmPass;
// }

document
  .getElementById("form-register")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const inputValue = [...document.querySelectorAll("form input")].map(
      (e) => e.value
    );
    register(inputValue);
  });

async function register([email, pass, confirmPass]) {
  if (pass !== confirmPass) {
    alert("Confirm your password correctly!");
  } else {
    try {
      const data = await postData(email, pass);
      console.log(data);
    } catch (err) {
      alert(err);
    }
  }
}

function postData(email, pass) {
  return fetch(
    "https://shrouded-refuge-36665.herokuapp.com/api/users/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    }
  ).then((res) => {
    if (res.status === 400) {
      throw new Error("Validation error: Email has been used by another user");
    }
  });
}
