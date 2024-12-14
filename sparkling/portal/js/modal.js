function showModal(memo) {
    const modal = document.getElementById('memoModal');
    const detailsContainer = document.getElementById('memoDetails');
    
    detailsContainer.innerHTML = `
        <div class="memo-detail">
            <h3>Content</h3>
            <p>${memo.content}</p>
            
            <h3>Notes</h3>
            <p>${memo.notes}</p>
            
            <h3>AI Summary</h3>
            <p>${memo.ai_summary}</p>
            
            <h3>Tags</h3>
            <div class="card-tags">
                ${formatTags(memo.ai_tags)}
            </div>
            
            <div class="memo-actions" style="margin-top: 1rem;">
                <button class="button" onclick="window.open('${memo.url}', '_blank')">
                    <i data-lucide="external-link"></i>
                    Open Link
                </button>
                <button class="button" onclick="copyToClipboard('${memo.content}')">
                    <i data-lucide="copy"></i>
                    Copy Content
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('memoModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('memoModal');
    if (event.target === modal) {
        closeModal();
    }
}