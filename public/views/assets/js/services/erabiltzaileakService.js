const API_URL = '../../src/controllers/ErabiltzaileController.php';

const erabiltzaileakService = {
    // Erregistro guztiak lortu
    async getAll() {
        try {
            const response = await fetch(API_URL, { method: 'GET' });
            if (!response.ok) throw new Error('Erabiltzaileak: Errorea datuak lortzean.');
            return await response.json();
        } catch (error) {
            console.error('Errorea erabiltzaileak lortzean:', error);
            return [];
        }
    },

    // Erregistro bat lortu NAN bidez
    async getByNan(nan) {
        if (typeof nan === 'undefined' || nan === null) {
            throw new Error('getByNan: nan beharrezkoa da');
        }
        try {
            const url = `${API_URL}?nan=${encodeURIComponent(nan)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erabiltzaileak: Errorea datuak lortzean.');
            }
            return data;
        } catch (error) {
            console.error(`Errorea erabiltzailea (NAN: ${nan}) lortzean:`, error);
            return null;
        }
    },

    // Erregistro berria sortu
    async create(nan, izena, abizena, erabiltzailea, pasahitza, rola) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nan, izena, abizena, erabiltzailea, pasahitza, rola })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erabiltzaileak: Errorea erregistroa sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea erabiltzailea sortzean:', error);
            throw error;
        }
    },

    // Erregistroa eguneratu
    async update(nan, izena, abizena, erabiltzailea, rola) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nan, izena, abizena, erabiltzailea, rola })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erabiltzaileak: Errorea erabiltzailea eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea erabiltzailea eguneratzean:', error);
            throw error;
        }
    },

    // Pasahitza eguneratu
    async updatePasahitza(nan, pasahitza, pasahitzaKonfirm) {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nan, pasahitza, pasahitzaKonfirm })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erabiltzaileak: Errorea pasahitza eguneratzean.');
            return data;
        } catch (error) {
            console.error('Errorea pasahitza eguneratzean:', error);
            throw error;
        }
    },

    // Erregistroa ezabatu
    async delete(nan) {
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nan })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erabiltzaileak: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea erabiltzailea ezabatzean:', error);
            throw error;
        }
    }
};

export default erabiltzaileakService;