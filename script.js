const models = [
    {
        name: "Llama 3 (8B)",
        type: "Text Generation",
        energy: 0.03, // Wh
        unit: "Wh / query",
        desc: "Modelo open-source ligero y altamente eficiente."
    },
    {
        name: "Gemini Pro",
        type: "Text Generation",
        energy: 0.24,
        unit: "Wh / query",
        desc: "Optimizado por la infraestructura TPU de Google."
    },
    {
        name: "Claude 3.5 Sonnet",
        type: "Text Generation",
        energy: 0.30,
        unit: "Wh / query",
        desc: "Equilibrio entre razonamiento complejo y coste."
    },
    {
        name: "GPT-4o",
        type: "Text Generation",
        energy: 0.34,
        unit: "Wh / query",
        desc: "Alta capacidad de razonamiento con mayor coste computacional."
    },
    {
        name: "Stable Diffusion XL",
        type: "Image Generation",
        energy: 2.90,
        unit: "Wh / image",
        desc: "Generar píxeles es exponencialmente más costoso que generar texto."
    }
];

const container = document.getElementById('modelGrid');
const btnEnergy = document.getElementById('sortByEnergy');
const btnName = document.getElementById('sortByName');

function getConsumptionClass(energy) {
    if (energy < 0.1) return 'low-consumption';
    if (energy < 1.0) return 'med-consumption';
    return 'high-consumption';
}

function renderModels(data) {
    container.innerHTML = '';
    
    data.forEach((model, index) => {
        const card = document.createElement('div');
        const consumptionClass = getConsumptionClass(model.energy);
        
        card.className = `card ${consumptionClass} fade-in`;
        card.style.animationDelay = `${index * 0.1}s`;

        // Calculate equivalence (Bulb seconds)
        // 60W bulb consumes 60Wh in 1 hour -> 1Wh per minute -> 0.016 Wh per second.
        // Energy / 0.016 = Seconds of 60W bulb
        const bulbSeconds = (model.energy / 0.016).toFixed(1);

        card.innerHTML = `
            <div class="model-name">${model.name}</div>
            <div class="model-type">${model.type}</div>
            <p>${model.desc}</p>
            
            <div class="stat-row">
                <span class="energy-value">${model.energy}</span>
                <span class="unit">${model.unit}</span>
            </div>
            
            <div class="comparison">
                💡 Equivale a una bombilla (60W) encendida por <strong>${bulbSeconds}s</strong>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Sorting Functions
function sortByEnergy() {
    const sorted = [...models].sort((a, b) => a.energy - b.energy);
    renderModels(sorted);
    updateButtons(btnEnergy);
}

function sortByName() {
    const sorted = [...models].sort((a, b) => a.name.localeCompare(b.name));
    renderModels(sorted);
    updateButtons(btnName);
}

function updateButtons(activeBtn) {
    document.querySelectorAll('.sort-buttons button').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Event Listeners
btnEnergy.addEventListener('click', sortByEnergy);
btnName.addEventListener('click', sortByName);

// Initial Render
sortByEnergy();
