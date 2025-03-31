document.addEventListener('DOMContentLoaded', () => {
    const galleryRandom = document.querySelector('.gallery-random');
    const items = document.querySelectorAll('.random-item');
    let currentIndex = 0;
    let isPaused = false;
    let timeout;

    // Function to get random position within the container
    const getRandomPosition = () => {
        const containerWidth = galleryRandom.offsetWidth;
        const containerHeight = galleryRandom.offsetHeight;

        // Dynamically get the width of the item (80vw)
        const itemWidth = containerWidth * 0.8; // 80% of container width
        const item = items[currentIndex];
        const img = item.querySelector('img');
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const itemHeight = itemWidth / aspectRatio; // Calculate height based on aspect ratio

        const maxX = containerWidth - itemWidth;
        const maxY = containerHeight - itemHeight;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        return { x, y, itemWidth, itemHeight };
    };

    // Function to show the next image with random movement
    const showNextImage = () => {
        if (isPaused) return;

        // Hide the current image
        if (currentIndex >= 0) {
            items[currentIndex].classList.remove('active');
        }

        // Move to the next image
        currentIndex = (currentIndex + 1) % items.length;

        // Show the new image with random position
        const { x, y } = getRandomPosition();
        const item = items[currentIndex];
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.classList.add('active');

        // Schedule the next image
        timeout = setTimeout(showNextImage, 3000); // Change image every 3 seconds
    };

    // Start the animation
    showNextImage();

    // Pause on user interaction
    galleryRandom.addEventListener('touchstart', () => {
        isPaused = true;
        clearTimeout(timeout);
    });

    galleryRandom.addEventListener('click', () => {
        isPaused = true;
        clearTimeout(timeout);
    });

    // Resume after 5 seconds of inactivity
    galleryRandom.addEventListener('touchend', () => {
        setTimeout(() => {
            isPaused = false;
            showNextImage();
        }, 5000); // Resume after 5 seconds
    });

    galleryRandom.addEventListener('click', () => {
        setTimeout(() => {
            isPaused = false;
            showNextImage();
        }, 5000); // Resume after 5 seconds
    });
});