import inbentarioaService from './services/inbentarioaService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const produktuak = await inbentarioaService.getAll();
    renderizarTabla(produktuak);
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
                <button class="btnIkusi btn btn-sm btn-warning">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </td>
            <td>
                <button class="btnEditatu btn btn-sm btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
            <td>
                <button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
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