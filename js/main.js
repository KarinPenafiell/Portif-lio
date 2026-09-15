'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menuButton.focus();
  }
});

// Players load only on request. On file://, YouTube opens directly because
// embedded playback may reject the missing HTTP referrer.
document.querySelectorAll('.video-play').forEach(button => {
  button.addEventListener('click', () => {
    const frame = button.closest('.video-frame');
    const id = frame.dataset.video;
    if (window.location.protocol === 'file:') {
      window.open('https://www.youtube.com/shorts/' + id, '_blank', 'noopener,noreferrer');
      return;
    }
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    player.title = button.getAttribute('aria-label');
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    frame.replaceChildren(player);
    player.focus();
  });
});

// Marks the open folder: hero tabs and project index reflect the case in view.
if ('IntersectionObserver' in window) {
  const links = document.querySelectorAll('.folder-link, .project-index a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const current = link.getAttribute('href') === '#' + entry.target.id;
        if (current) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
      });
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.folder').forEach(section => observer.observe(section));
}

// Each folder freezes when its end meets the bottom of the screen, so the next one slides over it.
const folders = document.querySelectorAll('.folder');
const stick = () => folders.forEach(folder => folder.style.setProperty('--stick', Math.min(0, window.innerHeight - folder.offsetHeight) + 'px'));
stick();
window.addEventListener('resize', stick);
window.addEventListener('load', stick);
