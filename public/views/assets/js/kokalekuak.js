import kokalekuakService from './services/kokalekuakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const kokalekuak = await kokalekuakService.getAll();
    renderizarTabla(kokalekuak);
});



function renderizarTabla(kokalekuak) {
    const tbody = document.querySelector('#tabla-kokalekuak tbody');
    tbody.innerHTML = '';

    kokalekuak.forEach(k => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${k.etiketa}</td>
            <td>${k.idGela}</td>
            <td>${k.hasieraData}</td>ç
            <td>${k.amaieraData}</td>
            <td>
                <button class="btnIkusi">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </td>
            <td>
                <button class="btnEditatu"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(k));
        tbody.appendChild(tr);
    });
}


function ikusi(kokalekua) {
  const modalBody = document.querySelector('#kokalekuakModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>Etiketa:</strong> ${kokalekua.etiketa}</p>
    <p><strong>ID Gela:</strong> ${kokalekua.idGela}</p>
    <p><strong>Hasiera Data:</strong> ${kokalekua.hasieraData}</p>
    <p><strong>Amaiera Data:</strong> ${kokalekua.amaieraData}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('kokalekuakModal'));
  modal.show();
}