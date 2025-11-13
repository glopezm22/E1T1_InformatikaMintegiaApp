import gelakService from './services/gelakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const gelak = await gelakService.getAll();
    renderizarTabla(gelak);
});



function renderizarTabla(gelak) {
    const tbody = document.querySelector('#tabla-gelak tbody');
    tbody.innerHTML = '';

    gelak.forEach(g => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${g.id}</td>
            <td>${g.izena}</td>
            <td>${g.taldea}</td>
            <td>
                <button class="btnIkusi">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </td>
            <td>
                <button class="btnEditatu"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(g));
        tbody.appendChild(tr);
    });
}


function ikusi(gela) {
  const modalBody = document.querySelector('#gelakModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${gela.id}</p>
    <p><strong>Izena:</strong> ${gela.izena}</p>
    <p><strong>Taldea:</strong> ${gela.taldea}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('gelakModal'));
  modal.show();
}