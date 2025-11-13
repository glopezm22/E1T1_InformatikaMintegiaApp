const API_URL = '../../src/controllers/GelaController.php';

const gelakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Gelak: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea gelak lortzean:', error);
            return [];
        }
    },
    
    // Erregistro bat lortu ID bidez
    async getById(id) {
        if (typeof id === 'undefined' || id === null) {
            throw new Error('getById: ID beharrezkoa da');
        }
        try {
            const url = `${API_URL}?id=${encodeURIComponent(id)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Gelak: Errorea gelak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea gela (id=${id}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(izena, taldea) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ izena, taldea })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Gelak: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea gela sortzean:', error);
            throw error;
        }
    },

    // Erregistroa eguneratu
    async update(id, izena, taldea) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, izena, taldea })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Gelak: Errorea erregistroa eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea gela eguneratzean:', error);
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
            if (!response.ok) throw new Error(data.error || 'Gelak: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea gela ezabatzean:', error);
            throw error;
        }
    }
};

export default gelakService;