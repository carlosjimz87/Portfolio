import {setElementText, setElementSrc, createProjectCard, createFooterSection, initImageModal} from './helpers.js';

document.addEventListener("DOMContentLoaded", async function() {
  try {
    // 1) Grab the container for your cards
    const container = document.getElementById('projects-container');
    if (!container) {
      console.error('Could not find #projects-container element in the DOM.');
      return;
    }

    // 2) Fetch both JSON files in parallel
    const [portfolioRes, dataRes] = await Promise.all([
      fetch('data/portfolio.json'),
      fetch('data/data.json')
    ]);

    // 3) Convert both responses to JSON
    const [projects, userData] = await Promise.all([
      portfolioRes.json(),
      dataRes.json()
    ]);

    // 4) Create project cards
    projects.forEach(project => {
      const cardCol = createProjectCard(project);
      container.appendChild(cardCol);
    });

    // 5) Populate name and profession
    setElementText('name', userData.name);
    setElementText('profession', userData.profession);
    createFooterSection('footer', userData.name);

  } catch (error) {
    console.error("Error loading projects or data:", error);
  }
});

// === Floating Back button: keep X, only change Y on scroll ===
const backBtn = document.querySelector('.floating-portfolio-button-back');

if (backBtn) {
  let lastY = window.scrollY;
  const threshold = 8; // avoid jitter on tiny scrolls

  const onScroll = () => {
    const y = window.scrollY;

    // scrolling down -> dock to bottom; scrolling up -> restore original
    if (y - lastY > threshold) {
      backBtn.classList.add('stick-bottom');
    } else if (lastY - y > threshold) {
      backBtn.classList.remove('stick-bottom');
    }

    lastY = y;
  };

  // Lift when footer shows (prevents overlap)
  const footer = document.getElementById('footer');
  if ('IntersectionObserver' in window && footer) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backBtn.classList.add('avoid-footer');
        } else {
          backBtn.classList.remove('avoid-footer');
        }
      });
    });
    io.observe(footer);
  }

  initImageModal();

  window.addEventListener('scroll', onScroll, { passive: true });
}