document.addEventListener('DOMContentLoaded', () => {
    //  Supabase (Zadanie 8)
    const SUPABASE_URL = 'https://nzwlahrndcbvozininmk.supabase.co/rest/v1/messages';
    const SUPABASE_KEY = 'sb_publishable_cw6o2kxGiUokrb0Q_QrAUQ_SXGRLgAs';

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
                if (content) {
                    content.classList.toggle('active');
                    if (icon) icon.innerText = content.classList.contains('active') ? '▲' : '▼';
                }
            };
        });
    };

    const loadData = async () => {
        try {
            const response = await fetch('data.json');
            const data = await response.json();

            const eduList = document.getElementById('education-list');
            eduList.innerHTML = data.education.map(item => `
                <div class="card">
                    <h3>${item.school}</h3>
                    <p>${item.degree}</p>
                </div>
            `).join('');

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
            initAccordion();
        }
    };

    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');
    let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

    const renderNotes = () => {
        notesList.innerHTML = notes.map((note, index) => `
            <div class="note-item">
                <span>${note}</span>
                <button class="delete-note" onclick="deleteNote(${index})">Usuń</button>
            </div>
        `).join('');
        localStorage.setItem('myNotes', JSON.stringify(notes));
    };

    if (addNoteBtn) {
        addNoteBtn.onclick = () => {
            if (noteInput.value.trim() !== "") {
                notes.push(noteInput.value.trim());
                noteInput.value = "";
                renderNotes();
            }
        };
    }

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        renderNotes();
    };

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => { // Додано async для роботи з fetch
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
                successDisp.innerText = 'Wysyłanie danych do bazy...';
                
                try {
                    // Zadanie 8 - Wysyłanie danych metodą POST
                    const response = await fetch(SUPABASE_URL, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify({
                            name: name.value,
                            email: email.value,
                            message: msg.value
                        })
                    });

                    if (response.ok) {
                        successDisp.style.color = '#4CAF50';
                        successDisp.innerText = 'Wysłano pomyślnie i zapisano w bazie danych!';
                        contactForm.reset();
                    } else {
                        throw new Error('Błąd serwera');
                    }
                } catch (err) {
                    successDisp.style.color = '#ff8a80';
                    successDisp.innerText = 'Błąd połączenia z bazą danych.';
                    console.error("Backend error:", err);
                }
            }
        });
    }

    loadData();
    renderNotes();
});