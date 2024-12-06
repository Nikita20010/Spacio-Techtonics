// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize carousels
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carousel) => initializeCarousel(carousel));

    // Smooth scrolling for internal links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Initialize animations on scroll
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    handleScrollAnimations(animatedElements);
    window.addEventListener("scroll", () => handleScrollAnimations(animatedElements));
});

/**
 * Initialize a carousel with navigation
 * @param {Element} carousel
 */
function initializeCarousel(carousel) {
    const leftArrow = carousel.querySelector(".nav-arrow.left");
    const rightArrow = carousel.querySelector(".nav-arrow.right");
    const cardContainer = carousel.querySelector(".cards");
    const cards = carousel.querySelectorAll(".card");

    let currentIndex = 0;
    const maxIndex = cards.length - 1;

    // Move to the next card
    rightArrow.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition(cardContainer, currentIndex);
        }
    });

    // Move to the previous card
    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition(cardContainer, currentIndex);
        }
    });
}

/**
 * Update carousel position based on the index
 * @param {Element} container
 * @param {number} index
 */
function updateCarouselPosition(container, index) {
    const cardWidth = container.querySelector(".card").offsetWidth + 20; // Adjust margin between cards
    container.style.transform = `translateX(-${index * cardWidth}px)`;
}

/**
 * Handle animations for elements appearing on scroll
 * @param {NodeList} elements
 */
function handleScrollAnimations(elements) {
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.8) {
            el.classList.add("visible");
        } else {
            el.classList.remove("visible");
        }
    });
}
