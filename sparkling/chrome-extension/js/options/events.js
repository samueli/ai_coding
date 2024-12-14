import { setLocalStorage, getLocalStorage } from '../utils/storage.js';
import { showToast } from '../utils/ui.js';

export const setupEventListeners = () => {
  const saveSettingsButton = document.getElementById('saveSettings');
  const viewBookmarksButton = document.getElementById('viewBookmarks');
  const toast = document.getElementById('toast');

  saveSettingsButton.addEventListener('click', async () => {
    const apiEndpointInput = document.getElementById('apiEndpoint');
    const apiTokenInput = document.getElementById('apiToken');
    
    const apiEndpoint = apiEndpointInput.value.trim();
    const apiToken = apiTokenInput.value.trim();

    if (!apiEndpoint || !apiToken) {
      showToast(toast, 'Please fill in all fields');
      return;
    }

    await setLocalStorage({ apiEndpoint, apiToken });
    showToast(toast, 'Settings saved successfully!');
  });

  viewBookmarksButton.addEventListener('click', async () => {
    const {apiEndpoint, apiToken} = await getLocalStorage(['apiEndpoint', 'apiToken']);
    if (!apiEndpoint || !apiToken) {
      showToast(toast, 'Please configure API endpoint first');
      return;
    }
    
    const viewUrl = `https://sparkling.playwithai.fun/?token=${apiToken}`;
    window.open(viewUrl, '_blank');
  });
};