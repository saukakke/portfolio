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

// SmartLab remains in the portfolio, but its external hosted link is removed.
const smartLabProject = Array.from(document.querySelectorAll('#projects .project')).find(card =>
  card.querySelector('h3')?.textContent.trim() === 'SmartLab LMS'
);
smartLabProject?.querySelector('a[href*="smartlab-production-8918.up.railway.app"]')?.remove();

// Add the verified live EventFlow deployment to the Projects section.
const projectsGrid = document.querySelector('#projects .projects');
const eventFlowExists = Array.from(document.querySelectorAll('#projects .project h3')).some(title =>
  title.textContent.trim() === 'EventFlow — Event Ticketing Platform'
);

if (projectsGrid && !eventFlowExists) {
  const eventProject = document.createElement('article');
  eventProject.className = 'project reveal';
  eventProject.id = 'event-ticketing-project';
  eventProject.innerHTML = `
    <small>02 · EVENT TECHNOLOGY / TICKETING</small>
    <h3>EventFlow — Event Ticketing Platform</h3>
    <p>A full-stack event ticketing and management platform with event discovery, ticket inventory, authenticated ordering, Paystack Test Mode checkout, digital QR tickets, organizer management and administrator controls.</p>
    <div class="tags"><span>Next.js</span><span>React</span><span>TypeScript</span><span>PostgreSQL</span><span>Prisma</span><span>Paystack</span></div>
    <a href="https://event-ticketing-x3og.onrender.com" target="_blank" rel="noopener noreferrer">View live app ↗</a>
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
