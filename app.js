// Simuler une "base de données" des restaurants
// Simuler une "base de données" des magasins d'informatique
const stores = [
    {
        id: 1,
        name: "Tech Haven",
        category: "Ordinateurs",
        image: "images/deelxps.jpg",
        products: [
            {
                id: 1,
                name: "Laptop Dell XPS 13",
                price: 1299.99,
                image: "images/deelxps.jpg"
            },
            {
                id: 2,
                name: "MacBook Pro 14",
                price: 1999.99,
                image: "images/mac.png"
            },
            {
                id: 3,
                name: "HP Envy 15",
                price: 1099.99,
                image: "images/hpenvy.jpg"
            }
        ]
    },
    {
        id: 2,
        name: "Gamer's Paradise",
        category: "Gaming",
        image: "images/3070.jpg",
        products: [
            {
                id: 4,
                name: "Carte graphique NVIDIA RTX 3070",
                price: 599.99,
                image: "images/3070.jpg"
            },
            {
                id: 5,
                name: "Clavier mécanique Razer",
                price: 99.99,
                image: "images/clavier.avif"
            },
            {
                id: 6,
                name: "Casque gamer HyperX",
                price: 89.99,
                image: "images/casque.jpeg"
            }
        ]
    },
    {
        id: 3,
        name: "Build It Yourself",
        category: "Composants",
        image: "images/cartemere.jpg",
        products: [
            {
                id: 7,
                name: "Processeur AMD Ryzen 5 5600X",
                price: 299.99,
                image: "images/AMD-Ryzen-5.jpg"
            },
            {
                id: 8,
                name: "Carte mère ASUS ROG Strix",
                price: 249.99,
                image: "images/cartemere.jpg"
            },
            {
                id: 9,
                name: "Ventilateur Noctua NH-D15",
                price: 89.99,
                image: "images/ventilo.jpg"
            }
        ]
    },
    {
        id: 4,
        name: "Peripheral City",
        category: "Périphériques",
        image: "images/lg.jpg",
        products: [
            {
                id: 10,
                name: "Écran LG 27UL850-W",
                price: 449.99,
                image: "images/lg.jpg"
            },
            {
                id: 11,
                name: "Souris Logitech MX Master 3",
                price: 99.99,
                image: "images/sourislogitech.jpg"
            },
            {
                id: 12,
                name: "Webcam Logitech StreamCam",
                price: 149.99,
                image: "images/webcam.jpg"
            }
        ]
    },
    {
        id: 5,
        name: "Storage Solutions",
        category: "Stockage",
        image: "images/hdd.jpeg",
        products: [
            {
                id: 13,
                name: "Disque SSD Samsung 970 EVO Plus 1TB",
                price: 129.99,
                image: "images/ssd.jpg"
            },
            {
                id: 14,
                name: "Disque dur externe WD 4TB",
                price: 109.99,
                image: "images/hdd.jpeg"
            },
            {
                id: 15,
                name: "NAS Synology DS220+",
                price: 329.99,
                image: "images/nas.jpg"
            }
        ]
    },
    {
        id: 6,
        name: "Printer Pro",
        category: "Impression",
        image: "images/imprimante_canon.jpg",
        products: [
            {
                id: 16,
                name: "Imprimante Canon PIXMA G6050",
                price: 249.99,
                image: "images/imprimante_canon.jpg"
            },
            {
                id: 17,
                name: "Toner HP 410A",
                price: 79.99,
                image: "images/encre.avif"
            },
            {
                id: 18,
                name: "Papier photo Epson",
                price: 19.99,
                image: "images/papier.jpeg"
            }
        ]
    }
];



// Initialiser le panier
function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Ajouter un article au panier
function addToCart(itemId, itemName, itemPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id: itemId, name: itemName, price: itemPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} a été ajouté au panier.`);
}

// Afficher les articles du panier
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <p>${item.name} - ${item.price.toFixed(2)}€</p>
            <button onclick="removeFromCart(${index})">Supprimer</button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });

    totalPrice.innerText = `Total : ${total.toFixed(2)}€`;
}

// Supprimer un article du panier
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Supprimer l'article par index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Réafficher le panier
}

// Simuler le passage de commande
function checkout() {
    alert("Commande passée avec succès !");
    localStorage.setItem('cart', JSON.stringify([])); // Vider le panier
    displayCart(); // Mettre à jour l'affichage
}


// Navigation responsive
function toggleNavbar() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
}

// Vérifier si localStorage est disponible
function isLocalStorageAvailable() {
    try {
        const testKey = "__test__";
        localStorage.setItem(testKey, "test");
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.warn("localStorage est désactivé ou inaccessible.");
        return false;
    }
}

// Enregistrer un nouvel utilisateur
function registerUser(event) {
    event.preventDefault();
    if (!isLocalStorageAvailable()) return;

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("Un compte avec cet email existe déjà.");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Compte créé avec succès !");
    window.location.href = "connexion.html";
}

// Connexion d'un utilisateur
function loginUser(event) {
    event.preventDefault();
    if (!isLocalStorageAvailable()) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Email ou mot de passe incorrect.");
        return;
    }

    alert(`Bienvenue, ${user.username} !`);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = "index.html";
}

// Déconnexion
function logoutUser() {
    if (!isLocalStorageAvailable()) return;
    localStorage.removeItem('loggedInUser');
    alert("Vous êtes déconnecté.");
    window.location.href = "login.html";
}

// click&collect callendrier
const monthYearElement = document.getElementById('month-year');
const calendarBody = document.getElementById('calendar-body');
const prevMonthButton = document.getElementById('prev-month-btn');
const nextMonthButton = document.getElementById('next-month-btn');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
function generateCalendar(month, year) {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    monthYearElement.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const todayDate = new Date();
    const maxDate = new Date(todayDate);
    maxDate.setDate(todayDate.getDate() + 15);

    calendarBody.innerHTML = "";
    let selectedCell = null; // Stocker le jour sélectionné
    let date = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) {
                cell.textContent = ""; // Case vide avant le début du mois
            } else if (date > daysInMonth) {
                break; // Arrêter si le jour dépasse le nombre de jours dans le mois
            } else {
                const cellDate = new Date(year, month, date);

                if (cellDate < todayDate || cellDate > maxDate) {
                    cell.textContent = date;
                    cell.classList.add("disabled"); // Ajouter une classe pour les jours désactivés
                } else {
                    cell.textContent = date;
                    cell.classList.add("selectable"); // Ajouter une classe pour les jours cliquables
                    cell.addEventListener('click', () => {
                        if (selectedCell) {
                            selectedCell.classList.remove("selected"); // Désélectionner le jour précédent
                        }
                        selectedCell = cell;
                        cell.classList.add("selected"); // Sélectionner le jour actuel
                    });
                }

                date++; // Incrémenter la date uniquement après avoir généré une cellule valide
            }

            row.appendChild(cell);
        }
        calendarBody.appendChild(row);

        // Arrêter la génération des lignes si tous les jours ont été affichés
        if (date > daysInMonth) break;
    }
}




prevMonthButton.addEventListener('click', () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        alert("Vous ne pouvez pas revenir en arrière !");
        return;
    }
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', () => {
    const todayDate = new Date();
    const maxAllowedDate = new Date(todayDate);
    maxAllowedDate.setDate(todayDate.getDate() + 15);

    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    if (nextMonth > maxAllowedDate) {
        alert("Vous ne pouvez pas dépasser la limite de 15 jours !");
    } else {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    }
});

generateCalendar(currentMonth, currentYear);


function toggleMenu() {
    const navBar = document.querySelector('.nav-bar ul');
    navBar.classList.toggle('active');
}
