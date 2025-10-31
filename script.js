import { setElementText, setElementSrc, createFooterSection } from './helpers.js';

const images_url = 'images/';

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();

        const populateStackList = (id, stack) => {
            const stackContainer = document.getElementById(id);
            if (stackContainer) {
                // Clear the current content
                stackContainer.innerHTML = '';
        
                // Create a wrapper div for the badges
                const badgeWrapper = document.createElement('div');
                badgeWrapper.className = 'mt-3';
        
                // Loop through each stack item
                stack.forEach((item) => {
                    // Create a span for each stack item as a badge
                    const badge = document.createElement('span');
                    badge.textContent = item;
                    badge.className = 'badge bg-dark me-1 tech-badge';
        
                    // Append the badge to the badgeWrapper
                    badgeWrapper.appendChild(badge);
                });
        
                // Append the badgeWrapper to the stack container
                stackContainer.appendChild(badgeWrapper);
            }
        };
        

        // Helper function to populate the skills accordion
        const populateSkillsAccordion = (id, skills, descriptions) => {
            const accordionContainer = document.getElementById(id);
        
            if (accordionContainer) {
                // Clear the current content
                accordionContainer.innerHTML = '';
        
                // Loop through each skill and its description
                skills.forEach((skill, index) => {
                    // Create accordion item structure
                    const accordionItem = document.createElement('div');
                    accordionItem.className = 'accordion-item';
        
                    // Create the accordion header
                    const accordionHeader = document.createElement('h2');
                    accordionHeader.className = 'accordion-header';
                    const button = document.createElement('button');
                    button.className = 'accordion-button collapsed';
                    button.type = 'button';
                    button.setAttribute('data-bs-toggle', 'collapse');
                    button.setAttribute('data-bs-target', `#collapse${index}`);
                    button.setAttribute('aria-expanded', 'false');
                    button.setAttribute('aria-controls', `collapse${index}`);
        
                    // Add icon and skill name to the button
                    const icon = document.createElement('i');
                    icon.className = getIconForSkill(skill); // Customize the icon based on the skill name
                    icon.classList.add('fs-2', 'me-3');
                    const skillTitle = document.createElement('h4');
                    skillTitle.textContent = skill;
        
                    // Create the toggle arrow using Bootstrap Icons
                    const toggleArrow = document.createElement('i');
                    toggleArrow.className = 'bi bi-chevron-right ms-auto toggle-icon'; // Arrow styling
        
                    // Append icon, skillTitle, and toggleArrow to the button
                    button.appendChild(icon);
                    button.appendChild(skillTitle);
                    button.appendChild(toggleArrow);
                    accordionHeader.appendChild(button);
        
                    // Create accordion collapse container
                    const accordionCollapse = document.createElement('div');
                    accordionCollapse.className = 'accordion-collapse collapse';
                    accordionCollapse.id = `collapse${index}`;
                    accordionCollapse.setAttribute('data-bs-parent', `#${id}`);
        
                    // Create accordion body
                    const accordionBody = document.createElement('div');
                    accordionBody.className = 'accordion-body';
        
                    // Create the <ul> for skill descriptions
                    const ul = document.createElement('ul');
                    ul.className = 'ps-3 ms-4';
        
                    // Split the descriptions into list items (assuming descriptions are semi-colon separated or full sentences)
                    descriptions[index].split('. ').forEach(desc => {
                        const li = document.createElement('li');
                        li.textContent = desc.trim();
                        ul.appendChild(li);
                    });
        
                    // Append the ul to the accordion body
                    accordionBody.appendChild(ul);
        
                    // Append the body and header to the collapse container
                    accordionCollapse.appendChild(accordionBody);
        
                    // Append the header and collapse to the accordion item
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionCollapse);
        
                    // Append the accordion item to the accordion container
                    accordionContainer.appendChild(accordionItem);
                });
        
                // Add event listener to toggle the arrow direction
                accordionContainer.querySelectorAll('.accordion-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const arrow = button.querySelector('.toggle-icon');
                        if (button.classList.contains('collapsed')) {
                            arrow.classList.remove('bi-chevron-down');
                            arrow.classList.add('bi-chevron-right');
                        } else {
                            arrow.classList.remove('bi-chevron-right');
                            arrow.classList.add('bi-chevron-down');
                        }
                    });
                });
            }
        };
        
        // Helper function to return icon classes based on skill name
        const getIconForSkill = (skill) => {
            switch (skill.toLowerCase()) {
                case 'mobile development':
                    return 'bi bi-phone';
                case 'leadership':
                    return 'bi bi-compass';
                case 'backend development':
                    return 'bi bi-hdd-stack';
                case 'coaching & research':
                    return 'bi bi-book';
                default:
                    return 'bi bi-star';  // Default icon if no match
            }
        };

        // Helper function to populate a list without replacing the whole element, ensuring classes remain intact
        const populateList = (id, items) => {
            const listElement = document.getElementById(id);
            if (listElement) {
                // Clear the current list items without resetting the entire element
                while (listElement.firstChild) {
                    listElement.removeChild(listElement.firstChild);
                }
                // Append new list items
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    listElement.appendChild(li);
                });
            }
        };

        // Function to populate work history, keeping classes intact
        const populateWorkHistoryAccordion = (id, workHistory, descriptions) => {
            const accordionContainer = document.getElementById(id);
        
            if (accordionContainer) {
                // Clear the current content
                accordionContainer.innerHTML = '';
        
                // Loop through each work history item
                workHistory.forEach((job, index) => {
                    const [company, role, logo] = job.split(';');
        
                    // Create accordion item structure
                    const accordionItem = document.createElement('div');
                    accordionItem.className = 'accordion-item';
        
                    // Create the accordion header
                    const accordionHeader = document.createElement('h2');
                    accordionHeader.className = 'accordion-header';
                    const button = document.createElement('button');
                    button.className = 'accordion-button collapsed';
                    button.type = 'button';
                    button.setAttribute('data-bs-toggle', 'collapse');
                    button.setAttribute('data-bs-target', `#collapseWork${index}`);
                    button.setAttribute('aria-expanded', 'false');
                    button.setAttribute('aria-controls', `collapseWork${index}`);
        
                    // Add toggle arrow, role, and company logo to the button
                    const toggleArrow = document.createElement('i');
                    toggleArrow.className = 'bi bi-chevron-right ms-auto toggle-icon'; // Default arrow pointing right
                    const roleTitle = document.createElement('h4');
                    roleTitle.textContent = `${role} at `;
                    const companyLogo = document.createElement('img');
                    companyLogo.src = images_url + logo;
                    companyLogo.alt = company;
                    companyLogo.className = 'footer-icon ms-3';
        
                    // Append toggleArrow, roleTitle, and companyLogo to the button
                    button.appendChild(roleTitle);
                    button.appendChild(companyLogo);
                    button.appendChild(toggleArrow);
                    accordionHeader.appendChild(button);
        
                    // Create accordion collapse container
                    const accordionCollapse = document.createElement('div');
                    accordionCollapse.className = 'accordion-collapse collapse';
                    accordionCollapse.id = `collapseWork${index}`;
                    accordionCollapse.setAttribute('data-bs-parent', `#${id}`);
        
                    // Create accordion body
                    const accordionBody = document.createElement('div');
                    accordionBody.className = 'accordion-body';
        
                    // Special handling for the first item with multiple positions
                    if (index === 0) {
                        const jobDescriptions = descriptions[index].split('];[');
        
                        jobDescriptions.forEach((description) => {
                            const [client, dates, details] = description.replace(/[\[\]]/g, '').split(';');
        
                            // Create <h5> for client name
                            const clientName = document.createElement('h5');
                            clientName.className = 'ms-4';
                            clientName.innerHTML = `for <strong>${client}</strong>`;
        
                            // Create <p> for dates in bold
                            const dateText = document.createElement('p');
                            dateText.className = 'ms-5';
                            dateText.innerHTML = `<strong>${dates}</strong>`;
        
                            // Create <p> for work details
                            const detailsText = document.createElement('p');
                            detailsText.className = 'ms-5';
                            detailsText.textContent = details;
        
                            // Append client name, date, and details to accordion body
                            accordionBody.appendChild(clientName);
                            accordionBody.appendChild(dateText);
                            accordionBody.appendChild(detailsText);
                        });
                    } else {
                        // For the other items, split into dates and description
                        const [dates, details] = descriptions[index].split(';');
        
                        // Create <p> for dates in bold
                        const dateText = document.createElement('p');
                        dateText.className = 'ms-4';
                        dateText.innerHTML = `<strong>${dates}</strong>`;
        
                        // Create <p> for work details (normal text)
                        const detailsText = document.createElement('p');
                        detailsText.className = 'ms-4';
                        detailsText.textContent = details;
        
                        // Append date and details to accordion body
                        accordionBody.appendChild(dateText);
                        accordionBody.appendChild(detailsText);
                    }
        
                    // Append the accordion body to the collapse container
                    accordionCollapse.appendChild(accordionBody);
        
                    // Append the header and collapse to the accordion item
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionCollapse);
        
                    // Append the accordion item to the accordion container
                    accordionContainer.appendChild(accordionItem);
                });
        
                // Add event listener to toggle the arrow direction
                accordionContainer.querySelectorAll('.accordion-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const arrow = button.querySelector('.toggle-icon');
                        if (button.classList.contains('collapsed')) {
                            arrow.classList.remove('bi-chevron-down');
                            arrow.classList.add('bi-chevron-right'); // Right arrow for collapsed
                        } else {
                            arrow.classList.remove('bi-chevron-right');
                            arrow.classList.add('bi-chevron-down'); // Down arrow for expanded
                        }
                    });
                });
            }
        };

        // Function to populate education, keeping classes intact
        const populateEducationAccordion = (id, education, descriptions) => {
            const accordionContainer = document.getElementById(id);
        
            if (accordionContainer) {
                // Clear the current content
                accordionContainer.innerHTML = '';
        
                // Loop through each education item
                education.forEach((item, index) => {
                    const [degree, logo, university] = item.split(';');
        
                    // Create accordion item structure
                    const accordionItem = document.createElement('div');
                    accordionItem.className = 'accordion-item';
        
                    // Create the accordion header
                    const accordionHeader = document.createElement('h2');
                    accordionHeader.className = 'accordion-header';
                    const button = document.createElement('button');
                    button.className = 'accordion-button collapsed';
                    button.type = 'button';
                    button.setAttribute('data-bs-toggle', 'collapse');
                    button.setAttribute('data-bs-target', `#collapseEducation${index}`);
                    button.setAttribute('aria-expanded', 'false');
                    button.setAttribute('aria-controls', `collapseEducation${index}`);
        
                    // Add toggle arrow, degree, and university logo to the button
                    const toggleArrow = document.createElement('i');
                    toggleArrow.className = 'bi bi-chevron-right ms-auto toggle-icon'; // Default arrow pointing right
                    const degreeTitle = document.createElement('h4');
                    degreeTitle.textContent = `${degree} at `;
                    const universityLogo = document.createElement('img');
                    universityLogo.src = images_url + logo;
                    universityLogo.alt = university;
                    universityLogo.className = 'footer-icon ms-3';
        
                    // Append toggleArrow, degreeTitle, and universityLogo to the button
                    button.appendChild(degreeTitle);
                    button.appendChild(universityLogo);
                    button.appendChild(toggleArrow);
                    accordionHeader.appendChild(button);
        
                    // Create accordion collapse container
                    const accordionCollapse = document.createElement('div');
                    accordionCollapse.className = 'accordion-collapse collapse';
                    accordionCollapse.id = `collapseEducation${index}`;
                    accordionCollapse.setAttribute('data-bs-parent', `#${id}`);
        
                    // Create accordion body
                    const accordionBody = document.createElement('div');
                    accordionBody.className = 'accordion-body';
        
                    // Process the description
                    const [dates, description, status] = descriptions[index].split(';');
        
                    // Create <p> for dates in bold and status in brackets
                    const dateText = document.createElement('p');
                    dateText.className = 'ms-4';
                    dateText.innerHTML = `<strong>${dates}</strong> ${status}`;
        
                    // Create <p> for the course description (normal text)
                    const descriptionText = document.createElement('p');
                    descriptionText.className = 'ms-4';
                    descriptionText.textContent = description;
        
                    // Append date and description to accordion body
                    accordionBody.appendChild(dateText);
                    accordionBody.appendChild(descriptionText);
        
                    // Append the accordion body to the collapse container
                    accordionCollapse.appendChild(accordionBody);
        
                    // Append the header and collapse to the accordion item
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionCollapse);
        
                    // Append the accordion item to the accordion container
                    accordionContainer.appendChild(accordionItem);
                });
        
                // Add event listener to toggle the arrow direction
                accordionContainer.querySelectorAll('.accordion-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const arrow = button.querySelector('.toggle-icon');
                        if (button.classList.contains('collapsed')) {
                            arrow.classList.remove('bi-chevron-down');
                            arrow.classList.add('bi-chevron-right'); // Right arrow for collapsed
                        } else {
                            arrow.classList.remove('bi-chevron-right');
                            arrow.classList.add('bi-chevron-down'); // Down arrow for expanded
                        }
                    });
                });
            }
        };

        // Function to update the location (Google Maps link and location text)
        const updateLocation = (id, location) => {
            const locationElement = document.getElementById(id);
            if (locationElement) {
                const anchorTag = locationElement.querySelector('a');
                const strongTag = locationElement.querySelector('strong');

                // Update the text inside the strong tag
                if (strongTag) {
                    strongTag.textContent = location;
                }

                // Update the Google Maps link in the anchor tag
                if (anchorTag) {
                    anchorTag.href = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
                }
            }
        };

        // Function to populate social links dynamically by cloning the placeholder
        const populateSocialLinks = (id, socials) => {
            const socialContainer = document.getElementById(id);
            
            // Clear the social container
            socialContainer.innerHTML = '';
        
            // Create a 'row' div to hold the social links
            const row = document.createElement('div');
            row.className = 'row  gx-5 justify-content-center';
        
            // Loop through each social media item in the array
            socials.forEach(social => {
                const [platform, url] = social.split(';');
                const platformLower = platform.toLowerCase();
        
              // Create the 'col-6 col-lg-3' div for each social link
                const colDiv = document.createElement('div');
                colDiv.className = `col-6 col-lg-3 px-3 user-socials ${platformLower} d-flex justify-content-center`;

                // Create the <a> element
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.setAttribute('target', '_blank');  // Opens link in a new tab
        
                // Create the <i> element for the social icon
                const icon = document.createElement('i');
                icon.className = `bi bi-${platformLower} fs-2 text-dark`;
        
                // Append the icon to the <a> tag
                anchor.appendChild(icon);
        
                // Append the <a> tag to the colDiv
                colDiv.appendChild(anchor);
        
                // Append the colDiv to the row
                row.appendChild(colDiv);
            });
        
            // Append the complete row to the social container
            socialContainer.appendChild(row);
        };

        setElementText('name', data.name);
        setElementText('profession', data.profession);
        setElementText('username', data.username);
        setElementSrc('avatar', data.avatar, data.name);
        setElementText('email', data.email);
        
        updateLocation('location-container', data.location);
        populateSocialLinks('social-links', data.socials);
        populateList('summary-text', data.summary);
        populateStackList('stack', data.stack);
        populateSkillsAccordion('skills', data.skills, data['skills-descriptions']);
        populateWorkHistoryAccordion('work', data.work, data['work-descriptions']);
        populateEducationAccordion('education', data.education, data['education-descriptions']);
        populateList('others-text', data.other);
        createFooterSection('footer', data.name);


    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
});

// === Floating Go-to-Projects button: keep X, only change Y on scroll ===
(() => {
  const el = document.querySelector('.floating-portfolio-button');
  if (!el) return;

  let lastY = window.scrollY;
  const threshold = 8;

  const onScroll = () => {
    const y = window.scrollY;
    if (y - lastY > threshold) {
      el.classList.add('stick-bottom');     // scrolling down → dock to bottom
    } else if (lastY - y > threshold) {
      el.classList.remove('stick-bottom');  // scrolling up → restore default
    }
    lastY = y;
  };

  // Avoid footer overlap
  const footer = document.getElementById('footer');
  if ('IntersectionObserver' in window && footer) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) el.classList.add('avoid-footer');
        else el.classList.remove('avoid-footer');
      });
    });
    io.observe(footer);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
