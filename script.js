document.documentElement.classList.add('js');

const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backTop = document.getElementById('backTop');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  if (!navLinks) return;
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});

try {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') body.classList.add('light');

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
  });
} catch (_) {
  themeToggle?.addEventListener('click', () => body.classList.toggle('light'));
}

const projectsGrid = document.querySelector('.projects');
if (projectsGrid && !document.getElementById('event-ticketing-project')) {
  const eventProject = document.createElement('article');
  eventProject.className = 'project reveal';
  eventProject.id = 'event-ticketing-project';
  eventProject.innerHTML = `
    <small>02 · EVENT TECHNOLOGY / TICKETING</small>
    <h3>Event Ticketing Platform</h3>
    <p>A full-stack event ticketing application designed to manage events, ticket sales, attendee access and event operations through a responsive web experience.</p>
    <div class="tags"><span>Next.js</span><span>JavaScript</span><span>Database</span><span>REST APIs</span><span>GitHub</span></div>
  `;
  const firstProject = projectsGrid.querySelector('.project');
  if (firstProject) firstProject.insertAdjacentElement('afterend', eventProject);
  else projectsGrid.appendChild(eventProject);
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

window.addEventListener('scroll', () => {
  backTop?.classList.toggle('show', window.scrollY > 700);
}, { passive: true });

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
