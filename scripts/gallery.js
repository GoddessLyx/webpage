document.addEventListener('DOMContentLoaded', () => {
    const galleryRandom = document.querySelector('.gallery-random');
    const items = document.querySelectorAll('.random-item');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Function to update the active item based on scroll position
    const updateActiveItem = () => {
        const scrollTop = galleryRandom.scrollTop;
        const windowHeight = galleryRandom.offsetHeight;

        items.forEach((item, index) => {
            const itemTop = index * windowHeight;
            const itemBottom = itemTop + windowHeight;

            if (scrollTop >= itemTop - windowHeight / 2 && scrollTop < itemBottom - windowHeight / 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // Initial call to set the first item as active
    updateActiveItem();

    // Update active item on scroll
    galleryRandom.addEventListener('scroll', () => {
        updateActiveItem();
        // Hide scroll indicator after scrolling starts
        if (scrollIndicator) {
            scrollIndicator.style.display = 'none';
        }
    });

    // Optional: Smooth scroll when clicking/tapping to next item
    galleryRandom.addEventListener('click', (e) => {
        const currentScroll = galleryRandom.scrollTop;
        const windowHeight = galleryRandom.offsetHeight;
        const nextScroll = Math.ceil(currentScroll / windowHeight) * windowHeight + windowHeight;

        galleryRandom.scrollTo({
            top: nextScroll,
            behavior: 'smooth'
        });
    });

    // Hide scroll indicator after 5 seconds if no scroll happens
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.display = 'none';
        }, 5000);
    }
});