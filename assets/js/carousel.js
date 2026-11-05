document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const previous = carousel.querySelector(".carousel-prev");
        const next = carousel.querySelector(".carousel-next");
        const counter = carousel.querySelector(".carousel-counter");

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
});