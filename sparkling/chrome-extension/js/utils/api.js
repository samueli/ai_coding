// API utility functions
export const saveBookmark = async (apiEndpoint, apiToken, data) => {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save sparkling');
    }
    
  return response;
};