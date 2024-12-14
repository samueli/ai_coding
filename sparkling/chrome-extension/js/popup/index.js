import { initializeUI } from './ui.js';
import { setupEventListeners } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  setupEventListeners();
});