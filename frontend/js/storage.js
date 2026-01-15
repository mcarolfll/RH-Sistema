const storage = {
    keys: {
        CANDIDATOS: 'rh_candidatos',
        EMPRESAS: 'rh_empresas'
    },

    getAll(key) {
        const data = localStorage.getItem(key);
        if (!data) {
            return [];
        }
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    },

    saveAll(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    },

    getNextId(items) {
        if (!items.length) {
            return 1;
        }
        return items.reduce((max, item) => {
            const currentId = typeof item.id === 'number' ? item.id : 0;
            return currentId > max ? currentId : max;
        }, 0) + 1;
    },

    create(key, data) {
        const items = this.getAll(key);
        const id = this.getNextId(items);
        const newItem = { id, ...data };
        items.push(newItem);
        this.saveAll(key, items);
        return newItem;
    },

    update(key, id, data) {
        const items = this.getAll(key);
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
            return null;
        }
        const updated = { ...items[index], ...data, id };
        items[index] = updated;
        this.saveAll(key, items);
        return updated;
    },

    remove(key, id) {
        const items = this.getAll(key);
        const filtered = items.filter(item => item.id !== id);
        this.saveAll(key, filtered);
        return filtered;
    }
};

window.storage = storage;

