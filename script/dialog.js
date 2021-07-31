//ketika close button diklik
document.addEventListener("click", function (e) {
  const closeBtn = e.target;
  if (closeBtn.classList.contains("close-btn")) {
    const container = closeBtn.parentElement.parentElement.parentElement;
    container.setAttribute("style", "display: none");
  }
});

function dialog(inner) {
  const container = document.querySelector(".dialog");
  container.setAttribute("style", "display:block");
  container.innerHTML = inner;
}
