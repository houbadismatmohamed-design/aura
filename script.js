import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const categories = [
    { id: "food", name: "FOOD", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100" },
    { id: "tech", name: "TECH", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100" },
    { id: "bijoux", name: "BIJOUX", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100" },
    { id: "homme", name: "HOMME", img: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=100" }
];

// Afficher les cercles de catégories
function renderCategories() {
    const grid = document.getElementById('category-grid');
    if(!grid) return;
    grid.innerHTML = "";
    categories.forEach(cat => {
        grid.innerHTML += `
            <div onclick="filterByCategory('${cat.id}')" class="flex flex-col items-center cursor-pointer transition-transform active:scale-90">
                <div class="w-14 h-14 rounded-full border-2 border-aura-gold overflow-hidden shadow-md bg-white p-1">
                    <img src="${cat.img}" class="w-full h-full object-cover rounded-full">
                </div>
                <span class="text-[9px] font-black mt-2 tracking-tighter uppercase">${cat.name}</span>
            </div>`;
    });
}

// Filtrer et charger les produits
window.filterByCategory = (catId) => {
    const backBtn = document.getElementById('back-nav');
    const hero = document.getElementById('hero-banner');
    const title = document.getElementById('section-title');
    
    let q = collection(db, "products");
    if(catId) {
        q = query(q, where("cat", "==", catId));
        backBtn.classList.remove('hidden');
        hero.classList.add('hidden');
        title.innerText = "Catégorie : " + catId.toUpperCase();
    } else {
        backBtn.classList.add('hidden');
        hero.classList.remove('hidden');
        title.innerText = "Nouveautés Live";
    }

    onSnapshot(q, (snapshot) => {
        const list = document.getElementById('product-list');
        list.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const p = docSnap.data();
            list.innerHTML += `
                <div class="bg-white rounded-2xl p-3 shadow-xl border-b-4 border-aura-gold relative animate-fadeIn">
                    <button class="absolute top-4 right-4 z-10 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                        <i class="fa-solid fa-heart text-gray-300 transition-colors"></i>
                    </button>
                    <img src="${p.img || 'https://via.placeholder.com/300'}" class="w-full h-36 object-cover rounded-xl mb-3 shadow-inner">
                    <h4 class="text-[11px] font-black truncate uppercase text-slate-800">${p.name}</h4>
                    <div class="flex justify-between items-center mt-1">
                        <p class="font-black text-xs text-blue-900">${p.price} DA</p>
                        <span class="text-[8px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase">${p.cat || 'Divers'}</span>
                    </div>
                    <button class="w-full bg-aura-blue text-aura-gold py-3 rounded-xl font-black uppercase text-[10px] mt-4 shadow-lg active:scale-95 transition-all">Commander</button>
                </div>`;
        });
    });
};

renderCategories();
filterByCategory(null);
