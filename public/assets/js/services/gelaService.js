const API_URL = '../../src/controllers/GelaController.php';

const erabiltzaileakService = {
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

    // Erregistro berria sortu
    async create(nan, izena, abizena, erabiltzailea, pasahitza, rol) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nan, izena, abizena, erabiltzailea, pasahitza, rol })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erabiltzaileak: Errorea gela sortzean.');
            return data;
        } catch (error) {
            console.error('Errorea gela sortzean:', error);
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
            if (!response.ok) throw new Error(data.error || 'Gela: Errorea erregistroa ezabatzean.');
            return data;
        } catch (error) {
            console.error('Errorea gela ezabatzean:', error);
            throw error;
        }
    }
};

export default erabiltzaileakService;