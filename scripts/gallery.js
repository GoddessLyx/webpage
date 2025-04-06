document.addEventListener('DOMContentLoaded', () => {
    const imageNumbers = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
    const descriptions = [
        "At my feet, this is where you should be",
        "Come on, clean my feet, dirty dog",
        "Worship the ground I walk on",
        "Kneel before your goddess",
        "My soles, your paradise",
        "Bow down and kiss my feet",
        "Serve your queen, little pet",
        "My feet, your ultimate desire",
        "Crawl to me, unworthy one",
        "Feel the power of my soles",
        "You exist to serve my feet",
        "Lick the dirt off, slave",
        "My feet own your soul",
        "Beg for a taste, pathetic worm",
        "Surrender to my divine soles",
        "You’re nothing beneath my feet",
        "Obey and worship, loyal dog",
        "My feet are your altar",
        "Kneel and adore, my servant",
        "Taste the divine, you filth",
        "My soles, your only purpose",
        "Submit to my perfection",
        "You live for my feet",
        "Clean them with your tongue",
        "My feet, your eternal devotion",
        "Bow and serve, my toy",
        "Worship every inch of my soles",
        "You’re mine to step on",
        "Feel my power, weakling",
        "My feet, your obsession",
        "Serve me on your knees",
        "My soles, your destiny",
        "Beg to touch, you dog",
        "Forever beneath my feet"
    ];

    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    let currentIndex = 0;

    // Populate the carousel with images and descriptions
    imageNumbers.forEach((num, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="../images/${num}.png" alt="Image ${num}">
            <div class="description">${descriptions[index]}</div>
        `;
        carousel.appendChild(item);

        // Create a dot for each image
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');

    // Update carousel position and active dot
    function updateCarousel() {
        const offset = -currentIndex * 100; // Move by 100% of the container width
        carousel.style.transform = `translateX(${offset}%)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update arrows visibility
        leftArrow.style.display = currentIndex === 0 ? 'none' : 'flex';
        rightArrow.style.display = currentIndex === items.length - 1 ? 'none' : 'flex';
    }

    // Arrow navigation
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance to trigger navigation
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left (next)
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right (previous)
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Initial update
    updateCarousel();
});