import { getLocalStorage } from '../utils/storage.js';

export const initializeUI = async () => {
  const pageUrlInput = document.getElementById('pageUrl');
  const selectedContentInput = document.getElementById('selectedContent');

  try {
    // First try to get data from local storage (for context menu selection)
    const { selectedText, pageUrl } = await getLocalStorage(['selectedText', 'pageUrl']);
    
    console.log('getLocalStorage:', {
      selectedText: selectedText,
      pageUrl: pageUrl
    });

    // If we have stored data from context menu, use it
    if (selectedText && pageUrl) {
      selectedContentInput.value = selectedText;
      pageUrlInput.value = pageUrl;
      // Clear the stored data after using it
      chrome.storage.local.remove(['selectedText', 'pageUrl']);
    } else {
      // Otherwise, get current tab URL (for popup button click)
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      console.log('activeTabs:', tabs);

      if (tabs[0]?.url) {
        pageUrlInput.value = tabs[0].url;
      }
    }
  } catch (error) {
    console.error('Error initializing UI:', error);
  }
};