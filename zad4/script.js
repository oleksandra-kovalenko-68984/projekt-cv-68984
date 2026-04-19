// Numer indeksu: 68984

document.addEventListener('DOMContentLoaded', () => {
    // --- ZMIANA MOTYWU ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeLink = document.querySelector('link[rel="stylesheet"]');

    if (themeBtn && themeLink) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = themeLink.getAttribute('href');
            if (currentTheme === 'red.css') {
                themeLink.setAttribute('href', 'green.css');
            } else {
                themeLink.setAttribute('href', 'red.css');
            }
            console.log('Zmieniono motyw - Indeks: 68984');
        });
    }

    // --- ZWIJANIE SEKCJI (ACCORDION) ---
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const chevron = header.querySelector('.chevron-icon');

            if (content) {
                // Sprawdzamy stan wyświetlania
                const isHidden = content.style.display === 'none';
                
                content.style.display = isHidden ? 'block' : 'none';
                
                // Animacja strzałki tylko jeśli istnieje
                if (chevron) {
                    chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
                }
            }
        });
    });
});