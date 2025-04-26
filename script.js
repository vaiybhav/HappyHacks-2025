// Simple form handling (can be expanded for real backend integration)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out. We will get back to you soon.');
    this.reset();
  });