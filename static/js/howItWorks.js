const steps = [
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>`,
        title: 'Upload Prescription',
        description: 'Take a photo or upload an image of the handwritten prescription'
    },
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/>
            <line x1="17" y1="17" x2="22" y2="17"/>
            <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>`,
        title: 'AI Processing',
        description: 'Our AI analyzes and converts the handwriting to digital text'
    },
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
        </svg>`,
        title: 'Get Results',
        description: 'Receive clear, accurate digital version of the prescription'
    }
];

// Populate steps
const stepsContainer = document.querySelector('.steps-container');
steps.forEach((step, index) => {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card fade-in-section';
    stepCard.style.animationDelay = `${index * 0.3}s`;
    
    stepCard.innerHTML = `
        <div class="icon-container">
            ${step.icon}
        </div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
    `;
    
    stepsContainer.appendChild(stepCard);
});