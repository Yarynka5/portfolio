// ==================== Ініціалізація теми та мови перед завантаженням сторінки ====================
(function () {
    // Тема
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Мова
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('lang', savedLang);
})();

// ==================== Додаємо клас loaded до body після повної ініціалізації ====================
function initializeApp() {
    const savedLang = localStorage.getItem('language') || 'en';
    updateContent(savedLang);

    const translateBtn = document.querySelector('.translate-btn');
    if (translateBtn) {
        const icons = translateBtn.querySelectorAll('.translate-btn__icon');
        icons[0].classList.toggle('translate-btn__icon--active', savedLang === 'en');
        icons[1].classList.toggle('translate-btn__icon--active', savedLang === 'de');
    }

    document.body.classList.add('loaded');
}

window.addEventListener('load', initializeApp);

// ==================== Темна тема ====================
const btnDarkMode = document.querySelector(".dark-mode-btn");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    btnDarkMode.classList.add('dark-mode-btn--active');
    document.documentElement.classList.add('dark');
}

if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add('dark-mode-btn--active');
    document.documentElement.classList.add('dark');
} else if (localStorage.getItem('darkMode') === 'light') {
    btnDarkMode.classList.remove('dark-mode-btn--active');
    document.documentElement.classList.remove('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    const newColorScheme = event.matches ? 'dark' : 'light';

    if (newColorScheme === 'dark') {
        btnDarkMode.classList.add('dark-mode-btn--active');
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
    } else {
        btnDarkMode.classList.remove('dark-mode-btn--active');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
    }
});

btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle('dark-mode-btn--active');
    const isDark = document.documentElement.classList.toggle('dark');

    if (isDark) {
        localStorage.setItem('darkMode', 'dark');
    } else {
        localStorage.setItem('darkMode', 'light');
    }
};

// ==================== Анімація тексту ====================
const professions = ["Web Designer", "UI/UX Designer", "Frontend Dev"];
const professionElement = document.querySelector('.profession');
const cursorElement = document.querySelector('.cursor');
let currentIndex = 0;
let isDeleting = false;
let text = '';
let delta = 200;

function updateCursorPosition() {
    const textWidth = professionElement.offsetWidth;
    cursorElement.style.left = `${textWidth + 2}px`;
}

function typeWriter() {
    const currentText = professions[currentIndex];

    if (!isDeleting) {
        text = currentText.substring(0, text.length + 1);
    } else {
        text = currentText.substring(0, text.length - 1);
    }

    professionElement.textContent = text || '‎';
    professionElement.classList.toggle('empty', text === '');

    updateCursorPosition();

    let typeSpeed = delta;

    if (!isDeleting && text === currentText) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && text === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % professions.length;
        typeSpeed = 500;
    } else if (isDeleting) {
        typeSpeed = delta / 2;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    const style = window.getComputedStyle(professionElement);
    document.documentElement.style.setProperty('--font-size', style.fontSize);

    if (professionElement) {
        typeWriter();
    }
});

// ==================== Переклади ====================
const translations = {
    en: {
        home: {
            title: "Hi, my name is Yaryna a",
            subtitle: "with passion for learning and creating",
            projects: "Projects",
            about: "About me",
            contacts: "Contacts",
            download: "Download CV",
            profession1: "Web Designer",
            profession2: "UI/UX Designer",
            profession3: "Frontend Dev",
            comingSoon: "Coming Soon",
            comingSoonText: "Exciting projects are currently in development. Stay tuned for updates as I prepare to showcase my latest work!"
        },
        about: {
            title: "Hi There! 👋",
            content: `I am Yaryna Skulska and I am now 19 years old. I have been living in Hamburg, Germany, for three years, but I am originally from Ukraine. I can say that Germany has become a second home for me, where I have the opportunity to grow and find myself. To briefly introduce myself, I love singing, drawing, dancing, and reading. I am proficient with Adobe Photoshop, Adobe Illustrator, and Adobe InDesign. Overall, I love life, enjoy traveling, learning, meeting new people, spending time with family and friends, and am always excited to explore something new. You can learn more about my professional side by downloading my CV from the main page. I think that's all, thank you for stopping by! 😊😉`
        },
        contacts: {
            title: "Find me here",
            location: "Location",
            telegram: "Telegram / WhatsApp",
            email: "Email"
        },
        footer: {
            copyright: "All rights reserved."
        }
    },
    de: {
        home: {
            title: "Yaryna's Portfolio",
            subtitle: "Mit Leidenschaft für Lernen und kreatives Schaffen",
            projects: "Projekte",
            about: "Über mich",
            contacts: "Kontakte",
            download: "Lebenslauf herunterladen",
            profession1: "Web Designer",
            profession2: "UI/UX Designer",
            profession3: "Frontend Dev",
            comingSoon: "Demnächst verfügbar",
            comingSoonText: "Spannende Projekte sind in Entwicklung. Bleiben Sie dran für Updates, während ich meine neuesten Arbeiten vorbereite!"
        },
        about: {
            title: "Halli Hallo! 👋",
            content: `Ich bin Yaryna Skulska und bin jetzt 19 Jahre alt. Seit 3 Jahren lebe ich in Hamburg, Deutschland, aber ursprünglich komme ich aus der Ukraine. Ich kann sagen, dass Deutschland für mich zu einer zweiten Heimat geworden ist, wo ich die Möglichkeit habe, mich weiterzuentwickeln und mich selbst zu finden. Kurz zu mir: Ich singe, zeichne, tanze und lese gerne. Ich bin gut mit Programmen wie Adobe Photoshop, Adobe Illustrator und Adobe InDesign vertraut. Generell liebe ich das Leben, reise gerne, treffe gerne Menschen, verbringe Zeit mit Familie und Freunden und bin immer begeistert, etwas Neues zu lernen. Die offizielle Seite von mir kannst Du erfahren, indem Du meinen Lebenslauf auf der Hauptseite herunterlädst. Ich denke, das war's, danke fürs Vorbeischauen! 😊😉`
        },
        contacts: {
            title: "Finde mich hier",
            location: "Standort",
            telegram: "Telegram / WhatsApp",
            email: "E-Mail"
        },
        footer: {
            copyright: "Alle Rechte vorbehalten."
        }
    }
};

// ==================== Мовний перемикач ====================
const translateBtn = document.querySelector('.translate-btn');
let currentLang = localStorage.getItem('language') || 'en';

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.dataset.i18n;
        const [page, term] = key.split('.');
        if (translations[lang] && translations[lang][page] && translations[lang][page][term]) {
            element.textContent = translations[lang][page][term];
        }
    });

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        professions.length = 0;
        professions.push(
            translations[lang].home.profession1,
            translations[lang].home.profession2,
            translations[lang].home.profession3
        );
    }

    document.documentElement.setAttribute('lang', lang);
}

if (translateBtn) {
    translateBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        localStorage.setItem('language', currentLang);
        updateContent(currentLang);

        const icons = translateBtn.querySelectorAll('.translate-btn__icon');
        icons.forEach(icon => icon.classList.toggle('translate-btn__icon--active'));
    });

    document.addEventListener('DOMContentLoaded', () => {
        updateContent(currentLang);

        const icons = translateBtn.querySelectorAll('.translate-btn__icon');
        icons[0].classList.toggle('translate-btn__icon--active', currentLang === 'en');
        icons[1].classList.toggle('translate-btn__icon--active', currentLang === 'de');
    });
}
