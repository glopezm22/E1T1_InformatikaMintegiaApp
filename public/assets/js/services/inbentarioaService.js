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
                { id: 1, nombre: 'Mark', modelo: 'Otto', categoria: 'Monitoreoa', cantidad: 5 },
                { id: 2, nombre: 'Jacob', modelo: 'Thornton', categoria: 'Ordenagailua', cantidad: 3 },
                { id: 3, nombre: 'Larry the Bird', modelo: 'Dell', categoria: 'Pantaila', cantidad: 7 }
            ];
            return data;

        } catch (error) {
            console.error('Ezin izan dira produktu inbentariatuak lortu:', error);
            return [];
        }
    }
};

export default inbentarioaService;