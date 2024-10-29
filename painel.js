const items = [
    [], // Slot 1
    [], // Slot 2
    [], // Slot 3
    [], // Slot 4
    []  // Slot 5
];

function addItem() {
    const slotIndex = document.getElementById("slot").value;
    const itemName = document.getElementById("itemName").value.trim();
    const probability = parseInt(document.getElementById("probability").value, 10);

    if (!itemName || isNaN(probability) || probability < 0 || probability > 100) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Adiciona o item ao slot correspondente
    items[slotIndex].push({ name: itemName, probability: probability });
    document.getElementById("itemName").value = '';
    document.getElementById("probability").value = '';
    displayItems();
    saveItems(); // Salva os itens no Local Storage
}

function displayItems() {
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = '';

    items.forEach((slotItems, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.innerHTML = `<h3>Slot ${index + 1}</h3>`;
        slotItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerText = `Item: ${item.name} - Probabilidade: ${item.probability}%`;
            slotDiv.appendChild(itemDiv);
        });
        itemsList.appendChild(slotDiv);
    });
}

function saveItems() {
    localStorage.setItem("slotItems", JSON.stringify(items)); // Salva os itens no Local Storage
}

function loadItems() {
    const savedItems = localStorage.getItem("slotItems");
    if (savedItems) {
        items = JSON.parse(savedItems);
        displayItems();
    }
}

// Carregar itens ao iniciar a página
loadItems();
