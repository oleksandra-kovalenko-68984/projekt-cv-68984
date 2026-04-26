document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-link');

    themeBtn.addEventListener('click', () => {
        let current = themeLink.getAttribute('href');
        themeLink.setAttribute('href', current === 'red.css' ? 'green.css' : 'red.css');
    });


    const headers = document.querySelectorAll('.section-header');
    headers.forEach(h => {
        h.addEventListener('click', () => {
            const content = h.nextElementSibling;
            content.classList.toggle('active');
            h.querySelector('.chevron-icon').innerText = content.classList.contains('active') ? '▲' : '▼';
        });
    });

    // (Zadanie 5)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const msg = document.getElementById('message');

        // Reset
        document.querySelectorAll('.error-msg').forEach(e => e.innerText = '');

        // Name
        if (/[0-9]/.test(name.value) || name.value.length < 3) {
            document.getElementById('nameError').innerText = 'Imię nie może mieć cyfr i min. 3 znaki.';
            valid = false;
        }

        // Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').innerText = 'Błędny format email.';
            valid = false;
        }

        // Msg
        if (msg.value.length < 5) {
            document.getElementById('messageError').innerText = 'Wpisz wiadomość.';
            valid = false;
        }

        if (valid) {
            document.getElementById('formSuccess').innerText = 'Wysłano pomyślnie!';
            form.reset();
        }
    });
});