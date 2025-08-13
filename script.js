document.addEventListener("DOMContentLoaded", () => {
    // Smooth fade-in effect for sections
    const sections = document.querySelectorAll("section, header, footer");

    const revealOnScroll = () => {
        sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                sec.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Glow pulse effect on name
    const name = document.querySelector(".glow");
    setInterval(() => {
        name.classList.toggle("active-glow");
    }, 2000);
});
