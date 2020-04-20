// fadeIn
const fadeIn = (target, duration) => {
  console.log('fadeIn');
  target.style.animationDuration = `${duration / 1000}s`;
  target.classList.add('fade-in');
  target.classList.remove('fade-out');
};
// fadeOut
const fadeOut = (target, duration) => {
  target.style.animationDuration = `${duration / 1000}s`;
  target.classList.add('fade-out');
  target.classList.remove('fade-in');
  setTimeout(() => {
    target.classList.remove('fade-out');
  }, duration);
};
export { fadeIn, fadeOut };