const API_URL = '../../src/controllers/EtiketakController.php';

const etiketakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Gelak: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea etiketak lortzean:', error);
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
                throw new Error(data.error || 'Etiketak: Errorea etiketak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea etiketak (etiketa=${etiketa}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(idEkipamendu, idGela, kopurua, erosketaData, hasieraData, amaieraData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idEkipamendu, idGela, kopurua, erosketaData, hasieraData, amaieraData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Gelak: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea etiketa sortzean:', error);
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
            if (!response.ok) throw new Error(data.error || 'Etiketak: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea etiketa ezabatzean:', error);
            throw error;
        }
    }
};

export default etiketakService;