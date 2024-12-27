import { setElementText, setElementSrc, createProjectCard, createFooterSection } from './helpers.js';

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