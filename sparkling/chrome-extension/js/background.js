// Background script for handling context menu and storage
import { setLocalStorage } from './utils/storage.js';

const createContextMenu = () => {
  chrome.contextMenus.create({
    id: "saveSelection",
    title: "Save to Sparkling",
    contexts: ["selection"]
  });
};

const handleContextMenuClick = async (info, tab) => {
  if (info.menuItemId === "saveSelection") {
    try {
      console.log('Context Menu Info:', {
        selectionText: info.selectionText,
        pageUrl: tab.url,  // 确保使用 tab.url
        tabId: tab.id
      });
      
      // 使用本地存储替代同步存储
      await setLocalStorage({
        selectedText: info.selectionText,
        pageUrl: tab.url,
        timestamp: Date.now()
      });
      
      // 打开popup窗口
      chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 435,
        height: 600
      });
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  }
};

// Initialize context menu
chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);