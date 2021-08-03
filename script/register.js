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
    errorModal("Something wrong!", "Confirm your password correctly!");
  } else {
    try {
      const data = await postDataRegister(email, pass);
      successModal(
        "Register successfully!",
        "The next step please login on login page."
      );
    } catch (err) {
      errorModal("Something wrong!", err);
    }
  }
}

// function untuk mengirimkan data yang diinputkan dari form register menuju database
function postDataRegister(email, pass) {
  showLoading();
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
        Swal.close();
        throw new Error("Email has been used by another user");
      } else {
        return res;
      }
    });
}
