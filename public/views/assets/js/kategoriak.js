import kategoriakService from './services/kategoriakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const kategoriak = await kategoriakService.getAll();
    renderizarTabla(kategoriak);
});



function renderizarTabla(kategoriak) {
    const tbody = document.querySelector('#tabla-kategoriak tbody');
    tbody.innerHTML = '';

    kategoriak.forEach(k => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${k.id}</td>
            <td>${k.izena}</td>
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


function ikusi(kategoria) {
  const modalBody = document.querySelector('#kategoriakModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${kategoria.id}</p>
    <p><strong>Izena:</strong> ${kategoria.izena}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('kategoriakModal'));
  modal.show();
}