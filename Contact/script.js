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
    }
  } catch {
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

window.onload = function() { 
  var el = document.getElementById('g-recaptcha-response'); 
  if (el) { 
    el.setAttribute('required', 'required'); 
  } 
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("1");
  const tokenInput = document.getElementById("g-recaptcha-response");

  if (form && tokenInput) {
    console.log("2");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
console.log("3");
      grecaptcha.ready(function () {
        console.log("4");
        grecaptcha.execute('6LcqDVkrAAAAADb1QY3e_NfIZQYdoNcG0RjqJSCl', { action: 'submit' }).then(function (token) {
          tokenInput.value = token;
console.log("5");
          if (token) {
            form.submit();
            console.log("6");
          } else {
            alert("Failed to generate reCAPTCHA token.");
          }
        });
      });
    });
  } else {
    console.log("Error: Unable to get form element");
  }
});
