/* ── Cursor glow ── */
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ── Typewriter ── */
const phrases = [
  'echo "Full-Stack Developer"',
  'python train_model.py --dataset MNIST',
  'git commit -m "build IoT security system"',
  'laravel artisan serve --port=8000',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');
function type() {
  const cur = phrases[pi];
  if (!deleting) {
    el.textContent = cur.substring(0, ci + 1);
    ci++;
    if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 55);
  } else {
    el.textContent = cur.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); return; }
    setTimeout(type, 28);
  }
}
setTimeout(type, 1400);

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: .12 });
reveals.forEach(r => observer.observe(r));

/* ── Skill bars on reveal ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.about-card').forEach(c => skillObs.observe(c));

/* ── Scroll top button ── */
const btn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  btn.classList.toggle('show', window.scrollY > 400);
});

/* ── Evidence image modal ── */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.evidence-img img').forEach(img => {
  img.addEventListener('click', () => {
    const caption = img.closest('.evidence-card')?.querySelector('.evidence-caption')?.textContent || img.alt;
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaption.textContent = caption;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
});
