const menu = {
    veg: [
        { name: "Paneer Chilli", half: 130, full: 230, img: "paneer.jpg" },
        { name: "Veg Manchurian", half: 120, full: 200, img: "manchurian.jpg" }
    ],
    nonveg: [
        { name: "Chicken Chilli", half: 150, full: 250, img: "chicken.jpg" },
        { name: "Chicken Manchurian", half: 140, full: 240, img: "chicken_manchurian.jpg" }
    ]
};

let order = [];
let themes = ["light-theme", "dark-theme", "neon-theme", "menu-theme"];
let currentTheme = 3; // start with menu-theme

function renderMenu() {
    for (let category in menu) {
        let section = document.getElementById(category);
        section.innerHTML = "";
        menu[category].forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("menu-item");

            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-info">
                    <strong>${item.name}</strong>
                    <br>
                    <select class="size" data-category="${category}" data-index="${index}">
                        <option value="half">Half ₹${item.half}</option>
                        <option value="full">Full ₹${item.full}</option>
                    </select>
                    <select class="qty" data-category="${category}" data-index="${index}">
                        ${Array.from({ length: 50 }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join("")}
                    </select>
                    <button onclick="addToOrder('${category}', ${index})">Add</button>
                </div>
            `;
            section.appendChild(div);
        });
    }
}

function showTab(tab) {
    document.querySelectorAll(".menu-section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(tab).classList.remove("hidden");

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[onclick="showTab('${tab}')"]`).classList.add("active");
}

function addToOrder(category, index) {
    const sizeEl = document.querySelector(`.size[data-category="${category}"][data-index="${index}"]`);
    const qtyEl = document.querySelector(`.qty[data-category="${category}"][data-index="${index}"]`);

    let size = sizeEl.value;
    let qty = parseInt(qtyEl.value);
    let price = size === "half" ? menu[category][index].half : menu[category][index].full;

    order.push({ name: menu[category][index].name, size, qty, price });
    updateTotal();
}

function updateTotal() {
    let total = 0, totalQty = 0;
    order.forEach(item => {
        total += item.price * item.qty;
        totalQty += item.qty;
    });
    document.getElementById("totalPrice").textContent = total;
    document.getElementById("totalQty").textContent = totalQty;
}

document.getElementById("whatsappBtn").addEventListener("click", () => {
    let message = "Order Details:\n";
    order.forEach((item, i) => {
        message += `${i+1}. ${item.name} (${item.size}) - ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
    message += `\nTotal Qty: ${document.getElementById("totalQty").textContent}`;
    message += `\nTotal Price: ₹${document.getElementById("totalPrice").textContent}`;

    let phone = "919004130508";
    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});

document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
});

renderMenu();
