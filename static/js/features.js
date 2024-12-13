const features = [
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>`,
        title: 'Advanced AI Recognition',
        description: 'State-of-the-art machine learning algorithms for accurate handwriting recognition'
    },
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>`,
        title: 'Real-time Processing',
        description: 'Get instant results with our fast processing engine'
    },
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>`,
        title: 'Secure & Private',
        description: 'Your medical data is encrypted and handled with utmost privacy'
    },
    {
        icon: `<svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>`,
        title: 'High Accuracy',
        description: 'Trained on millions of prescriptions for maximum precision'
    }
];

// Populate features
const featuresGrid = document.querySelector('.features-grid');
features.forEach((feature, index) => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card fade-in-section';
    featureCard.style.animationDelay = `${index * 0.2}s`;
    
    featureCard.innerHTML = `
        ${feature.icon}
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
    `;
    
    featuresGrid.appendChild(featureCard);
});