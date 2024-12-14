import { getLocalStorage } from '../utils/storage.js';

export const initializeUI = async () => {
  const apiEndpointInput = document.getElementById('apiEndpoint');
  const apiTokenInput = document.getElementById('apiToken');

  const settings = await getLocalStorage(['apiEndpoint', 'apiToken']);
  
  if (settings.apiEndpoint) {
    apiEndpointInput.value = settings.apiEndpoint;
  }
  
  if (settings.apiToken) {
    apiTokenInput.value = settings.apiToken;
  }
};