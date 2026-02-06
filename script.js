const models = [
    {
        name: "Llama 3 (8B)",
        type: "Text Generation",
        energy: 0.03, // Wh
        unit: "Wh / query",
        logo: "images/logos/meta-llama.svg",
        desc: "Modelo open-source ligero y altamente eficiente."
    },
    {
        name: "Gemini Pro",
        type: "Text Generation",
        energy: 0.24,
        unit: "Wh / query",
        logo: "images/logos/google-gemini.svg",
        desc: "Optimizado por la infraestructura TPU de Google."
    },
    {
        name: "Claude 3.5 Sonnet",
        type: "Text Generation",
        energy: 0.30,
        unit: "Wh / query",
        logo: "images/logos/anthropic-claude.svg",
        desc: "Equilibrio entre razonamiento complejo y coste."
    },
    {
        name: "Mistral Large",
        type: "Text Generation",
        energy: 0.32,
        unit: "Wh / query",
        logo: "images/logos/mistral-ai.svg",
        desc: "El modelo más potente de Mistral AI, soberanía europea."
    },
    {
        name: "GPT-4o",
        type: "Text Generation",
        energy: 0.34,
        unit: "Wh / query",
        logo: "images/logos/openai.svg",
        desc: "Alta capacidad de razonamiento con mayor coste computacional."
    },
    {
        name: "Stable Diffusion XL",
        type: "Image Generation",
        energy: 2.90,
        unit: "Wh / image",
        logo: "images/logos/stability-ai.svg",
        desc: "Generar píxeles es exponencialmente más costoso que generar texto."
    }
];

const container = document.getElementById('modelGrid');
const btnEnergy = document.getElementById('sortByEnergy');

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

        // Dynamic Comparison Logic
        let comparisonHTML = '';
        if (model.energy < 0.1) {
            // Charging a smartphone (approx 10Wh for full charge)
            const phonePercentage = (model.energy / 10 * 100).toFixed(2);
            comparisonHTML = `🔋 Carga un <strong>${phonePercentage}%</strong> de un smartphone`;
        } else if (model.energy < 0.5) {
            // LED Bulb (10W) -> 0.0027 Wh per second
            const ledSeconds = (model.energy / 0.0027).toFixed(1);
            comparisonHTML = `💡 Bombilla LED (10W) encendida por <strong>${ledSeconds}s</strong>`;
        } else if (model.energy < 1.0) {
            // Laptop (45W) -> 0.0125 Wh per second
            const laptopSeconds = (model.energy / 0.0125).toFixed(1);
            comparisonHTML = `💻 Laptop (45W) funcionando por <strong>${laptopSeconds}s</strong>`;
        } else {
            // Oven (2500W) -> 0.694 Wh per second
            const ovenSeconds = (model.energy / 0.694).toFixed(1);
            comparisonHTML = `🍳 Horno eléctrico (2500W) a fuego por <strong>${ovenSeconds}s</strong>`;
        }

        card.innerHTML = `
            <div class="card-header">
                <img src="${model.logo}" alt="${model.name} logo" class="model-logo">
                <div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-type">${model.type}</div>
                </div>
            </div>
            <p>${model.desc}</p>
            
            <div class="stat-row">
                <span class="energy-value">${model.energy}</span>
                <span class="unit">${model.unit}</span>
            </div>
            
            <div class="comparison">
                ${comparisonHTML}
            </div>
        `;

        container.appendChild(card);
    });
}

function sortByEnergy() {
    const sorted = [...models].sort((a, b) => a.energy - b.energy);
    renderModels(sorted);
    updateButtons(btnEnergy);
}

function updateButtons(activeBtn) {
    document.querySelectorAll('.sort-buttons button').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Event Listeners
btnEnergy.addEventListener('click', sortByEnergy);

// Initial Render
sortByEnergy();
