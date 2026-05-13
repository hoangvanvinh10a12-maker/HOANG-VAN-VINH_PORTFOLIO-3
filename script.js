const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const siteHeader = document.getElementById('siteHeader');
const leafContainer = document.querySelector('.leaf-layer');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalClose = document.getElementById('modalClose');

let currentProjectImages = [];
let currentImageIndex = 0;

const setTheme = (mode) => {
  document.body.classList.toggle('light', mode === 'light');
  themeLabel.textContent = mode === 'light' ? 'Light' : 'Dark';
  localStorage.setItem('portfolioTheme', mode);
};

const initTheme = () => {
  const saved = localStorage.getItem('portfolioTheme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved || (prefersLight ? 'light' : 'dark'));
};

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 20);
});

const createLeaves = () => {
  if (!leafContainer) return;
  const leafCount = 20;
  for (let i = 0; i < leafCount; i += 1) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const size = 25 + Math.random() * 50;
    const duration = 8 + Math.random() * 6;
    const delay = Math.random() * 4;
    const drift = Math.random() * 150 - 75;
    
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.setProperty('--drift', `${drift}px`);
    leaf.style.top = `${-16 - Math.random() * 20}vh`;
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.opacity = `${0.7 + Math.random() * 0.3}`;
    
    // Apply combined animations
    leaf.style.animation = `fall ${duration}s linear ${delay}s infinite, drift ${duration}s ease-in-out ${delay}s infinite`;
    
    leafContainer.appendChild(leaf);
    
    // Recreate leaf after animation completes for smooth infinite effect
    leaf.addEventListener('animationend', () => {
      leaf.style.top = `${-16 - Math.random() * 20}vh`;
      leaf.style.left = `${Math.random() * 100}%`;
    });
  }
};

const openGallery = (images, index) => {
  currentProjectImages = images;
  currentImageIndex = index;
  modalImage.src = currentProjectImages[currentImageIndex];
  modal.classList.add('show');
};

const closeGallery = () => {
  modal.classList.remove('show');
};

const showNextImage = () => {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
};

const showPrevImage = () => {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
};

document.querySelectorAll('.project-hero').forEach((hero, index) => {
  hero.addEventListener('click', () => {
    const images = JSON.parse(hero.dataset.images);
    openGallery(images, 0);
  });
});

modalClose.addEventListener('click', closeGallery);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeGallery();
});

modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
});

initTheme();
createLeaves();
