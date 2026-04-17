import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Ta config Firebase (Ne pas toucher)
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

// Cette fonction va lire tes produits Firebase en temps réel
function listenToFirebaseProducts() {
    const q = query(collection(db, "products"));
    onSnapshot(q, (snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        renderProducts(products); // On envoie les vrais produits à l'affichage
    });
}

// Ta fonction d'affichage (modifiée pour Firebase)
window.renderProducts = (products) => {
    const list = document.getElementById('product-list');
    if (!list) return;
    list.innerHTML = "";
    products.forEach(p => {
        list.innerHTML += `
            <div class="bg-white rounded-xl p-3 shadow-md border-b-2 border-aura-gold">
                <img src="${p.img || 'https://via.placeholder.com/150'}" class="w-full h-32 object-cover rounded-lg mb-2">
                <h4 class="text-[11px] font-bold truncate uppercase">${p.name}</h4>
                <p class="font-black text-xs text-aura-blue">${p.price} DA</p>
                <p class="text-[9px] text-aura-gold font-bold mt-1 uppercase"><i class="fa-solid fa-store mr-1"></i> Boutique</p>
            </div>`;
    });
};

// Lancer la lecture au démarrage
listenToFirebaseProducts();
