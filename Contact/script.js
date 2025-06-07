const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const form = document.querySelector(".contact-form");
const statusBox = document.getElementById("form-status");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const action = form.getAttribute("action");
console.log(action);
  console.log(data);
  try {
    const res = await fetch(action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      showStatus("Your message has been sent!", true);
      form.reset();
    } else {
      showStatus("There was an error. Please try again.", false);

      console.error("Server responded with status:", res.status);
    const errorText = await res.text();
    console.error("Response body:", errorText);
    }
  } catch (err) {
    console.log(err);
    showStatus("There was an error. Please try again.", false);
  }
});

function showStatus(message, success) {
  statusBox.textContent = message;
  statusBox.className = `form-status ${success ? "success" : "error"} show`;
  setTimeout(() => {
    statusBox.classList.remove("show");
  }, 5000);
}
