class MemoRenderer {
    static renderMemoCard(memo) {
        return `
            <div class="card" onclick="showModal(${JSON.stringify(memo).replace(/"/g, '&quot;')})">
                <div class="card-actions">
                    <button class="card-action-button" onclick="event.stopPropagation(); copyToClipboard('${memo.content}')" title="Copy">
                        <i data-lucide="copy"></i>
                    </button>
                    <button class="card-action-button" onclick="event.stopPropagation(); window.open('${memo.url}', '_blank')" title="Open link">
                        <i data-lucide="external-link"></i>
                    </button>
                    <button class="card-action-button" onclick="event.stopPropagation(); deleteMemo(${memo.id})" title="Delete">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
                <div class="card-content">${memo.content || memo.url || ''}</div>
                <div class="card-footer">
                    <span class="card-date">${new Date(memo.create_time).toLocaleString()}</span>
                </div>
            </div>
        `;
    }

    static renderMemoList(memos, containerId = 'memoList') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = memos.map(memo => this.renderMemoCard(memo)).join('');
        lucide.createIcons();
    }
}