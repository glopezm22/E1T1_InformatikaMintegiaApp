const API_URL = '../api/inbentarioa.php'; //Cuando tengamos la ruta del back la cambiamos

const inbentarioaService = {
    async getAll() {
        try {
            //DESCOMENTAR CUANDO TENGAMOS BACK
            // const response = await fetch('API_URL');
            // if (!response.ok) throw new Error('Errorea zerbitzarian');
            // return await response.json();

            //BORRAR EL CONST DATA Y RETURN DATA CUANDO TENGAMOS BACK
            const data = [
                { id: 1, izena: 'Mark', modeloa: 'Otto', kategoria: 'Monitoreoa', kantitatea: 5, deskribapena: 'Describapena' },
                { id: 2, izena: 'Jacob', modeloa: 'Thornton', kategoria: 'Ordenagailua', kantitatea: 3, deskribapena: 'Describapena'},
                { id: 3, izena: 'Larry the Bird', modeloa: 'Dell', kategoria: 'Pantaila', kantitatea: 7, deskribapena: 'Describapena' }
            ];
            return data;

        } catch (error) {
            console.error('Ezin izan dira produktu inbentariatuak lortu:', error);
            return [];
        }
    },

    async getById(id) {
        try {
            // DESCOMENTAR CUANDO TENGAMOS BACK
            // const response = await fetch(`${API_URL}?id=${id}`);
            // if (!response.ok) throw new Error('Errorea datuak eskuratzean');
            // return await response.json();

            // BORRAR CUANDO TENGAMOS BACK
            const data = await this.getAll();
            const produktua = data.find(p => p.id === id);
            return produktua || null;
        } catch (error) {
            console.error('Ezin izan da produktua aurkitu:', error);
            return null;
        }
    },

    async buscarPorEtiqueta(etiqueta, valor) {
        try {
            // DESCOMENTAR CUANDO TENGAMOS BACK
            // const response = await fetch(`${API_URL}?${etiqueta}=${encodeURIComponent(valor)}`);
            // if (!response.ok) throw new Error('Errorea bilatzean');
            // return await response.json();

            // BORRAR CUANDO TENGAMOS BACK
            const data = await this.getAll();
            const filtratuak = data.filter(p => 
                String(p[etiqueta]).toLowerCase().includes(String(valor).toLowerCase())
            );
            return filtratuak;
        } catch (error) {
            console.error('Errorea bilatzean:', error);
            return [];
        }
    },

    async delete(id) {
        try {
            // DESCOMENTAR CUANDO TENGAMOS BACK
            // const response = await fetch(`${API_URL}?id=${id}`, {
            //     method: 'DELETE'
            // });
            // if (!response.ok) throw new Error('Errorea elementua ezabatzean');
            // return await response.json();

            //BORRAR CUANDO TENGAMOS BACK
            console.log(`Elemento con id ${id} ezabatuko litzateke (simulazioa).`);
            return { success: true, message: `Elemento ${id} ezabatuta (simulazioa)` };

        } catch (error) {
            console.error('Ezin izan da elementua ezabatu:', error);
            return { success: false, message: error.message };
        }
    }
};

export default inbentarioaService;