const memoService = new MemoService();
const tagManager = new TagManager();

async function initializeApp() {
    try {
        const memos = await memoService.fetchMemos();
        const tags = extractUniqueTags(memos);
        
        tagManager.setTags(tags);
        MemoRenderer.renderMemoList(memos);
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

async function filterByTag(tag) {
    const filteredMemos = memoService.filterByTag(tag);
    MemoRenderer.renderMemoList(filteredMemos);
}

async function deleteMemo(id) {
    if (confirm('Are you sure you want to delete this memo?')) {
        try {
            const updatedMemos = await memoService.deleteMemo(id);
            MemoRenderer.renderMemoList(updatedMemos);
            const tags = extractUniqueTags(updatedMemos);
            tagManager.setTags(tags);
        } catch (error) {
            console.error('Error deleting memo:', error);
        }
    }
}

async function startChat() {
    // TODO: Implement chat functionality
    alert('Chat functionality coming soon!');
}

async function addMemo() {
    // TODO: Implement add memo functionality
    alert('Add memo functionality coming soon!');
}

// Initialize app when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Close tags popup when clicking outside
document.addEventListener('click', (event) => {
    const popup = document.querySelector('.tags-popup');
    const expandButton = document.querySelector('.tags-expand');
    
    if (popup?.classList.contains('show') && 
        !popup.contains(event.target) && 
        !expandButton?.contains(event.target)) {
        tagManager.toggleExpand();
    }
});