document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('#cursor-tracker');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Mobile menu toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('#navbar');
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const isActive = navbar.classList.contains('active');
        menuIcon.setAttribute('aria-expanded', isActive);
        if (isActive) {
            menuIcon.innerHTML = '&times;';
        } else {
            menuIcon.innerHTML = '&#9776;';
        }
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.setAttribute('aria-expanded', false);
                menuIcon.innerHTML = '&#9776;';
            }
        });
    });

    // Sticky header with scrolled class
    const header = document.querySelector('#main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate progress bars when skills section is in view
    const skillSection = document.querySelector('#skills');
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach(item => {
                    item.querySelector('.progress-bar-fill').classList.add('animate-progress');
                });
                observer.unobserve(skillSection);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(skillSection);

    // Contact form validation
    const form = document.getElementById('contact-form');
    if (form) {
        const fields = [
            { id: 'name', error: 'Name is required and must be at least 3 characters.', minLength: 3 },
            { id: 'email', error: 'Valid email is required.' },
            { id: 'subject', error: 'Subject is required.' },
            { id: 'message', error: 'Message is required and must be at least 10 characters.', minLength: 10 }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorSpan = input.nextElementSibling;

            input.addEventListener('input', () => {
                validateField(input, errorSpan, field);
            });
        });

        form.addEventListener('submit', (e) => {
            let isValid = true;
            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const errorSpan = input.nextElementSibling;
                if (!validateField(input, errorSpan, field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            } else {
                e.preventDefault(); // Prevent actual submit for demo; replace with real submission logic
                alert('Form submitted successfully!');
                form.reset(); // Optional: reset form after submit
            }
        });
    }

    function validateField(input, errorSpan, field) {
        let valid = true;
        if (input.value.trim() === '') {
            valid = false;
        } else if (field.minLength && input.value.length < field.minLength) {
            valid = false;
        } else if (input.type === 'email' && !input.checkValidity()) {
            valid = false;
        }

        if (!valid) {
            errorSpan.textContent = field.error;
            errorSpan.classList.remove('hidden');
            input.classList.add('border-red-500');
        } else {
            errorSpan.classList.add('hidden');
            input.classList.remove('border-red-500');
        }

        return valid;
    }
});