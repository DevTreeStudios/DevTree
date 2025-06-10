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

document.querySelectorAll('.video-placeholder').forEach(placeholder => {
  const videoSrc = placeholder.getAttribute('data-video-src');

  const fallbackNote = document.createElement('p');
  fallbackNote.textContent = "If the video doesn't play, your browser might be blocking it. Try another browser or allow third-party content.";
  fallbackNote.style.fontSize = '0.9rem';
  fallbackNote.style.color = '#ccc';
  fallbackNote.style.marginTop = '0.5rem';
  placeholder.parentNode.appendChild(fallbackNote);

  const loadVideo = () => {
    const iframe = document.createElement('iframe');
    iframe.src = videoSrc;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = 'autoplay';
    iframe.allowFullscreen = true;
    iframe.style.border = 'none';
    placeholder.replaceWith(iframe);
  };

  if (localStorage.getItem('cookie_consent') === 'accepted') {
    loadVideo();
  } else {
    placeholder.addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'accepted');
      location.reload();
      loadVideo();
    });
  }
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
