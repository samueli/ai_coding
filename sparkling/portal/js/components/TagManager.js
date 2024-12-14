class TagManager {
    constructor() {
        this.allTags = [];
        this.activeTag = null;
        this.isExpanded = false;
    }

    setTags(tags) {
        this.allTags = tags.sort((a, b) => a.localeCompare(b));
        this.render();
    }

    getTopTags(count = 5) {
        return this.allTags.slice(0, count);
    }

    getRemainingTags(count = 5) {
        return this.allTags.slice(count);
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        const popup = document.querySelector('.tags-popup');
        popup.classList.toggle('show');
    }

    handleTagClick(tag) {
        this.activeTag = this.activeTag === tag ? null : tag;
        this.render();
        if (this.activeTag) {
            window.filterByTag(tag);
        } else {
            window.initializeApp();
        }
    }

    render() {
        const container = document.getElementById('tagsContainer');
        const topTags = this.getTopTags();
        const remainingTags = this.getRemainingTags();

        container.innerHTML = `
            <div class="tags-list">
                ${topTags.map(tag => this.renderTag(tag)).join('')}
                ${remainingTags.length > 0 ? `
                    <button class="tags-expand" onclick="tagManager.toggleExpand()">
                        <i data-lucide="plus-circle"></i>
                        ${remainingTags.length} more
                    </button>
                    <div class="tags-popup">
                        ${remainingTags.map(tag => this.renderTag(tag)).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        lucide.createIcons();
    }

    renderTag(tag) {
        const isActive = this.activeTag === tag;
        return `
            <div class="tag ${isActive ? 'active' : ''}" 
                 onclick="tagManager.handleTagClick('${tag}')">
                ${tag}
            </div>
        `;
    }
}