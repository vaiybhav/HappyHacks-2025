const body = document.body;

function loadParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 30,
        density: { enable: true, value_area: 900 }
      },
      color: { value: "#aad4ff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.2,
        random: false,
        anim: { enable: false }
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: false }
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      events: {
        onhover: { enable: false },
        onclick: { enable: false }
      }
    },
    retina_detect: true
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('mode-toggle');
  const modeIcon = document.getElementById('mode-icon');
  const navbar = document.querySelector('.navbar');

  body.classList.add('light');
  loadParticles();

  function setMoonIcon() {
    modeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    `;
  }

  function setSunIcon() {
    modeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M12 4.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9-9a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm-17 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm15.071-6.071a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414zm-12.728 0a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414zm12.728 12.728a1 1 0 1 0-1.414 1.414 1 1 0 0 0 1.414-1.414zm-12.728 0a1 1 0 1 0-1.414 1.414 1 1 0 0 0 1.414-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
      </svg>
    `;
  }

  // Set initial icon for light mode (show moon to suggest dark mode switch)
  setMoonIcon();

  modeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      body.classList.add('light');
      setMoonIcon();
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      setSunIcon();
    }
  });
});