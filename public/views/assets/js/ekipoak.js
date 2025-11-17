import ekipoakService from './services/ekipoakService.js';
import kategoriakService from './services/kategoriakService.js';
import inbentarioaService from './services/inbentarioaService.js';
import gelakService from './services/gelakService.js'
import etiketakService from './services/etiketakService.js'; 

let kategoriak = [];
document.addEventListener('DOMContentLoaded', async () => {
    kategoriak = await kategoriakService.getAll();
    const ekipoak = await ekipoakService.getAll();
    renderizarTabla(ekipoak);
});


// Bilatu Taulan
document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('.bilatuInput');
    const tabla = document.getElementById('tabla-ekipoak');

    const filasTabla = tabla.querySelector('tbody').rows;
    const indicesBusqueda = [1, 3, 4];

    inputBusqueda.addEventListener('keyup', function () {
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

// Taula erakutsi
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
                    <button class="btnIkusi btn btn-sm btn-warning" title='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" title='Editatu ekipoa'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEtiketatu btn btn-sm btn-warning" title='etiketatu ekipoa'><i class="fa-solid fa-tag"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" title='Ezabatu ekipoa'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
        tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(e));
        tr.querySelector('.btnEditatu').addEventListener('click', () => editatu(e));
        tr.querySelector('.btnEtiketatu').addEventListener('click', () => etiketatu(e));
        tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(e));
        tbody.appendChild(tr);
    });
}


//Modal Editatu
function editatu(ekipoa) {
    const modalElement = document.getElementById('ekipoModal');
    const modal = new bootstrap.Modal(modalElement);

    const modalTitle = document.querySelector('#inbentarioaModalLabel');
    modalTitle.textContent = 'Ekipoa editatu';

    const modalBody = document.querySelector('#ekipoModal .modal-body');
    modalBody.innerHTML = `
    <form id="formEditKokaleku" class="needs-validation" novalidate>
      <span class="mensajeError"></span>
      <span class="mensajeSuccess"></span>
      <div class="mb-3" hidden>
        <label class="form-label"><strong>ID</strong></label>
        <input disabled type="text" class="form-control" id="idInput" value="${ekipoa.id}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Izena</strong></label>
        <input type="text" class="form-control" id="izenaInput" value="${ekipoa.izena}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Deskribapena</strong></label>
        <input type="text" class="form-control" id="deskribapenaInput" value="${ekipoa.deskribapena}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Marka</strong></label>
        <input type="text" class="form-control" id="markaInput" value="${ekipoa.marka}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Modeloa</strong></label>
        <input type="text" class="form-control" id="modeloInput" value="${ekipoa.modelo}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Stock</strong></label>
        <input type="text" class="form-control" id="stockInput" value="${ekipoa.stock}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Kategoria</strong></label>
        <select class="form-select" id="kategoriaInput" value="${ekipoa.idKategoria}"></select>
      </div>
    </form>
  `;

    const select = modalBody.querySelector('#kategoriaInput');
    kategoriak.forEach(g => {
        const option = document.createElement('option');
        option.value = g.id;
        option.textContent = g.izena;
        if (g.id === ekipoa.idKategoria) option.selected = true;
        select.appendChild(option);
    });

    modal.show();
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


//Modal ezabatzeko konfirmazioa
function confirmEzabatuModal(item) {
    const modalTitle = document.querySelector('#ezabatuModalLabel');

    modalTitle.textContent = `${item.izena} Ekipoa ezabatuko duzu`;


    const modal = new bootstrap.Modal(document.getElementById('ezabatuModal'));
    modal.show();

    const confirmBtn = document.querySelector('#confirmEzabatuBtn');
    confirmBtn.onclick = async () => {
        try {

            await ekipoakService.delete(item.id);


            modal.hide();
            location.reload();

        } catch (errorea) {
            console.error('Errorea elementua ezabatzean:', errorea);
        }
    };
}

//Gordetzeko datuak
async function gordeDatuak(e) {
    if (e && e.preventDefault) e.preventDefault(); 

    const modalElement = document.getElementById('ekipoModal');
    const form = modalElement.querySelector('form');
    const mensajeError = form.querySelector('.mensajeError');
    const mensajeSuccess = form.querySelector('.mensajeSuccess');

    if (mensajeError) {
        mensajeError.style.display = 'none';
        mensajeError.innerHTML = '';
    }
    if (mensajeSuccess) {
        mensajeSuccess.style.display = 'none';
        mensajeSuccess.innerHTML = '';
    }

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        
        if (mensajeError) {
            mensajeError.style.display = 'block';
            mensajeError.innerHTML = 'Mesedez bete eremu guztiak';
        }
        return;
    }

    try {

        const id = document.querySelector('#idInput').value;
        const izena = document.querySelector('#izenaInput').value;
        const deskribapena = document.querySelector('#deskribapenaInput').value;
        const marka = document.querySelector('#markaInput').value;
        const modeloa = document.querySelector('#modeloInput').value;
        const stock = document.querySelector('#stockInput').value;
        const kategoria = document.querySelector('#kategoriaInput').value;

        await ekipoakService.update(id, izena, deskribapena, marka, modeloa, stock, kategoria);

        if (mensajeSuccess) {
            mensajeSuccess.style.display = 'block';
            mensajeSuccess.innerHTML = 'Ekipoa zuzen aldatu da!';
        }

        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('ekipoModal'));
            modal.hide();
            location.reload();
        }, 2500); 
    } catch (errorea) {
        console.error('Errorea datuak gordetzean:', errorea);
        if (mensajeError) {
            mensajeError.style.display = 'block';
            const errorMsg = errorea.message || 'Errore ezezaguna gertatu da ekipoa sortzean.';
            mensajeError.innerHTML = `Errorea ekipoa sortzean: ${errorMsg}`;
        }
    }
}

document.querySelector('#sumarEkipo').addEventListener('click', gehituEkipoa);

//modala gehitzeko ekipoa
function gehituEkipoa() {
    const modalElement = document.getElementById('ekipoModalAdd');
    const modal = new bootstrap.Modal(modalElement);

    const modalBody = modalElement.querySelector('.modal-body');
    modalBody.innerHTML = `
      <form id="formGehituEkipoa" class="needs-validation" novalidate>
        <span class="mensajeError"></span>
        <span class="mensajeSuccess"></span>
        <div class="mb-3">
          <label class="form-label"><strong>Izena</strong></label>
          <input type="text" class="form-control" id="izenaInput" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Deskribapena</strong></label>
          <input type="text" class="form-control" id="deskribapenaInput" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Marka</strong></label>
          <input type="text" class="form-control" id="markaInput" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Modeloa</strong></label>
          <input type="text" class="form-control" id="modeloInput" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Stock</strong></label>
          <input type="number" min="0" class="form-control" id="stockInput" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Kategoria</strong></label>
          <select class="form-select" id="kategoriaInput"></select>
        </div>
      </form>
    `;

    const select = modalBody.querySelector('#kategoriaInput');
    kategoriak.forEach(k => {
        const option = document.createElement('option');
        option.value = k.id;
        option.textContent = k.izena;
        select.appendChild(option);
    });

    const btnGordeBerria = modalElement.querySelector('#btnGordeBerria');
    btnGordeBerria.onclick = sortuEkipoa;

    modal.show();
}


//ekipoa sortzeko
async function sortuEkipoa(e) {
    if (e && e.preventDefault) e.preventDefault(); 
    
    const form = document.querySelector('#formGehituEkipoa');
    
    const mensajeError = form.querySelector('.mensajeError');
    const mensajeSuccess = form.querySelector('.mensajeSuccess');

    if (mensajeError) {
        mensajeError.style.display = 'none';
        mensajeError.innerHTML = '';
    }
    if (mensajeSuccess) {
        mensajeSuccess.style.display = 'none';
        mensajeSuccess.innerHTML = '';
    }

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        
        if (mensajeError) {
            mensajeError.style.display = 'block';
            mensajeError.innerHTML = 'Mesedez bete eremu guztiak';
        }
        return;
    }

    const izena = document.querySelector('#izenaInput').value.trim();
    const deskribapena = document.querySelector('#deskribapenaInput').value.trim();
    const marka = document.querySelector('#markaInput').value.trim();
    const modelo = document.querySelector('#modeloInput').value.trim();
    const stock = document.querySelector('#stockInput').value.trim();
    const kategoria = document.querySelector('#kategoriaInput').value;

    try {
        await ekipoakService.create({
            izena,
            deskribapena,
            marka,
            modelo,
            stock,
            idKategoria: kategoria
        });

        if (mensajeSuccess) {
            mensajeSuccess.style.display = 'block';
            mensajeSuccess.innerHTML = 'Ekipoa zuzen sortu da!';
        }
        
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('ekipoModalAdd'));
            modal.hide();
            location.reload();
        }, 2500); 

    } catch (errorea) {
        console.error('Errorea ekipoa sortzean:', errorea);
        
        if (mensajeError) {
            mensajeError.style.display = 'block';
            const errorMsg = errorea.message || 'Errore ezezaguna gertatu da ekipoa sortzean.';
            mensajeError.innerHTML = `Errorea ekipoa sortzean: ${errorMsg}`;
        }
    }
}

//Modala etiketatzeko ekipo bat
async function etiketatu(ekipoa) {
    const stockErabilgarria = await inbentarioaService.getEtiketatuGabe(ekipoa.id);
    const modalElement = document.getElementById('etiketatuModal'); 
    const modal = new bootstrap.Modal(modalElement);

    const modalBody = modalElement.querySelector('.modal-body');
    modalBody.innerHTML = `
      <form id="etiketaForm" class="needs-validation" novalidate>
        <span class="mensajeError"></span>
        <span class="mensajeSuccess"></span>
        <div class="mb-3">
          <label class="form-label fw-bold">Ekipoa</label>
          <input type="text" class="form-control" value="${ekipoa.izena}" disabled>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Kokapena</label>
          <select id="selectKokapena" class="form-select" required>
            <option value="">Aukeratu gela bat...</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Erosketa data</label>
          <input type="date" id="etiketaData" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Hasiera data</label>
          <input type="date" id="hasieraData" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Amaiera data</label>
          <input type="date" id="amaieraData" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Kopurua</label>
          <small class="text-muted">Stock erabilgarria: ${stockErabilgarria.etiketatu_gabe}</small>
          <input type="number" id="etiketaKopurua" class="form-control" min="1" max="${stockErabilgarria.etiketatu_gabe}" value="1" required>
          
        </div>
      </form>
    `;


    const select = modalBody.querySelector('#selectKokapena');
    try {
        const gelak = await gelakService.getAll();
        gelak.forEach(g => {
            const option = document.createElement('option');
            option.value = g.id;
            option.textContent = g.izena;
            select.appendChild(option);
        });
    } catch (error) {
        alert('Errorea gelak kargatzean');
    }

    const btnGorde = modalElement.querySelector('#btnGordeEtiketa');
    btnGorde.onclick = async () => {
      const form = document.querySelector('#etiketaForm');
      const mensajeError = form.querySelector('.mensajeError');
      const mensajeSuccess = form.querySelector('.mensajeSuccess');

        
    if (mensajeError) {
        mensajeError.style.display = 'none';
        mensajeError.innerHTML = '';
    }
    if (mensajeSuccess) {
        mensajeSuccess.style.display = 'none';
        mensajeSuccess.innerHTML = '';
    }

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        
        if (mensajeError) {
            mensajeError.style.display = 'block';
            mensajeError.innerHTML = 'Mesedez bete eremu guztiak';
        }
        return;
    }

        const idGela = select.value;
        const erosketaData = document.querySelector('#etiketaData').value;
        const hasieraData = document.querySelector('#hasieraData').value;
        const amaieraData = document.querySelector('#amaieraData').value;
        const kopurua = parseInt(document.querySelector('#etiketaKopurua').value) || 1;
        
        if (kopurua > ekipoa.stock) {
            alert(`Kopurua ezin da handiagoa izan stock baino (${ekipoa.stock})`);
            return;
        }

        try {
             await etiketakService.create(
                ekipoa.id, 
                idGela, 
                kopurua, 
                erosketaData,
                hasieraData,
                amaieraData
            );
            
        if (mensajeSuccess) {
            mensajeSuccess.style.display = 'block';
            mensajeSuccess.innerHTML = 'Etiketa zuzen sortu da!';
        }
        
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('etiketatuModal'));
            modal.hide();
            location.reload();
        }, 2500); 
        } catch (error) {
            showAlert('Errorea sortzean', 'danger');
        }
    };

    modal.show();
}


document.querySelector('#btnGorde').addEventListener('click', gordeDatuak);

