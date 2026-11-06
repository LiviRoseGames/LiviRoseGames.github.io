document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".photo-carousel");

    carousels.forEach(function (carousel) {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const previous = carousel.querySelector(".carousel-prev");
        const next = carousel.querySelector(".carousel-next");
        const counter = carousel.querySelector(".carousel-counter");

        if (!slides.length || !previous || !next || !counter) {
            return;
        }

        let current = 0;

        function updateCarousel() {
            slides.forEach(function (slide, index) {
                slide.classList.toggle("active", index === current);
            });

            counter.textContent = `${current + 1} / ${slides.length}`;
        }

        previous.addEventListener("click", function () {
            current = (current - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        next.addEventListener("click", function () {
            current = (current + 1) % slides.length;
            updateCarousel();
        });

        updateCarousel();
    });
});