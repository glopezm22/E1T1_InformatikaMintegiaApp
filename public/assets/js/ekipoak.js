import ekipoakService from './services/ekipoakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const ekipoak = await ekipoakService.getAll();
    renderizarTabla(ekipoak);
});

document.querySelector('#sumarEkipo').addEventListener('click', () => ikusiGehitu());

    document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('.bilatuInput');
    const tabla = document.getElementById('tabla-ekipoak');

    const filasTabla = tabla.querySelector('tbody').rows; 
    const indicesBusqueda = [1, 3, 4];

    inputBusqueda.addEventListener('keyup', function() {
        const filtro = inputBusqueda.value.toLowerCase().trim();

        for (let i = 0; i < filasTabla.length; i++) {
            const fila = filasTabla[i];
            let encontrado = false; 

            for (let j = 0; j < indicesBusqueda.length; j++) {
                const indice = indicesBusqueda[j];
                const celda = fila.cells[indice];

                if (celda) {
                    const textoCelda = celda.textContent.toLowerCase().trim();

                    if (textoCelda.includes(filtro)) {
                        encontrado = true;
                        break; 
                    }
                }
            }

            if (encontrado) {
                fila.style.display = ''; 
            } else {
                fila.style.display = 'none';
            }
        }
    });
});

function renderizarTabla(ekipoak) {
    const tbody = document.querySelector('#tabla-ekipoak tbody');
    tbody.innerHTML = '';

    ekipoak.forEach(e => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.izena}</td>
            <td>${e.deskribapena}</td>
            <td>${e.marka}</td>
            <td>${e.modelo}</td>
            <td>${e.stock}</td>
            <td>${e.idKategoria}</td>
            <td>
                <div class="d-flex gap-3 justify-content-end"> 
                    <button class="btnIkusi btn btn-sm btn-warning" alt='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" alt='Editatu objektua'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" alt='Ezabatu objektua'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
        tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(e));
        tbody.appendChild(tr);
    });
}


function ikusi(ekipoa) {
    const modalBody = document.querySelector('#ekipoakModal .modal-body');
    modalBody.innerHTML = `
    <p><strong>ID:</strong> ${ekipoa.id}</p>
    <p><strong>Izena:</strong> ${ekipoa.izena}</p>
    <p><strong>Deskribapena:</strong> ${ekipoa.deskribapena}</p>
    <p><strong>Marka:</strong> ${ekipoa.marka}</p>
    <p><strong>Modeloa:</strong> ${ekipoa.modelo}</p>
    <p><strong>Stock:</strong> ${ekipoa.stock}</p>
    <p><strong>Kategoria ID:</strong> ${ekipoa.idKategoria}</p>
  `;
    const modal = new bootstrap.Modal(document.getElementById('ekipoakModal'));
    modal.show();
}

function ikusiGehitu() {
    const modal = new bootstrap.Modal(document.getElementById('ekipoakGehituModal'));
    modal.show();
}