// UI utility functions
export const showToast = (toastElement, message, duration = 3000) => {
  toastElement.textContent = message;
  toastElement.style.display = 'block';
  setTimeout(() => {
    toastElement.style.display = 'none';
  }, duration);
};