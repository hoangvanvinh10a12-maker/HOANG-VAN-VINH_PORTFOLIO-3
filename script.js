const leafContainer = document.querySelector('.leaves');
if (leafContainer) {
  const leafCount = 12;
  for (let i = 0; i < leafCount; i += 1) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.setProperty('--delay', `${Math.random() * 2}s`);
    leaf.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    leaf.style.setProperty('--scale', `${0.72 + Math.random() * 0.6}`);
    leaf.style.opacity = `${0.75 + Math.random() * 0.22}`;
    leaf.style.top = `${-12 - Math.random() * 14}vh`;
    leaf.style.left = `${5 + Math.random() * 90}%`;
    leaf.style.width = `${34 + Math.random() * 26}px`;
    leaf.style.height = `${34 + Math.random() * 26}px`;
    leafContainer.appendChild(leaf);
  }
}
