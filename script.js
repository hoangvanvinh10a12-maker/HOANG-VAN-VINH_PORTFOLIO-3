const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const siteHeader = document.getElementById('siteHeader');
const leafContainer = document.querySelector('.leaf-layer');

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
  const leafCount = 15;
  for (let i = 0; i < leafCount; i += 1) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const size = 30 + Math.random() * 40;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.setProperty('--delay', `${Math.random() * 3}s`);
    leaf.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);
    leaf.style.setProperty('--scale', `${0.7 + Math.random() * 0.6}`);
    leaf.style.top = `${-14 - Math.random() * 16}vh`;
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.opacity = `${0.65 + Math.random() * 0.28}`;
    leafContainer.appendChild(leaf);
  }
};

initTheme();
createLeaves();
