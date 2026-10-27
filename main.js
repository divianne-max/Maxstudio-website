// Mobile Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburgerButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburgerButton.classList.toggle("fixed");
  });
});

// IMAGE SLIDER

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;

//initializeSlider();
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
  if(slides.length > 0){
    slides[slideIndex].classList.add("displaySlide");
   }
}
function showSlide(index){
    
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}
function prevSlide(){
    slideIndex--;
    showSlide(slideIndex);
}
function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

// Fullscreen viewer
document.addEventListener('DOMContentLoaded', function () {
  const fullscreenViewer = document.getElementById('fullscreenViewer');
  const fullscreenImage = document.getElementById('fullscreenImage');
  const galleryImages = document.querySelectorAll('.slides .slide');

  if (fullscreenViewer && fullscreenImage && galleryImages.length) {
    let fullscreenIndex = 0;

    // Zoom variables
    let currentScale = 1;
    const minScale = 1;
    const maxScale = 5;
    const scaleStep = 0.1;

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        fullscreenIndex = index;
        fullscreenImage.src = img.src;
        fullscreenViewer.style.display = 'flex';
      
    // Reset zoom when opening fullscreen
        currentScale = 1;
        fullscreenImage.style.transform = 'scale(1)';
        fullscreenImage.style.transformOrigin = 'center center';
      });
    });

    // Close fullscreen function
    window.closeFullscreen = function () {
      fullscreenViewer.style.display = 'none';
      currentScale = 1;
      fullscreenImage.style.transform = 'scale(1)';
      fullscreenImage.style.transformOrigin = 'center center';
    };

    // Navigation functions
    function showFullscreenImage(index) {
      if (index < 0) {
        fullscreenIndex = galleryImages.length - 1;
      } else if (index >= galleryImages.length) {
        fullscreenIndex = 0;
      } else {
        fullscreenIndex = index;
      }
      fullscreenImage.src = galleryImages[fullscreenIndex].src;

      // Reset zoom on image change
      currentScale = 1;
      fullscreenImage.style.transform = 'scale(1)';
      fullscreenImage.style.transformOrigin = 'center center';
    }

    window.prevSlideFullscreen = function () {
      showFullscreenImage(fullscreenIndex - 1);
    };

    window.nextSlideFullscreen = function () {
      showFullscreenImage(fullscreenIndex + 1);
    };

    // Scroll wheel zoom listener - MUST be inside here after fullscreenImage is defined
    fullscreenImage.addEventListener('wheel', function (e) {
      if (fullscreenViewer.style.display !== 'flex') return;

      e.preventDefault();

      const rect = fullscreenImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      fullscreenImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;

      if (e.deltaY < 0) {
        currentScale = Math.min(currentScale + scaleStep, maxScale);
      } else {
        currentScale = Math.max(currentScale - scaleStep, minScale);
      }

      fullscreenImage.style.transform = `scale(${currentScale})`;
    });
  }
}); 

// Mobile fullscreen viewer
document.addEventListener('DOMContentLoaded', function () {
  const fullscreenViewer = document.getElementById('fullscreenViewer');

  if (fullscreenViewer) {
    let touchStartX = 0;
    let touchEndX = 0;

    fullscreenViewer.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    fullscreenViewer.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      const swipeThreshold = 50;

      if (Math.abs(delta) > swipeThreshold) {
        if (delta > 0) {
          window.prevSlideFullscreen();
        } else {
          window.nextSlideFullscreen();
        }
      }
    });
  }
});

// Search Bar
let availableKeywords = [
    { name: 'Home', url: 'index.html' },
    { name: 'Foto-video', url: 'foto-video.html' },
    { name: 'Date Contact', url: 'index.html#contact-us' },
    { name: 'Sonorizare', url: 'sonorizare.html' }
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;

    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            return keyword.name.toLowerCase().includes(input.toLowerCase());
        });
    }

    display(result);

    if(!result.length){
        resultsBox.innerHTML = '';
    }
}

function display(result){
    const content = result.map((item)=>{
        return `<li onclick="selectInput('${item.name}', '${item.url}')">${item.name}</li>`;
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(name, url){
    inputBox.value = '';
    resultsBox.innerHTML = '';
    window.location.href = url;
}

// Share Buttons
const link = window.location.href;
const msg = encodeURIComponent('Hey, I found this article');
const title = encodeURIComponent(document.querySelector('title').textContent);

console.log([link, msg, title]);

const fb = document.querySelector('.facebook');
fb.href = `https://www.facebook.com/share.php?u=${link}`;

const twitter = document.querySelector('.twitter');
twitter.href = `http://www.twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

const reddit = document.querySelector('.reddit');
reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;

const whatsapp = document.querySelector('.whatsapp');
whatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${msg} ${link}`)}`;
