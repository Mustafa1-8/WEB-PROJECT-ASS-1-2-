// ARY Plus - Contact Form DOM Controller

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("userEmail");
    const msgInput = document.getElementById("userMsg");
    const charLeft = document.getElementById("charLeft");
    const statusMessage = document.getElementById("statusMessage");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const msgError = document.getElementById("msgError");

    // 1. Live Character Counter for Textarea
    msgInput.addEventListener("input", function () {
        const remaining = 300 - msgInput.value.length;
        charLeft.textContent = remaining;
        if (remaining < 20) {
            charLeft.style.color = "#ff4d4d";
        } else {
            charLeft.style.color = "#818190";
        }
    });

    // 2. Real-time Form Validation & Submission
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload

        let isValid = true;

        // Clear previous errors
        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";

        // Validate Full Name (Min 3 characters)
        if (fullNameInput.value.trim().length < 3) {
            nameError.textContent = "Please enter your name (at least 3 letters).";
            fullNameInput.style.borderColor = "#ff4d4d";
            isValid = false;
        } else {
            fullNameInput.style.borderColor = "#27ae60";
        }

        // Validate Email using Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Please provide a valid email address.";
            emailInput.style.borderColor = "#ff4d4d";
            isValid = false;
        } else {
            emailInput.style.borderColor = "#27ae60";
        }

        // Validate Message (Min 10 characters)
        if (msgInput.value.trim().length < 10) {
            msgError.textContent = "Message must be at least 10 characters long.";
            msgInput.style.borderColor = "#ff4d4d";
            isValid = false;
        } else {
            msgInput.style.borderColor = "#27ae60";
        }

        // 3. Dynamic DOM Feedback Banner
        if (isValid) {
            const userName = fullNameInput.value.trim();

            statusMessage.className = "status-banner success";
            statusMessage.style.display = "block";
            statusMessage.innerHTML = `<strong>Thank you, ${userName}!</strong> Your message has been received by the ARY Plus support desk. We will respond within 24 hours.`;

            // Reset form
            contactForm.reset();
            charLeft.textContent = "300";

            // Reset input border styles
            fullNameInput.style.borderColor = "#333342";
            emailInput.style.borderColor = "#333342";
            msgInput.style.borderColor = "#333342";

            // Auto-hide success message after 7 seconds
            setTimeout(function () {
                statusMessage.style.display = "none";
            }, 7000);
        }
    });
});