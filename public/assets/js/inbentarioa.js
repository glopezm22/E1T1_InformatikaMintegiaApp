import inbentarioaService from './services/inbentarioaService.js';
console.log('Script cargado');
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
                <button class="btnIkusi"><i class="fa-solid fa-eye"></i></button>
            </td>
            <td>
                <button class="btnEditatu"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
    `;
        tbody.appendChild(tr);
    });
}