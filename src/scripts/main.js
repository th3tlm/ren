document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 800, once: true });
});

const cursor = document.getElementById('cursor');
const blur = document.getElementById('cursor-blur');
let cursorActive = false;
let mouseX = 0;
let mouseY = 0;
let cursorTicking = false;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!cursorActive && window.innerWidth > 768) {
        document.body.classList.add('custom-cursor');
        if (cursor) cursor.style.opacity = '1';
        if (blur) blur.style.opacity = '1';
        cursorActive = true;
    }

    if (!cursorTicking) {
        window.requestAnimationFrame(() => {
            if (cursor && blur) {
                cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
                blur.style.transform = `translate3d(${mouseX - 17}px, ${mouseY - 17}px, 0)`;
            }
            cursorTicking = false;
        });
        cursorTicking = true;
    }
}, { passive: true }); // Use passive listener for better scroll/mouse performance

const header = document.getElementById('navbar');
let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const scroll = window.scrollY;
            
            // Toggle header styling only
            if (scroll > 50) {
                if (header) header.classList.add('scrolled');
            } else {
                if (header) header.classList.remove('scrolled');
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true }); // Improve scroll performance by omitting heroBg parallax

document.querySelectorAll('.offer-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});