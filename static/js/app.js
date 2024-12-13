particlesJS("particles-js", {
  particles: {
    number: {
      value: 120, // Increased the number for denser snow
      density: {
        enable: true,
        value_area: 700,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle", // Keeping it circular like small snowflakes
    },
    opacity: {
      value: 0.7, // Increased opacity to make flakes more visible
      random: true, // Enable randomness to mimic different sizes of flakes
      anim: {
        enable: true,
        speed: 9,
        opacity_min: 0.1, // Minimum opacity for variability
        sync: false,
      },
    },
    size: {
      value: 4, // Smaller size to reflect snowflake size
      random: true,
      anim: {
        enable: true,
        speed: 10,
        size_min: 2,
        sync: false,
      },
    },
    line_linked: {
      enable: false, // Disabled linking to avoid connecting snowflakes
    },
    move: {
      enable: true,
      speed: 2, // Reduced speed for a gentle snowfall effect
      direction: "bottom", // Changed direction to bottom to simulate falling
      random: true, // Enable randomness in movement
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false, // Disable hover effects
        mode: "bubble",
      },
      onclick: {
        enable: false, // Disable click effects
        mode: "push",
      },
      resize: true,
    },
  },
  retina_detect: true,
});
