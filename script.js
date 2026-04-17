import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
let cart = [];

// 1. Charger les produits en direct
onSnapshot(collection(db, "products"), (snap) => {
    const list = document.getElementById('product-list');
    list.innerHTML = "";
    snap.forEach(d => {
        const p = d.data();
        list.innerHTML += `
            <div class="bg-white p-3 rounded-2xl shadow-sm border-b-2 border-aura-gold" onclick="window.showDetails('${d.id}')">
                <img src="${p.img || 'https://via.placeholder.com/150'}" class="w-full h-32 object-cover rounded-xl mb-2">
                <h4 class="text-[10px] font-black uppercase truncate">${p.name}</h4>
                <p class="text-xs font-bold text-blue-900">${p.price} DA</p>
            </div>`;
    });
});

// 2. Afficher les détails quand on clique
window.showDetails = async (id) => {
    const d = await getDoc(doc(db, "products", id));
    const p = d.data();
    document.getElementById('modal-content').innerHTML = `
        <img src="${p.img || 'https://via.placeholder.com/400'}" class="w-full h-64 object-cover">
        <div class="p-6">
            <h2 class="text-xl font-black uppercase">${p.name}</h2>
            <p class="text-aura-gold font-bold text-2xl">${p.price} DA</p>
            <p class="text-gray-400 text-xs mt-2 italic">Vendu par AURA Official</p>
            <button onclick="window.addToCart('${id}', '${p.name}', ${p.price})" class="w-full bg-aura-blue text-aura-gold py-4 rounded-xl font-black mt-6 shadow-xl uppercase">Ajouter au Panier</button>
        </div>`;
    document.getElementById('product-modal').classList.remove('hidden');
};

// 3. Gestion du panier
window.addToCart = (id, name, price) => {
    cart.push({id, name, price});
    updateUI();
    document.getElementById('product-modal').classList.add('hidden');
};

function updateUI() {
    const count = document.getElementById('cart-count');
    count.innerText = cart.length;
    count.classList.toggle('hidden', cart.length === 0);
    
    const container = document.getElementById('cart-items');
    container.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        container.innerHTML += `<div class="flex justify-between text-sm font-bold border-b pb-2"><span>${item.name}</span><span>${item.price} DA</span></div>`;
    });
    document.getElementById('cart-total').innerText = total + " DA";
}

// 4. Envoyer la commande au vendeur
window.checkout = async () => {
    if(cart.length === 0) return;
    try {
        await addDoc(collection(db, "orders"), {
            items: cart,
            total: cart.reduce((s, i) => s + i.price, 0),
            date: new Date().toLocaleString(),
            status: "Nouveau"
        });
        alert("Commande envoyée ! Le vendeur la verra dans son panel.");
        cart = []; updateUI();
        document.getElementById('cart-panel').style.transform = "translateX(100%)";
    } catch(e) { alert("Erreur : " + e.message); }
};
