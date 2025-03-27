document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded successfully'); // Debug log

    const passwordVerification = document.getElementById('password-verification');
    const ageVerification = document.getElementById('age-verification');
    const backgroundContent = document.querySelector('.background');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');

    // Ensure elements are found
    if (!passwordVerification || !ageVerification || !backgroundContent || !passwordInput || !passwordSubmit || !passwordError) {
        console.error('One or more elements not found:', {
            passwordVerification,
            ageVerification,
            backgroundContent,
            passwordInput,
            passwordSubmit,
            passwordError
        });
        return;
    }

    // Password verification logic
    passwordSubmit.addEventListener('click', function () {
        const enteredPassword = passwordInput.value.trim();
        const correctPassword = '585858';

        if (enteredPassword === correctPassword) {
            passwordVerification.classList.add('hidden');
            ageVerification.classList.remove('hidden');
            console.log('Password correct, showing age verification');
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = ''; // Clear the input
            console.log('Incorrect password entered:', enteredPassword);
        }
    });

    // Allow pressing Enter to submit the password
    passwordInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            passwordSubmit.click();
        }
    });

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