// Données des catégories avec images réelles
const mainCategories = [
    { name: "FOOD TO GO", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop", id: "food" },
    { name: "BIJOUX", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&h=150&fit=crop", id: "bijoux" },
    { name: "TECH", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop", id: "tech" },
    { name: "AUTO", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=150&h=150&fit=crop", id: "auto" },
    { name: "HOMME", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=150&h=150&fit=crop", id: "homme" },
    { name: "FEMME", img: "https://images.unsplash.com/photo-1539109132314-3477524c859c?w=150&h=150&fit=crop", id: "femme" },
    { name: "ENFANTS", img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=150&h=150&fit=crop", id: "enfants" }
];

const foodCategories = [
    { name: "PIZZERIAS", img: "https://images.unsplash.com/photo-1574129624503-602004268502?w=150&h=150&fit=crop" },
    { name: "PÊCHERIE", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=150&h=150&fit=crop" },
    { name: "CRÈMERIE", img: "https://images.unsplash.com/photo-1501443762994-82bd5dabb892?w=150&h=150&fit=crop" },
    { name: "CAFÉTÉRIA", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop" }
];

// Produits de démonstration pour la page d'accueil
const demoProducts = [
    { name: "Chaussure Cuir Luxe", price: "12.500 DA", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&h=300&fit=crop" },
    { name: "iPhone 15 Pro Max", price: "245.000 DA", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop" }
];

const categoryGrid = document.getElementById('category-grid');
const heroBanner = document.getElementById('hero-banner');
const productList = document.getElementById('product-list');

function renderHome() {
    categoryGrid.innerHTML = "";
    productList.innerHTML = "";
    heroBanner.style.display = "block";
    
    // Rendu des catégories avec IMAGES RÉELLES
    mainCategories.forEach(cat => {
        const div = document.createElement('div');
        div.className = "flex flex-col items-center cursor-pointer";
        div.onclick = () => { if(cat.id === 'food') renderFoodHub(); };
        div.innerHTML = `
            <div class="w-16 h-16 rounded-full border-2 border-aura-gold overflow-hidden shadow-lg bg-aura-blue">
                <img src="${cat.img}" class="mini-img" alt="${cat.name}">
            </div>
            <span class="text-[8px] font-bold uppercase mt-2 text-aura-blue">${cat.name}</span>
        `;
        categoryGrid.appendChild(div);
    });

    // Rendu de la bannière
    heroBanner.innerHTML = `
        <div class="rounded-xl overflow-hidden relative h-40 bg-aura-blue shadow-xl border-b-2 border-aura-gold mt-4">
            <div class="absolute inset-0 bg-gradient-to-r from-aura-blue to-transparent z-10 p-6 flex flex-col justify-center">
                <h3 class="text-aura-gold text-xl font-bold tracking-widest uppercase">L'Excellence Global</h3>
            </div>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" class="absolute right-0 top-0 h-full w-full object-cover opacity-50">
        </div>
    `;

    // Rendu des produits
    demoProducts.forEach(prod => {
        const div = document.createElement('div');
        div.className = "bg-white rounded-lg p-3 shadow-md border-b-2 border-aura-gold";
        div.innerHTML = `
            <img src="${prod.img}" class="w-full h-32 object-cover rounded-md mb-2">
            <h4 class="text-xs font-bold">${prod.name}</h4>
            <p class="text-aura-blue font-bold">${prod.price}</p>
            <button class="w-full bg-aura-blue text-aura-gold text-[10px] py-1 mt-2 rounded uppercase font-bold">Commander</button>
        `;
        productList.appendChild(div);
    });
}

function renderFoodHub() {
    categoryGrid.innerHTML = "";
    productList.innerHTML = "";
    heroBanner.style.display = "none";
    
    const backBtn = document.createElement('div');
    backBtn.className = "col-span-4 text-left text-aura-blue font-bold cursor-pointer text-sm mb-2";
    backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Retour`;
    backBtn.onclick = renderHome;
    categoryGrid.appendChild(backBtn);

    foodCategories.forEach(cat => {
        const div = document.createElement('div');
        div.className = "flex flex-col items-center cursor-pointer";
        div.innerHTML = `
            <div class="w-16 h-16 rounded-full border-2 border-aura-gold overflow-hidden shadow-lg bg-white">
                <img src="${cat.img}" class="mini-img" alt="${cat.name}">
            </div>
            <span class="text-[8px] font-bold uppercase mt-2 text-aura-blue">${cat.name}</span>
        `;
        categoryGrid.appendChild(div);
    });
}

// Lancement
renderHome();
