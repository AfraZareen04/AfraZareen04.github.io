//dropdown menu
// this function toggles the visibility of a dropdown menu
function toggleMenu(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    // gets the dropdown element by its ID
    var dropdown = document.getElementById("dropdown");
    // gets the current opacity of the dropdown and converts it to a floating number
    var currentOpacity = parseFloat(window.getComputedStyle(dropdown).opacity);
    // checks if the current opacity is 1 which means the dropdown menu is visible
    if (currentOpacity === 1) {
      // if the dropdown is visible if its 0 then hide it
      dropdown.style.opacity = 0;
      dropdown.style.top = "35px";
      dropdown.style.visibility = "hidden"; // sets the visibility to hidden
    } 
    else {
      // If the dropdown is hidden if its 1 then show it
      dropdown.style.opacity = 1;
      dropdown.style.top = "60px";
      dropdown.style.visibility = "visible"; // sets visibility to make it visible
    }
}
//active scroll navigation
//selects all the section in the document and store them in the sections variable
let sections = document.querySelectorAll('section');
//selects all anchor  within the navigation  and stores them in the navLinks variable
let navLinks = document.querySelectorAll('header nav a');
//sets up a scroll event listener on the window
window.onscroll = () => {
    //iterates through each section 
    sections.forEach(sec => {
        //vertical scroll position
        let top = window.scrollY;
        //adjusting the offset by 150 pixels
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        //checks if the current scroll position is within the range of the current section
        if(top >= offset && top < offset + height){
          navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*='+ id +']').classList.add('active');
          });
        };
      });
    };

//booking confirmation system
function bookingMessage() {
    //gets the element with the ID bookingDone and set is display block making it visible
    document.getElementById("bookingDone").style.display = "block";
    return false;
}

//menu slider
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".containers .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  //handles scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    //captures the initial position of the mouse and scrollbar thumb position
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
    //update thumb position on mouse move
    const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        //ensures that the scrollbar thumb stays within bounded position
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
    }

    //removes the event listeners on mouse up
    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    //adds the event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    });

    //slides the images according to the slide button being clicked
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    //shows or hides slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    //updates the scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    //calls the above two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

//executes the initSlider function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function (){
    const imageList = document.querySelector('.image-list');
    const cards = document.querySelectorAll('.card');
    //currentIndex for current slide as 0
    let currentIndex = 0;
    //function to display the specified slide
    function showSlide(index){
        const newLeft = -index * 100 + '%';
        imageList.style.left = newLeft;
    }
    //function to handle going to the previous slide
    function handlePrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    }
    //function to handle going to the next slide
    function handleNextSlide() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        }
    }
    //adds the event listeners for the previous and next slide buttons
    document.getElementById('prev-slide').addEventListener('click', handlePrevSlide);
    document.getElementById('next-slide').addEventListener('click', handleNextSlide);
});
//adds a resize event listener to re-start the slider when the window is resized
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


//review slider
//keeps the currentSlide at 0
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideContainer = document.getElementById('slide-container');
const dotContainer = document.getElementById('dot-container');
//function to display a specific slide by updating the transform property of the slide container
function showSlide(index) {
    //calculates the transform value based on the current slide index
    const transformValue = -index * 100;
    //sets the transform property to move the slide container to the desired position
    slideContainer.style.transform = `translateX(${transformValue}%)`;
}
//function to create dots for each slide and add click event listeners to navigate to the corresponding slide
function createDots() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
            updateDots();
        });
        dotContainer.appendChild(dot);
    }
    updateDots();
}
//function to update the changes of the dots based on the current slide
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
//calls the createDots function to begin the dots
createDots();
//displays the currentSlide using the showSlide function
showSlide(currentSlide); 

//sendMessage for contacting system
function sendMessage() {
    //displays a message confirmation element with the ID messageSent
    document.getElementById('messageSent').style.display = 'block';
    //resets the content of the form with the ID contactForm
    document.getElementById('contactForm').reset();
}







      



