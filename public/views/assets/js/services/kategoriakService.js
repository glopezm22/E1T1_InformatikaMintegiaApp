const API_URL = '../../src/controllers/KategoriaController.php';

const kategoriakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Kategoriak: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea kategoria lortzean:', error);
            return [];
        }
    },

    // Erregistro bat lortu id bidez
    async getById(id) {
        if (typeof id === 'undefined' || id === null) {
            throw new Error('getById: ID beharrezkoa da');
        }
        try {
            const url = `${API_URL}?id=${encodeURIComponent(id)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Kategoriak: Errorea kategoria lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea kategoria (id=${id}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(izena) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ izena })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kategoriak: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea kategoria sortzean:', error);
            throw error;
        }   
    },

    // Erregistroa eguneratu
    async update(id, izena) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, izena })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kategoriak: Errorea erregistroa eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea kategoria eguneratzean:', error);
            throw error;
        }
    },

    // Erregistroa ezabatu
    async delete(id) {
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kategoriak: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea kategoria ezabatzean:', error);
            throw error;
        }
    }
};

export default kategoriakService;