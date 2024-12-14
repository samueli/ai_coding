import { getLocalStorage } from '../utils/storage.js';
import { saveBookmark } from '../utils/api.js';
import { showToast } from '../utils/ui.js';

export const setupEventListeners = () => {
  const saveButton = document.getElementById('saveButton');
  const toast = document.getElementById('toast');

  saveButton.addEventListener('click', async () => {
    try {
      const settings = await getLocalStorage(['apiEndpoint', 'apiToken']);
      
      if (!settings.apiEndpoint || !settings.apiToken) {
        showToast(toast, 'Please configure API settings first');
        return;
      }

      const pageUrlInput = document.getElementById('pageUrl');
      const selectedContentInput = document.getElementById('selectedContent');
      const notesInput = document.getElementById('notes');

      await saveBookmark(settings.apiEndpoint + "/sparkling/add", settings.apiToken, {
        url: pageUrlInput.value,
        content: selectedContentInput.value,
        notes: notesInput.value
      });

      showToast(toast, 'Bookmark saved successfully!');
      setTimeout(() => window.close(), 2000);
    } catch (error) {
      showToast(toast, 'Error saving bookmark');
      console.error('Error:', error);
    }
  });
};