function formatTags(tags) {
    return tags.split(',')
        .map(tag => `<span class="card-tag">${tag.trim()}</span>`)
        .join('');
}

function extractUniqueTags(memos) {
    const tags = new Set();
    memos.forEach(memo => {
        memo.ai_tags?.split(',').forEach(tag => tags.add(tag.trim()));
    });
    return Array.from(tags);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
}