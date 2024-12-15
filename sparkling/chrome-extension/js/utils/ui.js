// UI utility functions
export const showToast = (toastElement, message, duration = 3000) => {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  
  setTimeout(() => {
    toastElement.classList.remove('show');
  }, duration);
};