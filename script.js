// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
    // Get references to burger menu and navigation elements
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    // Toggle mobile menu when burger icon is clicked
    burger.addEventListener("click", () => {
        navLinks.classList.toggle("visible");
    });

    // Handle reservation form submission
    document.querySelector(".reservation-form").addEventListener("submit", function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get form field values
        const name = document.querySelector("input[name='name']").value;
        const email = document.querySelector("input[name='email']").value;
        const date = document.querySelector("input[name='date']").value;
        const time = document.querySelector("input[name='time']").value;
        const people = document.querySelector("input[name='people']").value;

        // Submit form data to external service
        fetch("https://formsubmit.co/ajax/rawgoshshrestha129@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, date, time, people })
        })
        .then(response => alert("Reservation submitted successfully!"))
        .catch(() => alert("There was an error submitting your reservation."));
    });

    // Handle language translation
    const translateButton = document.getElementById("translate-btn");
    let currentLanguage = 'en'; // Track current language

    translateButton.addEventListener("click", () => {
        // Find all elements that need translation
        const elementsToTranslate = document.querySelectorAll("[data-translate]");
        
        // Define form placeholders that need translation
        const placeholdersToTranslate = [
            { selector: "input[name='name']", en: "Your Name", fr: "Votre Nom" },
            { selector: "input[name='email']", en: "Your Email", fr: "Votre Email" },
            { selector: "input[name='people']", en: "Number of People", fr: "Nombre de Personnes" }
        ];

        // Toggle language
        currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';

        // Translate all text content
        elementsToTranslate.forEach(el => {
            el.innerText = currentLanguage === 'fr' ? el.dataset.fr : el.dataset.en;
        });

        // Translate form placeholders
        placeholdersToTranslate.forEach(field => {
            const input = document.querySelector(field.selector);
            if (input) input.setAttribute("placeholder", currentLanguage === 'fr' ? field.fr : field.en);
        });

        // Update button text
        translateButton.innerText = currentLanguage === 'fr' ? "Français" : "English";
    });
});