function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const answer = btn.nextElementSibling;
    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
  });
});
