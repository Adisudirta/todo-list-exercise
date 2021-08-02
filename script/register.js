// ketika form register disubmit
document
  .getElementById("form-register")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const inputValue = [...document.querySelectorAll("form input")].map(
      (e) => e.value
    );
    register(inputValue);
  });

// function yang berfungsi dalam pengecekan password dan menangkap error pada fetch
async function register([email, pass, confirmPass]) {
  if (pass !== confirmPass) {
    alert("Confirm your password correctly!");
  } else {
    try {
      const data = await postDataRegister(email, pass);
      alert("Thank you for registering, the next step please login");
    } catch (err) {
      alert(err);
    }
  }
}

// function untuk mengirimkan data yang diinputkan dari form register menuju database
function postDataRegister(email, pass) {
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
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        throw new Error(res.message);
      } else {
        return res;
      }
    });
}
