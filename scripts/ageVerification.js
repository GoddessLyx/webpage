document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded successfully');

    const ageVerification = document.getElementById('age-verification');
    const backgroundContent = document.querySelector('.main-content');

    console.log('Elements found:', { ageVerification, backgroundContent });

    if (!ageVerification || !backgroundContent) {
        console.error('One or more elements not found:', {
            ageVerification,
            backgroundContent
        });
        return;
    }

    ageVerification.classList.remove('hidden');
    console.log('Age verification shown');

    document.getElementById('age-yes').addEventListener('click', function () {
        ageVerification.classList.add('hidden');
        backgroundContent.classList.remove('hidden');
        console.log('Age verified (Yes), showing main content');
    });

    document.getElementById('age-no').addEventListener('click', function () {
        alert('You must be 18 or older to access this page.');
        window.location.href = 'https://www.google.com';
        console.log('Age verification failed (No), redirecting');
    });
});