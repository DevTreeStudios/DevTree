const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const form = document.querySelector(".contact-form");
const statusBox = document.getElementById("form-status");
const overlay = document.getElementById("essential-cookie-overlay");
const acceptBtn = document.getElementById("essential-cookie-accept");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

function showStatus(message, success) {
  statusBox.textContent = message;
  statusBox.className = `form-status ${success ? "success" : "error"} show`;
  setTimeout(() => {
    statusBox.classList.remove("show");
  }, 5000);
}

// Cookie Consent Logic
function loadRecaptcha() {
  if (window.recaptchaLoaded) return;

  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?render=6LcqDVkrAAAAADb1QY3e_NfIZQYdoNcG0RjqJSCl";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    console.log("reCAPTCHA script loaded");
  };

  document.head.appendChild(script);
  window.recaptchaLoaded = true;
}

function acceptEssentialCookies() {
  localStorage.setItem("essential_cookie_accepted", "true");
  overlay.style.display = "none";
  loadRecaptcha();
}

acceptBtn.addEventListener("click", acceptEssentialCookies);

// Check consent on load
if (localStorage.getItem("essential_cookie_accepted") !== "true") {
  overlay.style.display = "flex";
} else {
  loadRecaptcha();
}

window.onload = function () {
  const el = document.getElementById("g-recaptcha-response");
  if (el) {
    el.setAttribute("required", "required");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const tokenInput = document.getElementById("g-recaptcha-response");

  if (!form || !tokenInput) {
    console.error("Form or reCAPTCHA input not found.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (localStorage.getItem("essential_cookie_accepted") !== "true") {
      showStatus("You must accept essential cookies to submit the form.", false);
      return;
    }

    grecaptcha.ready(function () {
      grecaptcha.execute("6LcqDVkrAAAAADb1QY3e_NfIZQYdoNcG0RjqJSCl", { action: "submit" }).then(async function (token) {
        if (!token) {
          showStatus("Failed to generate reCAPTCHA token.", false);
          return;
        }

        tokenInput.value = token;

        const data = new FormData(form);
        const action = form.getAttribute("action");

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
            const errData = await res.json();
            const errMsg = errData?.errors?.[0]?.message || "There was an error. Please try again.";
            showStatus(errMsg, false);
          }
        } catch (err) {
          showStatus("There was an error. Please try again.", false);
        }
      });
    });
  });
});
