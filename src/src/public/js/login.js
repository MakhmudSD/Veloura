function createParticle() {
  const container = document.getElementById("particles-container");
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = `${100 + Math.random() * 20}vh`;

  const size = Math.random() * 4 + 18; 
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  container.appendChild(particle);

  anime({
    targets: particle,
    translateY: -window.innerHeight - 100,
    translateX: (Math.random() - 0.5) * 100,
    opacity: [
      { value: 0.95, duration: 500 },
      { value: 0, duration: 4000 },
    ],
    easing: "easeOutQuad",
    duration: 6000 + Math.random() * 3000, 
    complete: () => {
      particle.remove();
    },
  });
}

setInterval(createParticle, 50); 
