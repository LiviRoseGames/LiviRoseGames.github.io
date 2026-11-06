document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".photo-carousel").forEach(carousel => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        const previousButton = carousel.querySelector(".carousel-prev");
        const nextButton = carousel.querySelector(".carousel-next");
        const counter = carousel.querySelector(".carousel-counter");

        if (slides.length === 0 || !previousButton || !nextButton || !counter) {
            return;
        }

        let currentIndex = 0;

        function showSlide(index) {
            slides[currentIndex].classList.remove("active");

            currentIndex = (index + slides.length) % slides.length;

            slides[currentIndex].classList.add("active");
            counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        }

        previousButton.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });
    });
});