window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var header = document.querySelector(".header-content");
    var avatar = document.querySelector(".avatar-photo");
    var nameDiv = document.querySelector("#name").parentElement; // Get the parent div of the name
    var devTitleDiv = document.querySelector("#dev-title").parentElement;

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        // Add shrinking and fixing header class
        header.classList.add("shrunk-header");
        header.classList.add("fixed-header");

        // Shrink avatar and move it to the right
        avatar.classList.add("shrunk-avatar");

        // Adjust name and developer title font size
        nameDiv.classList.remove("justify-content-center");
        nameDiv.classList.add("justify-content-left");

        devTitleDiv.classList.remove("justify-content-center");
        devTitleDiv.classList.add("justify-content-left");

        // Shrink text
        document.getElementById("name").classList.add("shrunk-text");
        document.getElementById("dev-title").classList.add("shrunk-text");

         // Show the icon with fade-in effect
        headerIcon.classList.remove("show");
   

    } else {
        // Revert back to initial state
        header.classList.remove("shrunk-header");
        header.classList.remove("fixed-header");

        avatar.classList.remove("shrunk-avatar");

        nameDiv.classList.remove("justify-content-left");
        nameDiv.classList.add("justify-content-center");

        devTitleDiv.classList.remove("justify-content-left");
        devTitleDiv.classList.add("justify-content-center");

        document.getElementById("name").classList.remove("shrunk-text");
        document.getElementById("dev-title").classList.remove("shrunk-text");

            // Hide the icon with fade-out effect
            headerIcon.classList.remove("show");
    }
}