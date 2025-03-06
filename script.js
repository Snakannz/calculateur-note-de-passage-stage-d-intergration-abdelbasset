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

// API key for Giphy
const GIPHY_API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"; // This is Giphy's public beta key

// Function to fetch a random appropriate GIF
async function fetchGif(isPassing) {
    const searchTerm = isPassing ? "celebration" : "sad";
    const rating = "g"; // G-rated content only

    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${searchTerm}&rating=${rating}`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.data.images.fixed_height.url;
    } catch (error) {
        console.error("Error fetching GIF:", error);
        // Fallback images if API fails
        return isPassing
            ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXU4ZHlyY3hvN3k1OTc3bDZ3bTFjcm11ejZ0YjE5NndmNWZvM3RvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif"
            : "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGh5MmY3cTBqamx6anhvZWUxNmpqbmZtYnJwNGdyNDd3amtidDU5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob5qwFkSJ7G/giphy.gif";
    }
}

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
    const isPassing = finalGrade >= 50;

    if (isPassing) {
        passingStatus.textContent = 'Vous avez atteint la note de passage! 👍';
        passingStatus.className = 'passing-status pass';
    } else {
        passingStatus.textContent = `Il vous manque ${(50 - finalGrade).toFixed(1)}% pour passer`;
        passingStatus.className = 'passing-status fail';
    }

    // Update the GIF based on pass/fail status
    updateResultGif(isPassing);
}

// Function to update the GIF
async function updateResultGif(isPassing) {
    const resultGif = document.getElementById('resultGif');
    resultGif.src = await fetchGif(isPassing);
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

// Calculer la note initiale et charger le thème
document.addEventListener('DOMContentLoaded', function() {
    calculateTotalGrade();
    loadThemePreference();
});