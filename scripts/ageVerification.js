document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded successfully'); // Debug log

    const ageVerification = document.getElementById('age-verification');
    const backgroundContent = document.querySelector('.background');

    // Ensure elements are found
    if (!ageVerification || !backgroundContent) {
        console.error('One or more elements not found:', {
            ageVerification,
            backgroundContent
        });
        return;
    }

    // Show age verification by default (remove 'hidden' class if needed)
    ageVerification.classList.remove('hidden');

    // Age verification logic
    document.getElementById('age-yes').addEventListener('click', function () {
        ageVerification.classList.add('hidden');
        backgroundContent.classList.remove('hidden');
        console.log('Age verified (Yes), showing main content');
    });

    document.getElementById('age-no').addEventListener('click', function () {
        alert('You must be 18 or older to access this page.');
        window.location.href = 'https://www.google.com'; // Redirect to another page
        console.log('Age verification failed (No), redirecting');
    });
});