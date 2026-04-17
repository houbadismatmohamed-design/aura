import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Ta config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAfhk8w5rp8ZI-nJ0cr-T7cEC9om_NfZYg",
    authDomain: "aura-marketplace-dz.firebaseapp.com",
    projectId: "aura-marketplace-dz",
    storageBucket: "aura-marketplace-dz.firebasestorage.app",
    messagingSenderId: "182190931936",
    appId: "1:182190931936:web:b0bdd66d819547be8d7585"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Liste des catégories avec images
const categories = [
    { id: "food", name: "FOOD", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100" },
    { id: "tech", name: "TECH", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100" },
    { id: "bijoux", name: "BIJOUX", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100" },
    { id: "homme", name: "HOMME", img: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=100" },
    { id: "femme", name: "FEMME", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100" }
];

// 1. Afficher les catégories au démarrage
function renderCategories() {
    const grid = document.getElementById('category-grid');
    if(!grid) return;
    grid.innerHTML = "";
    categories.forEach(cat => {
        grid.innerHTML += `
            <div onclick="filterByCategory('${cat.id}')" class="flex flex-col items-center cursor-pointer">
                <div class="w-14 h-14 rounded-full border-2 border-aura-gold overflow-hidden shadow-md bg-white">
                    <img src="${cat.img}" class="w-full h-full object-cover">
                </div>
                <span class="text-[9px] font-bold mt-2">${cat.name}</span>
            </div>`;
    });
}

// 2. Lire les produits Firebase (Tous ou par catégorie)
window.filterByCategory = (catId) => {
    const q = catId ? query(collection(db, "products"), where("cat", "==", catId)) : query(collection(db, "products"));
    
    onSnapshot(q, (snapshot) => {
        const list = document.getElementById('product-list');
        list.innerHTML = "";
        
        if (snapshot.empty) {
            list.innerHTML = "<p class='col-span-2 text-center text-gray-400 py-10 text-xs'>Aucun produit dans cette catégorie.</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const p = doc.data();
            list.innerHTML += `
                <div class="bg-white rounded-xl p-3 shadow-md border-b-2 border-aura-gold transition-all active:scale-95">
                    <img src="${p.img || 'https://via.placeholder.com/150'}" class="w-full h-32 object-cover rounded-lg mb-2">
                    <h4 class="text-[11px] font-bold truncate uppercase">${p.name}</h4>
                    <p class="font-black text-xs text-blue-900">${p.price} DA</p>
                    <button class="w-full bg-blue-900 text-yellow-500 text-[10px] py-2 mt-2 rounded-lg font-bold uppercase">Détails</button>
                </div>`;
        });
    });
};

// Lancement
renderCategories();
filterByCategory(null); // Affiche tout au début
