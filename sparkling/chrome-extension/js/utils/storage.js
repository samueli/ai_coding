// Storage utility functions
export const getStorageData = async (keys) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, resolve);
  });
};

export const setStorageData = async (data) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data, resolve);
  });
};

export const getLocalStorage = async (keys) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, resolve);
  });
};

export const setLocalStorage = async (data) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
};