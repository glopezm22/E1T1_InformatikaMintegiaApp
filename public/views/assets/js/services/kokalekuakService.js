const API_URL = '../../src/controllers/KokalekuController.php';

const kokalekuakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Kokalekuak: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea kokalekua lortzean:', error);
            return [];
        }
    },

    // Erregistro bat lortu etiketa eta hasieraData bidez
    async getById(etiketa, hasieraData) {
        if (typeof etiketa === 'undefined' || etiketa === null) {
            throw new Error('getById: Etiketa beharrezkoa da');
        }
        if (typeof hasieraData === 'undefined' || hasieraData === null) {
            throw new Error('getById: HasieraData beharrezkoa da');
        }
        try {
            const url = `${API_URL}?etiketa=${encodeURIComponent(etiketa)}&hasieraData=${encodeURIComponent(hasieraData)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Kokalekuak: Errorea kokalekuak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea kokalekua (etiketa=${etiketa}, hasieraData=${hasieraData}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro bat lortu idGela bidez
    async getByIdGela(idGela) {
        if (typeof idGela === 'undefined' || idGela === null) {
            throw new Error('getByIdGela: idGela beharrezkoa da');
        }
        try {
            const url = `${API_URL}?idGela=${encodeURIComponent(idGela)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Kokalekuak: Errorea kokalekuak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea kokalekua (idGela=${idGela}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro bat lortu etiketa bidez
    async getByEtiketa(etiketa) {
        if (typeof etiketa === 'undefined' || etiketa === null) {
            throw new Error('getByEtiketa: Etiketa beharrezkoa da');
        }
        try {
            const url = `${API_URL}?etiketa=${encodeURIComponent(etiketa)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Kokalekuak: Errorea kokalekuak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea kokalekua (etiketa=${etiketa}) lortzean:`, error);
            throw error;
        }
    },

    // Erregistro berria sortu
    async create(etiketa, idGela, hasieraData, amaieraData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa, idGela, hasieraData, amaieraData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kokalekuak: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea kokalekua sortzean:', error);
            throw error;
        }
    },

    // Erregistroa eguneratu
    async update(etiketa, idGela, hasieraData, amaieraData) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa, idGela, hasieraData, amaieraData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kokalekuak: Errorea erregistroa eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea kokalekua eguneratzean:', error);
            throw error;
        }
    },

    // Erregistroa ezabatu
    async delete(etiketa, hasieraData) {
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ etiketa, hasieraData })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Kokalekuak: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea kokalekua ezabatzean:', error);
            throw error;
        }
    }
};

export default kokalekuakService;