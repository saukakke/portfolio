const root=document.documentElement;
const header=document.querySelector('.site-header');
const toggle=document.querySelector('.theme-toggle');
const navToggle=document.querySelector('.nav-toggle');
const navLinks=document.querySelector('.nav-links');
const year=document.querySelector('#year');
year.textContent=new Date().getFullYear();
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='light') root.classList.add('light');
function updateThemeIcon(){toggle.textContent=root.classList.contains('light')?'☀':'◐';toggle.setAttribute('aria-label',root.classList.contains('light')?'Switch to dark theme':'Switch to light theme')}
updateThemeIcon();
toggle.addEventListener('click',()=>{root.classList.toggle('light');localStorage.setItem('portfolio-theme',root.classList.contains('light')?'light':'dark');updateThemeIcon()});
navToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');navToggle.setAttribute('aria-expanded',open)});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));