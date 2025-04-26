// Simple animation on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;

        if(top >= offset && top < offset + height){
            sec.style.opacity = 1;
            sec.style.transform = 'translateY(0)';
        }
    });
});

// Initial section styles
sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(50px)';
    sec.style.transition = 'all 0.8s ease-out';
});
// Add smooth fade effect when scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show-section');
      }
    });
  });
  
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
  
  // You can add CSS animation trigger
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#00b4d8"
      },
      "shape": {
        "type": "circle",
      },
      "opacity": {
        "value": 0.5,
        "random": false,
      },
      "size": {
        "value": 3,
        "random": true,
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00b4d8",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "straight": false,
        "out_mode": "out",
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "repulse": {
          "distance": 100
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });