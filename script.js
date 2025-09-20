const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3 + 1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "purple";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
}

function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animate();

document.addEventListener("DOMContentLoaded", () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const nameElement = document.getElementById("scrambleName");
    if (!nameElement) return;

    const originalText = nameElement.textContent;

    function scrambleText() {
        let iteration = 0;
        const interval = setInterval(() => {
            nameElement.textContent = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return originalText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 1.5; 
        }, 40); 
    }

    scrambleText();
    nameElement.addEventListener("mouseenter", scrambleText);

    document.querySelectorAll('main, section').forEach(sec => sec.style.display = 'none');
    document.getElementById('home').style.display = 'block';

    function handleNavigation(targetId) {
        document.querySelectorAll('.sidebar a, .mobile-menu a').forEach(a => a.classList.remove('active'));
        const targetLink = document.querySelector(`a[href="#${targetId}"]`);
        if (targetLink) targetLink.classList.add('active');

        document.querySelectorAll('main, section').forEach(sec => sec.style.display = 'none');
        const targetSection = document.getElementById(targetId);
        if (targetId === "home") {
            targetSection.style.display = "block";
        } else {
            targetSection.style.display = "flex";
        }
    }

    document.querySelectorAll('.sidebar a, .mobile-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            handleNavigation(targetId);

            if (window.innerWidth <= 768) {
                document.querySelector('.mobile-menu').classList.remove('active');
            }
        });
    });

    const toggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    toggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
});

