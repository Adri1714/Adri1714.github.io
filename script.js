

const tabs = [...document.querySelectorAll('.wx')];
const panels = [...document.querySelectorAll('.panel')];

function select(id) {
    tabs.forEach(t => {
        const on = t.dataset.target === id;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
    });
    panels.forEach(p => p.classList.toggle('active', p.id === id));
}
tabs.forEach(t => {
    t.addEventListener('click', () => select(t.dataset.target));
    t.addEventListener('mouseenter', () => {
        if (window.matchMedia('(min-width: 901px)').matches) select(t.dataset.target);
    });
});

const navLinks = [...document.querySelectorAll('.rail-link')];
const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('current', a.getAttribute('href') === id));
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spy.observe(s));
