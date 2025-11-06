import inbentarioaService from './services/inbentarioaService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const produktuak = await inbentarioaService.getAll();
    renderizarTabla(produktuak);
});

document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('.bilatuInput');
    const tabla = document.getElementById('tabla-inbentarioa');
    const filasTabla = tabla.querySelector('tbody').rows; 

    inputBusqueda.addEventListener('keyup', function() {
        const filtro = inputBusqueda.value.toLowerCase().trim();

        for (let i = 0; i < filasTabla.length; i++) {
            const celdaEtiketa = filasTabla[i].cells[0]; 

            if (celdaEtiketa) {
                const textoEtiketa = celdaEtiketa.textContent.toLowerCase().trim();

                if (textoEtiketa.includes(filtro)) {
                    filasTabla[i].style.display = ''; 
                } else {
                    filasTabla[i].style.display = 'none';
                }
            }
        }
    });
});


function renderizarTabla(produktuak) {
    const tbody = document.querySelector('#tabla-inbentarioa tbody');
    tbody.innerHTML = '';

    produktuak.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.etiketa}</td>
            <td>${p.idEkipamendu}</td>
            <td>${p.erosketaData}</td>
            <td>
                <div class="d-flex gap-3 justify-content-end"> 
                    <button class="btnIkusi btn btn-sm btn-warning" alt='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" alt='Editatu objektua'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" alt='Ezabatu objektua'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(p));
        tbody.appendChild(tr);
    });
}


function ikusi(produktua) {
  const modalBody = document.querySelector('#inbentarioaModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>Etiketa:</strong> ${produktua.etiketa}</p>
    <p><strong>Ekipamendu ID:</strong> ${produktua.idEkipamendu}</p>
    <p><strong>Erosketa data:</strong> ${produktua.erosketaData}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('inbentarioaModal'));
  modal.show();
}