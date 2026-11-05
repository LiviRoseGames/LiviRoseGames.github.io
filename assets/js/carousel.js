
function initializeCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const previous = carousel.querySelector(".carousel-prev");
        const next = carousel.querySelector(".carousel-next");
        const counter = carousel.querySelector(".carousel-counter");

        // Make sure this carousel has everything it needs.
        if (!slides.length || !previous || !next || !counter) {
            console.warn("Carousel is missing required elements:", carousel);
            return;
        }

        let currentIndex = 0;

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentIndex);
            });

            counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        }

        previous.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        next.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });

        showSlide(0);
    });
}

// Run immediately if the page is already loaded.
// Otherwise, wait until the HTML has been parsed.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCarousels);
} else {
    initializeCarousels();
}
