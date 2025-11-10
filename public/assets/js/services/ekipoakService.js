const API_URL = '../../src/controllers/EkipoController.php';

const ekipoakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Ekipamendua: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea ekipoa lortzean:', error);
            return [];
        }
    },

    // Erregistro bat lortu ID bidez
    async getById(id) {
        if (typeof id === 'undefined' || id === null) {
            throw new Error('getById: id beharrezkoa da');
        }
        try {
            const url = `${API_URL}?id=${encodeURIComponent(id)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Ekipamendua: Errorea ekipoa lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea ekipoa (id=${id}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(data) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Ekipamendua: Errorea erregistroa sortzean.');
            return result;
        } catch (error) {
            console.error('Errorea ekipoa sortzean:', error);
            throw error;
        }
    },

    async update(id, izena, deskribapena, marka, modelo, stock, idKategoria) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, izena, deskribapena, marka, modelo, stock, idKategoria })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Ekipamendua: Errorea eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea ekipoa eguneratzean:', error);
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
            if (!response.ok) throw new Error(data.error || 'Ekipamendua: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea ekipoa ezabatzean:', error);
            throw error;
        }
    }
};

export default ekipoakService;