// Father Bae Tribute Project - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initializeGallery();
  initializeTestimonialSlider();
  initializeScrollAnimation();
  
  // Add Korean/English language toggle if needed
  initializeLanguageToggle();
});

// Gallery lightbox functionality
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const caption = this.querySelector('img').alt;
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="close-lightbox">&times;</span>
          <img src="${imgSrc}" alt="${caption}">
          <p class="caption">${caption}</p>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Close lightbox on click
      lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
      });
      
      // Close on click outside image
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });
}

// Testimonial slider
function initializeTestimonialSlider() {
  const testimonialContainer = document.querySelector('.testimonial-slider');
  
  if (!testimonialContainer) return;
  
  const testimonials = testimonialContainer.querySelectorAll('.testimonial');
  let currentIndex = 0;
  
  // Hide all testimonials except the first one
  testimonials.forEach((testimonial, index) => {
    if (index !== 0) {
      testimonial.style.display = 'none';
    }
  });
  
  // Create navigation dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'slider-dots';
  
  testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => showTestimonial(index));
    dotsContainer.appendChild(dot);
  });
  
  testimonialContainer.appendChild(dotsContainer);
  
  // Create next/prev buttons
  const prevButton = document.createElement('button');
  prevButton.className = 'slider-nav prev';
  prevButton.innerHTML = '&lsaquo;';
  prevButton.addEventListener('click', () => showTestimonial(currentIndex - 1));
  
  const nextButton = document.createElement('button');
  nextButton.className = 'slider-nav next';
  nextButton.innerHTML = '&rsaquo;';
  nextButton.addEventListener('click', () => showTestimonial(currentIndex + 1));
  
  testimonialContainer.appendChild(prevButton);
  testimonialContainer.appendChild(nextButton);
  
  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Handle wrapping
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    
    // Hide current testimonial
    testimonials[currentIndex].style.display = 'none';
    dotsContainer.querySelectorAll('.dot')[currentIndex].classList.remove('active');
    
    // Show new testimonial
    testimonials[index].style.display = 'block';
    dotsContainer.querySelectorAll('.dot')[index].classList.add('active');
    
    currentIndex = index;
  }
  
  // Auto-advance the slider every 5 seconds
  setInterval(() => {
    showTestimonial(currentIndex + 1);
  }, 5000);
}

// Scroll animation
function initializeScrollAnimation() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Language toggle (Korean/English)
function initializeLanguageToggle() {
  const langToggle = document.querySelector('.language-toggle');
  
  if (!langToggle) return;
  
  langToggle.addEventListener('click', function() {
    document.body.classList.toggle('korean');
    
    // Update toggle text
    const isKorean = document.body.classList.contains('korean');
    this.textContent = isKorean ? 'English' : '한국어';
    
    // Toggle visibility of language-specific elements
    const koreanElements = document.querySelectorAll('.korean-text');
    const englishElements = document.querySelectorAll('.english-text');
    
    koreanElements.forEach(el => {
      el.style.display = isKorean ? 'block' : 'none';
    });
    
    englishElements.forEach(el => {
      el.style.display = isKorean ? 'none' : 'block';
    });
  });
} 