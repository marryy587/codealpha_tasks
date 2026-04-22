let currentIndex = 0;
let images = document.querySelectorAll(".image");

// OPEN LIGHTBOX
function openLightbox(img) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = img.src;
  images = document.querySelectorAll(".image:not([style*='display: none'])");
  currentIndex = Array.from(images).indexOf(img);
}

// CLOSE
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// NEXT
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// PREV
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// FILTER
function filterImages(category) {
  let imgs = document.querySelectorAll(".image");

  imgs.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
}