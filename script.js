import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Cette fonction affiche tes produits Firebase dans le design d'hier
onSnapshot(collection(db, "products"), (snapshot) => {
    const list = document.getElementById('product-list');
    list.innerHTML = ""; // Vide la liste avant de remplir
    
    snapshot.forEach((doc) => {
        const p = doc.data();
        // On utilise ici exactement le même HTML que dans ton index.html d'hier
        list.innerHTML += `
            <div class="bg-white rounded-xl p-3 shadow-md border-b-2 border-aura-gold relative">
                <button class="absolute top-4 right-4 z-10 bg-white/80 rounded-full w-7 h-7 flex items-center justify-center shadow">
                    <i class="fa-solid fa-heart text-gray-300"></i>
                </button>
                <img src="${p.img || 'https://via.placeholder.com/150'}" class="w-full h-32 object-cover rounded-lg mb-2">
                <h4 class="text-[11px] font-bold truncate uppercase">${p.name}</h4>
                <p class="font-black text-xs text-aura-blue">${p.price} DA</p>
                <p class="text-[9px] text-aura-gold font-bold mt-1 underline">
                    <i class="fa-solid fa-store"></i> Boutique AURA
                </p>
            </div>`;
    });
});
