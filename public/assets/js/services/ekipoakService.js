const API_URL = '../api/ekipoak.php'; //Cuando tengamos la ruta del back la cambiamos

const ekipoakService = {
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
    }
};

export default ekipoakService;