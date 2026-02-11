// --- 1. MENÚ MÒBIL ---
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Tancar menú en clicar enllaç
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// --- 2. MODALS ---
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Tancar en clicar fora del contingut
window.onclick = (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// --- 3. ANIMACIONS SECCIONS I SKILLS ---
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Si és la secció de skills, animem les barres
            if (entry.target.id === 'skills') {
                skillBars.forEach(bar => {
                    const pct = bar.parentElement.previousElementSibling.textContent; // no l'utilitzem, usem data-percent
                    bar.style.width = bar.getAttribute('data-percent');
                });
            }
        }
    });
}, { threshold: 0.15 });

sections.forEach(s => observer.observe(s));

// --- 4. SISTEMA DE PARTÍCULES ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.floor(window.innerWidth / 15);
    for(let i=0; i<count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2 + 1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.fillStyle = 'rgba(0, 212, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initParticles);
initParticles();
animate();