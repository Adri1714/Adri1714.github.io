/* ============================================================
   Adrià Roger Juanola — Portfolio
   ============================================================ */

// --- Work index: expand / collapse ---
const works = document.querySelectorAll('.work');

works.forEach(work => {
    const head = work.querySelector('.work-head');
    head.addEventListener('click', () => {
        const isOpen = work.classList.contains('open');

        // Close any other open entry (single-open accordion)
        works.forEach(other => {
            if (other !== work) {
                other.classList.remove('open');
                other.querySelector('.work-head').setAttribute('aria-expanded', 'false');
            }
        });

        work.classList.toggle('open', !isOpen);
        head.setAttribute('aria-expanded', String(!isOpen));
    });
});

// --- Highlight the section currently in view ---
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.block');

const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(item =>
                item.classList.toggle('current', item.getAttribute('href') === '#' + id)
            );
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spy.observe(s));
