let items = [
    [], // Itens para slot 1
    [], // Itens para slot 2
    [], // Itens para slot 3
    [], // Itens para slot 4
    []  // Itens para slot 5
];

const openedSlots = {}; // Objeto para armazenar os slots que foram abertos

// Carrega os itens do localStorage quando a página é carregada
function loadItems() {
    const savedItems = localStorage.getItem("slotItems");
    if (savedItems) {
        items = JSON.parse(savedItems);
    } else {
        // Se não houver itens salvos, use um padrão (pode ser removido ou alterado)
        items = [
            [["item1.png", 20], ["item2.png", 30], ["item3.png", 25]], // Slot 1
            [["item1.png", 20], ["item2.png", 30], ["item3.png", 25]], // Slot 2
            [["item1.png", 20], ["item2.png", 30], ["item3.png", 25]], // Slot 3
            [["item1.png", 20], ["item2.png", 30], ["item3.png", 25]], // Slot 4
            [["item1.png", 20], ["item2.png", 30], ["item3.png", 25]]  // Slot 5
        ];
    }
}

// Função para abrir uma caixa
function openBox(slotId) {
    // Verifica se a caixa já foi aberta
    if (openedSlots[slotId]) {
        showAlert(); // Mostra o alerta visual
        return; // Sai da função, não abre a caixa novamente
    }

    const slotElement = document.getElementById(slotId);
    const box = slotElement.querySelector('.box');
    const item = slotElement.querySelector('.item');

    // Efeito de transição (animação)
    box.style.transition = 'transform 1s ease, opacity 1s ease';
    box.style.transform = 'scale(0.1)';
    box.style.opacity = '0';

    setTimeout(() => {
        box.style.display = 'none'; // Esconde a caixa após a animação

        // Seleciona um item aleatório
        const slotIndex = parseInt(slotId.replace('slot', '')) - 1;
        const selectedItem = selectRandomItem(slotIndex);
        item.src = selectedItem;
        item.style.display = 'block';
        item.style.transition = 'opacity 1s ease';
        item.style.opacity = '1'; // Mostra o item com transição suave

        openedSlots[slotId] = true; // Marca o slot como aberto
    }, 1000); // O tempo da animação é de 1 segundo
}

// Função para selecionar um item aleatório baseado nas probabilidades
function selectRandomItem(slotIndex) {
    const slotItems = items[slotIndex];

    // Gera um número aleatório entre 0 e 100 para decidir qual item é selecionado com base na probabilidade
    const randomValue = Math.random() * 100;
    let cumulativeProbability = 0;

    for (let i = 0; i < slotItems.length; i++) {
        cumulativeProbability += slotItems[i][1]; // Adiciona a probabilidade do item atual
        if (randomValue < cumulativeProbability) {
            return slotItems[i][0]; // Retorna o nome do item
        }
    }
    return slotItems[0][0]; // Retorna o primeiro item como fallback
}

// Função para exibir o alerta quando a caixa já foi aberta
function showAlert() {
    document.getElementById("modal_alerta").style.display = "flex"; // Exibe o alerta visual
}

// Função para fechar o alerta
function fecharAlerta() {
    document.getElementById("modal_alerta").style.display = "none"; // Fecha o alerta visual
}

// Carregar os itens ao iniciar a página
loadItems();