const imagesUrl = 'images/';
const projectsPath = 'projects/';

/**
 * Set text content on an element by ID, preserving existing classes/attributes.
 */
export function setElementText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

/**
 * Set src and alt attributes on an element by ID.
 */
export function setElementSrc(id, src, alt) {
  const element = document.getElementById(id);
  if (element) {
    element.src = imagesUrl + src;
    if (alt) {
      element.alt = alt;
    }
  }
}

export function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col';
  
    // Build the fan of images HTML by mapping over project.images
    const projectFolder = `${projectsPath}${project.id}/`;
    const imagesHtml = project.images
      .map((img, idx) => {
        return `
          <img 
            src="${projectFolder}${img.src}" 
            alt="${project.title} image ${idx + 1}"
            class="fan-image"
          />
        `;
      })
      .join('');
  
    // Now place the fan in a container, then the body with the title & logo side-by-side
    col.innerHTML = `
      <div class="card h-100 p-3">
      
        <div class="fan-container d-flex justify-content-center mb-3">
          ${imagesHtml}
        </div>
        
        <!-- Card Body -->
        <div class="card-body">

          <div class="d-flex align-items-center mt-3 mb-3">
            <h3 class="card-title flex-grow-1 mb-0">${project.title}</h3>
            <img 
              class="logo-img"
              src="${projectFolder}${project.logo}" 
              alt="${project.title} logo" 
            />
          </div>
          
          <p class="card-text mb-1">${project.description}</p>
          <p class="mb-1"><strong>My Contribution:</strong> ${project.contribution}</p>
          <p class="mb-0"><strong>Impact:</strong> ${project.impact}</p>

          <!-- Add your new button here -->
        <div class="mt-3">
          <row class="d-flex justify-content-center">
            <a href="${project.url}" target="_blank" class="badge bg-dark tech-badge text-decoration-none">
              More Info
            </a>
          </row>
        </div>

        </div>
      </div>
    `;
  
    return col;
  }


export function createFooterSection(id, text) {
  const footerSection = document.getElementById(id);
  if (!footerSection) {
    console.error('No #footer element found in the DOM.');
    return;
  }

   const footerDiv = document.createElement('div');
    footerDiv.className = "col-12 d-flex justify-content-center align-items-center text-light m-4";

    // 4) Set the inner HTML, using data.by for the username
    footerDiv.innerHTML = `
      <p class="mb-0 me-2 fs-8">
        Developed by <strong class="text-warning">@${text}</strong>
      </p>
      <img src="images/favicon.ico" alt="carlosjimz87" style="height: 2em;" class="footer-icon">
    `;

    // 5) Append the footer div to the footer section
    footerSection.appendChild(footerDiv);
}