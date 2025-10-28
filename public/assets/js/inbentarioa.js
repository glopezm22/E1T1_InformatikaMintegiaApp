import inbentarioaService from './services/inbentarioaService.js'
let produktuaEzabatzeko = null;;
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
            <td>${p.id}</td>
            <td>${p.izena}</td>
            <td>${p.modeloa}</td>
            <td>${p.kategoria}</td>
            <td>${p.kantitatea}</td>
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
        tr.querySelector('.btnIkusi').addEventListener('click', () => ikusiProduktoa(p));

        tr.querySelector('.btnEzabatu').addEventListener('click', () => {
            produktuaEzabatzeko = p;
            document.querySelector('#confirmEzabatuText').textContent = 
                `"${p.izena}" ezabatu nahi duzu?`;
            const modal = new bootstrap.Modal(document.getElementById('confirmEzabatuModal'));
            modal.show();
        });
        tbody.appendChild(tr);
    });
}


function ikusiProduktoa(produktua) {
    const modalBody = document.querySelector('#inbentarioaModal .modal-body');
    modalBody.innerHTML = `
    <p><strong>ID:</strong> ${produktua.id}</p>
    <p><strong>Izena:</strong> ${produktua.izena}</p>
    <p><strong>Modeloa:</strong> ${produktua.modeloa}</p>
    <p><strong>Kategoria:</strong> ${produktua.kategoria}</p>
    <p><strong>Kantitatea:</strong> ${produktua.kantitatea}</p>
    <p><strong>Deskribapena:</strong> ${produktua.deskribapena}</p>
  `;
    const modal = new bootstrap.Modal(document.getElementById('inbentarioaModal'));
    modal.show();
}

document.querySelector('#btnConfirmEzabatu').addEventListener('click', async () => {
    if (produktuaEzabatzeko) {
        const result = await inbentarioaService.delete(produktuaEzabatzeko.id);
        console.log(result);
 
        const berriak = await inbentarioaService.getAll();
        renderizarTabla(berriak);

        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmEzabatuModal'));
        modal.hide();

        produktuaEzabatzeko = null;
    }
});