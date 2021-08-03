// function untuk menjalankan loading
function showLoading() {
  Swal.fire({
    title: "loading...",
    showConfirmButton: false,
  });
}

// Error Modal
function errorModal(title, text) {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
}

// Succes Modal
function successModal(title, text) {
  Swal.fire(title, text, "success");
}
