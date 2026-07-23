function initSlider() {
    // Capture slide divs BEFORE appending anything to body
    const slides = Array.from(document.querySelectorAll('body > div'));
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideTimer;

    // --- Create dots container and inject into body ---
    const dotsContainer = document.createElement('nav');
    dotsContainer.className = 'dots-container';

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            showSlide(i);
            startAutoSLide();
        });
        dotsContainer.appendChild(dot);
    });

    document.body.appendChild(dotsContainer);

    // --- Sync dot highlights with current slide ---
    function updateDots() {
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function showSlide(index) {
        currentIndex = ((index % slides.length) + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.style.animation = 'none';
            slide.style.transition = 'opacity 0.5s ease-in-out';
            slide.style.opacity = i === currentIndex ? '1' : '0';
            slide.style.zIndex = i === currentIndex ? '1' : '0';
        });
        updateDots();
    }

    function startAutoSLide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    function stopAutoSLide() {
        clearInterval(autoSlideTimer);
    }

    function addHoverPause() {
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('mouseenter', stopAutoSLide);
                img.addEventListener('mouseleave', startAutoSLide);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            startAutoSLide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            startAutoSLide();
        });
    }

    // Initialize
    showSlide(0);
    startAutoSLide();
    addHoverPause();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}
