import ekipoakService from './services/ekipoakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const produktuak = await ekipoakService.getAll();
    renderizarTabla(produktuak);
});



function renderizarTabla(produktuak) {
    const tbody = document.querySelector('#tabla-ekipoak tbody');
    tbody.innerHTML = '';

    produktuak.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.izena}</td>
            <td>${p.modeloa}</td>
            <td>${p.kategoria}</td>
            <td>${p.kantitatea}</td>
            <td>
                <button class="btnIkusi">
                    <i class="fa-solid fa-eye"></i>
                </button>
            </td>
            <td>
                <button class="btnEditatu"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusiProduktoa(p));
        tbody.appendChild(tr);
    });
}


function ikusiProduktoa(produktua) {
  const modalBody = document.querySelector('#ekipoakModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${produktua.id}</p>
    <p><strong>Izena:</strong> ${produktua.izena}</p>
    <p><strong>Modeloa:</strong> ${produktua.modeloa}</p>
    <p><strong>Kategoria:</strong> ${produktua.kategoria}</p>
    <p><strong>Kantitatea:</strong> ${produktua.kantitatea}</p>
    <p><strong>Deskribapena:</strong> ${produktua.deskribapena}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('ekipoakModal'));
  modal.show();
}