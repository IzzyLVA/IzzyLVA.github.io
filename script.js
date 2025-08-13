document.addEventListener("DOMContentLoaded", () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const nameElement = document.getElementById("scrambleName");
    const originalText = nameElement.textContent;

    function scrambleText() {
        let iteration = 0;
        const interval = setInterval(() => {
            nameElement.textContent = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Lower = slower scramble
        }, 50);
    }

    scrambleText(); // run once on load
    nameElement.addEventListener("mouseenter", scrambleText); // run on hover
});
