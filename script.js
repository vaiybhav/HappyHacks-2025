// Smooth Fade-In Observer
const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Crisis Popup
function openCrisisPopup() {
  document.getElementById('crisisPopup').style.display = 'flex';
}

function closeCrisisPopup() {
  document.getElementById('crisisPopup').style.display = 'none';
}

// Inspirational Quotes Rotator
const quotes = [
  "You are stronger than you think.",
  "Every day is a second chance.",
  "Your mental health matters.",
  "Believe in yourself even when it's hard.",
  "Storms don't last forever."
];

let quoteIndex = 0;
const quoteText = document.getElementById('quoteText');

function rotateQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.textContent = `"${quotes[quoteIndex]}"`;
}

setInterval(rotateQuote, 7000); // Change quote every 7 seconds

// Mood Tracker
const moodSlider = document.getElementById('moodSlider');
const emojiDisplay = document.getElementById('emojiDisplay');

const moodEmojis = {
  1: "😭",
  2: "😔",
  3: "😐",
  4: "🙂",
  5: "😄"
};

let moodData = [];
let moodLabels = [];

function updateMood() {
  const mood = moodSlider.value;
  emojiDisplay.textContent = moodEmojis[mood];
  const currentTime = new Date().toLocaleTimeString();
  moodLabels.push(currentTime);
  moodData.push(parseInt(mood));
  moodChart.update();
}

const ctx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: moodLabels,
    datasets: [{
      label: 'Mood Over Time',
      data: moodData,
      borderColor: '#0059b3',
      backgroundColor: 'rgba(0,89,179,0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: function(value) {
            return moodEmojis[value];
          }
        }
      }
    }
  }
});