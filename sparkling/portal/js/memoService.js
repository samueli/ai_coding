class MemoService {
    constructor() {
        this.memos = [];
        this.apiBaseUrl = 'https://api.playwithai.fun/sparkling/query';
    }

    getTokenFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('token');
    }

    async fetchMemos() {
        try {
            const token = this.getTokenFromUrl();
            if (!token) {
                this.memos = [];
                throw new Error('Please click here for account registration');
            }

            const response = await fetch(`${this.apiBaseUrl}?token=${token}`);
            if (!response.ok) {
                throw new Error('Failed to fetch memos');
            }
            
            const data = await response.json();
            if (data.success && Array.isArray(data.result)) {
                this.memos = data.result;
            } else {
                this.memos = [];
                throw new Error('Invalid data format received from server');
            }
            return this.memos;
        } catch (error) {
            console.error('Error fetching memos:', error);
            throw error;
        }
    }

    async deleteMemo(id) {
        this.memos = this.memos.filter(memo => memo.id !== id);
        return this.memos;
    }

    filterByTag(tag) {
        if (!tag) return this.memos;
        return this.memos.filter(memo => 
            memo.ai_tags && memo.ai_tags.toLowerCase().includes(tag.toLowerCase())
        );
    }
}