// Scroll event listener
window.onscroll = function () {
    scrollFunction();
};

// Main scroll function
function scrollFunction() {
    const header = document.querySelector(".header-content");
    const avatar = document.querySelector(".avatar-photo");
    const nameDiv = document.querySelector("#name").parentElement; // Get the parent div of the name
    const devTitleDiv = document.querySelector("#profession").parentElement; // Corrected ID (was "#dev-title")
    const headerIcon = document.querySelector(".header-icon"); // Ensure this class exists
    const footer = document.querySelector("footer");
    const portfolioButton = document.querySelector(".floating-portfolio-button");

    // Check if scrolling down
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        // Add shrinking and fixing header class
        header.classList.add("shrunk-header");
        header.classList.add("fixed-header");

        // Shrink avatar and move it to the right
        avatar.classList.add("shrunk-avatar");

        // Adjust name and developer title font size and alignment
        nameDiv.classList.remove("justify-content-center");
        nameDiv.classList.add("justify-content-start");

        devTitleDiv.classList.remove("justify-content-center");
        devTitleDiv.classList.add("justify-content-start");

        // Shrink text
        document.getElementById("name").classList.add("shrunk-text");
        document.getElementById("profession").classList.add("shrunk-text");

        // Show the icon with fade-in effect
        if (headerIcon) {
            headerIcon.classList.add("show");
        }
    } else {
        // Revert back to initial state
        header.classList.remove("shrunk-header");
        header.classList.remove("fixed-header");

        avatar.classList.remove("shrunk-avatar");

        nameDiv.classList.remove("justify-content-start");
        nameDiv.classList.add("justify-content-center");

        devTitleDiv.classList.remove("justify-content-start");
        devTitleDiv.classList.add("justify-content-center");

        document.getElementById("name").classList.remove("shrunk-text");
        document.getElementById("profession").classList.remove("shrunk-text");

        // Hide the icon with fade-out effect
        if (headerIcon) {
            headerIcon.classList.remove("show");
        }
    }
}