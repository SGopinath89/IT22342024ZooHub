const API_URL = 'http://localhost:5000/api';

// Show and hide sections
function showRegister() {
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('animals').classList.add('hidden');
    document.getElementById('addAnimal').classList.add('hidden');
    document.getElementById('contactUs').classList.add('hidden');
}

function showLogin() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('animals').classList.add('hidden');
    document.getElementById('addAnimal').classList.add('hidden');
    document.getElementById('contactUs').classList.add('hidden');
}

function showAnimals() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('animals').classList.remove('hidden');
    document.getElementById('addAnimal').classList.add('hidden');
    document.getElementById('contactUs').classList.add('hidden');
    fetchAnimals();
}

function showAddAnimal() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('animals').classList.add('hidden');
    document.getElementById('addAnimal').classList.remove('hidden');
    document.getElementById('contactUs').classList.add('hidden');
}

function showContactUs() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('animals').classList.add('hidden');
    document.getElementById('addAnimal').classList.add('hidden');
    document.getElementById('contactUs').classList.remove('hidden');
}

// Fetch animals
function fetchAnimals() {
    fetch(`${API_URL}/animals`)
        .then(response => response.json())
        .then(data => {
            const animalList = document.getElementById('animalList');
            animalList.innerHTML = '';
            data.forEach(animal => {
                const animalElement = document.createElement('div');
                animalElement.textContent = `${animal.name} - ${animal.species} - ${animal.health}`;
                animalList.appendChild(animalElement);
            });
        })
        .catch(error => console.error('Error fetching animals:', error));
}

// Handle form submissions
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registration successful:', data);
        showLogin();
    })
    .catch(error => console.error('Error registering:', error));
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login successful:', data);
        showAnimals();
    })
    .catch(error => console.error('Error logging in:', error));
});

document.getElementById('addAnimalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const animalName = document.getElementById('animalName').value;
    const animalSpecies = document.getElementById('animalSpecies').value;
    const animalHealth = document.getElementById('animalHealth').value;
    const animalFeedingSchedule = document.getElementById('animalFeedingSchedule').value;

    fetch(`${API_URL}/animals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: animalName,
            species: animalSpecies,
            health: animalHealth,
            feedingSchedule: animalFeedingSchedule
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Animal added successfully:', data);
        showAnimals();
    })
    .catch(error => console.error('Error adding animal:', error));
});

document.getElementById('contactUsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactMessage = document.getElementById('contactMessage').value;

    fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent successfully:', data);
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    })
    .catch(error => console.error('Error sending message:', error));
});

function logout() {
    console.log('Logout successful');
    showLogin();
}
