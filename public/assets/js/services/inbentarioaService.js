const API_URL = '../../src/controllers/InbentarioController.php';

const inbentarioaService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Inbentarioa: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea inbentarioa lortzean:', error);
            return [];
        }
    },

    // Erregistro bat lortu etiketa bidez
    async getByEtiketa(etiketa) {
        if (typeof etiketa === 'undefined' || etiketa === null) {
            throw new Error('getByEtiketa: etiketa beharrezkoa da');
        }
        try {
            const url = `${API_URL}?etiketa=${encodeURIComponent(etiketa)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Inbentarioa: Errorea inbentarioa lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea inbentarioa (etiketa=${etiketa}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(etiketa, idEkipamendu, erosketaData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa, idEkipamendu, erosketaData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Inbentarioa: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea inbentarioa sortzean:', error);
            throw error;
        }
    },

    // Erregistroa eguneratu
    async update(etiketa, idEkipamendu, erosketaData) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa, idEkipamendu, erosketaData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Inbentarioa: Errorea erregistroa eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea inbentarioa eguneratzean:', error);
            throw error;
        }
    },

    // Erregistroa ezabatu
    async delete(etiketa) {
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Inbentarioa: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea inbentarioa ezabatzean:', error);
            throw error;
        }
    }
};

export default inbentarioaService;
