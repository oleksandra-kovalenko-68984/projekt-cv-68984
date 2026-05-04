document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-link');

    themeBtn.addEventListener('click', () => {
        const current = themeLink.getAttribute('href');
        themeLink.setAttribute('href', current === 'red.css' ? 'green.css' : 'red.css');
    });

    const initAccordion = () => {
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(h => {
            h.onclick = () => {
                const content = h.nextElementSibling;
                const icon = h.querySelector('.chevron-icon');
                content.classList.toggle('active');
                icon.innerText = content.classList.contains('active') ? '▲' : '▼';
            };
        });
    };

    const loadData = async () => {
        try {
            const response = await fetch('data.json');
            const data = await response.json();

            // Render Education
            const eduList = document.getElementById('education-list');
            eduList.innerHTML = data.education.map(item => `
                <div class="card">
                    <h3>${item.school}</h3>
                    <p>${item.degree}</p>
                </div>
            `).join('');

            // Render Skills
            const skillsContainer = document.getElementById('skills-container');
            const front = data.skills.filter(s => s.type === 'frontend');
            const other = data.skills.filter(s => s.type === 'other');

            skillsContainer.innerHTML = `
                <div class="card skill-card">
                    <h3>Frontend</h3>
                    <div class="tags">${front.map(s => `<span class="tag">${s.name}</span>`).join('')}</div>
                </div>
                <div class="card skill-card">
                    <h3>Inne</h3>
                    <div class="tags">${other.map(s => `<span class="tag">${s.name}</span>`).join('')}</div>
                </div>
            `;

            // Render Projects (Zadanie 6)
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = data.projects.map(pro => `
                <div class="card">
                    <h3>${pro.title}</h3>
                    <p>${pro.desc}</p>
                    <div class="tags" style="margin-top:10px;">
                        ${pro.tags.map(tag => `<span class="tag" style="font-size:0.7rem;">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('');

            initAccordion();
        } catch (err) {
            console.error("Data load error:", err);
        }
    };

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const msg = document.getElementById('message');
        const successDisp = document.getElementById('formSuccess');

        document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
        successDisp.innerText = '';

        if (/[0-9]/.test(name.value) || name.value.length < 3) {
            document.getElementById('nameError').innerText = 'Imię nie może mieć cyfr i min. 3 znaki.';
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').innerText = 'Błędny format email.';
            isValid = false;
        }

        if (msg.value.length < 5) {
            document.getElementById('messageError').innerText = 'Wpisz wiadomość.';
            isValid = false;
        }

        if (isValid) {
            successDisp.innerText = 'Wysłano pomyślnie!';
            contactForm.reset();
        }
    });

    loadData();
});