document.addEventListener("DOMContentLoaded", function () {
    // === Toggle Mobile Menu ===
    const menuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // === Form Validation ===
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Reset errors & success
            document.querySelectorAll(".error-message").forEach(el => el.classList.add("hidden"));
            document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("input-error"));
            const formSuccess = document.getElementById("formSuccess");
            if (formSuccess) formSuccess.classList.add("hidden");

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            let isValid = true;

            if (name === "") {
                showError("name");
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError("email");
                isValid = false;
            }

            if (subject === "") {
                showError("subject");
                isValid = false;
            }

            if (message.length < 10) {
                showError("message");
                isValid = false;
            }

            if (isValid) {
                if (formSuccess) formSuccess.classList.remove("hidden");
                form.reset();

                setTimeout(() => {
                    formSuccess.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        });
    }

    function showError(fieldId) {
        const input = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + "Error");
        if (input && error) {
            input.classList.add("input-error");
            error.classList.remove("hidden");
        }
    }

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });

                // Tutup menu mobile jika terbuka
                if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                    mobileMenu.classList.add("hidden");
                }
            }
        });
    });
});
