function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  const closeBtn = document.querySelector(".close-lightbox");

  document.querySelectorAll(".media-container img, .media-container video, .media-container iframe").forEach(el => {
    el.addEventListener("click", () => {
      const clone = el.cloneNode(true);
      clone.controls = true;
      lightboxContent.innerHTML = "";
      lightboxContent.appendChild(clone);
      lightbox.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightboxContent.innerHTML = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
      lightboxContent.innerHTML = "";
    }
  });
});
