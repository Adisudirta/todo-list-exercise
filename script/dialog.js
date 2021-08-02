//ketika close button diklik
document.addEventListener("click", function (e) {
  const closeBtn = e.target;
  if (closeBtn.classList.contains("close-btn")) {
    const container = closeBtn.parentElement.parentElement.parentElement;
    container.setAttribute("style", "display: none");
  }
});

// function untuk menjalankan dialog box
function dialog(inner) {
  const containerShadow = document.querySelector(".container-shadow");
  const container = document.querySelector(".dialog");
  containerShadow.setAttribute("style", "display:block");
  container.innerHTML = inner;
}
