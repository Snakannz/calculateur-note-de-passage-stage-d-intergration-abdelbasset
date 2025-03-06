// Définition des poids et des notes
const grades = {
    travail1: { value: 11.5, max: 20, weight: 0.20 },
    travail2: { value: 7, max: 15, weight: 0.15 },
    travail4: { value: 8, max: 20, weight: 0.20 },
    journal: { value: 7, max: 10, weight: 0.10 },
    bradley: { value: 80, max: 100, weight: 0.25 },
    travail3: { value: 65, max: 100, weight: 0.10 }
};

// Éléments DOM
const bradleySlider = document.getElementById('bradley-grade');
const travail3Slider = document.getElementById('travail3-grade');
const bradleyValue = document.getElementById('bradley-value');
const travail3Value = document.getElementById('travail3-value');
const totalGradeDisplay = document.getElementById('total-grade');
const passingStatus = document.getElementById('passing-status');

// Fonction pour calculer la note finale
function calculateTotalGrade() {
    // Mettre à jour les valeurs des variables
    grades.bradley.value = parseInt(bradleySlider.value);
    grades.travail3.value = parseInt(travail3Slider.value);

    // Calculer les pourcentages pour chaque travail
    const travail1Percent = (grades.travail1.value / grades.travail1.max) * 100;
    const travail2Percent = (grades.travail2.value / grades.travail2.max) * 100;
    const travail4Percent = (grades.travail4.value / grades.travail4.max) * 100;
    const journalPercent = (grades.journal.value / grades.journal.max) * 100;

    // Calculer la note finale
    const finalGrade =
        (travail1Percent * grades.travail1.weight) +
        (travail2Percent * grades.travail2.weight) +
        (travail4Percent * grades.travail4.weight) +
        (journalPercent * grades.journal.weight) +
        (grades.bradley.value * grades.bradley.weight) +
        (grades.travail3.value * grades.travail3.weight);

    // Mettre à jour les affichages
    totalGradeDisplay.textContent = `Note Finale: ${finalGrade.toFixed(1)}%`;

    // Vérifier si la note de passage est atteinte
    if (finalGrade >= 50) {
        passingStatus.textContent = 'Vous avez atteint la note de passage! 👍';
        passingStatus.className = 'passing-status pass';
    } else {
        passingStatus.textContent = `Il vous manque ${(50 - finalGrade).toFixed(1)}% pour passer`;
        passingStatus.className = 'passing-status fail';
    }
}

// Événements pour les sliders
bradleySlider.addEventListener('input', function() {
    bradleyValue.textContent = this.value + '%';
    calculateTotalGrade();
});

travail3Slider.addEventListener('input', function() {
    travail3Value.textContent = this.value + '%';
    calculateTotalGrade();
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved theme preference or use preferred color scheme
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme !== null) {
        // If we have a saved preference, use it
        if (savedTheme === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    } else {
        // If no saved preference, use system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    }
}

// Toggle dark mode
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});

// Calculer la note initiale
document.addEventListener('DOMContentLoaded', function() {
    calculateTotalGrade();
    loadThemePreference();
});