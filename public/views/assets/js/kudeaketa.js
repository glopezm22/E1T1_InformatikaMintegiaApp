import kokalekuakService from './services/kokalekuakService.js';
import kategoriakService from './services/kategoriakService.js';
import gelakService from './services/gelakService.js';

let kokalekuak = [];
let kategoriak = [];
let gelak = [];
//Kargatzen ditugu datuak
//aldagai globaletan eskaerak ez erreplikatzeko tauletan eta modaletan
document.addEventListener('DOMContentLoaded', async () => {
  try {
    kokalekuak = await kokalekuakService.getAll();
    kategoriak = await kategoriakService.getAll();
    gelak = await gelakService.getAll();

    renderizarKokalekuak(kokalekuak);
    renderizarKategoriak(kategoriak);
    renderizarGelak(gelak);

    document.querySelector('#sumarGela').addEventListener('click', sortuGela);
    document.querySelector('#sumarKategoria').addEventListener('click', sortuKategoria);
  } catch (errorea) {
    console.error('Errorea datuak kargatzean:', errorea);
  }
});

//TAULAK

//Taula kokalekua
function renderizarKokalekuak(kokalekuak) {
  const tbody = document.querySelector('#tabla-kokalekuak tbody');
  tbody.innerHTML = '';

  kokalekuak.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.etiketa}</td>
      <td>${p.idGela}</td>
      <td>${p.hasieraData || '-'}</td>
      <td>${p.amaieraData || '-'}</td>
      <td>
        <div class="d-flex gap-3 justify-content-end">
          <button aria-label="Editatu" title="Editatu" class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button aria-label="Ezabatu" title="Ezabatu" class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tr.querySelector('.btnEditatu').addEventListener('click', () => editatuKokaleku(p));
    tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(p));
    tbody.appendChild(tr);
  });
}

//Taula kategoria
function renderizarKategoriak(kategoriak) {
  const tbody = document.querySelector('#tabla-kategoriak tbody');
  tbody.innerHTML = '';

  kategoriak.forEach(k => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${k.id}</td>
      <td>${k.izena}</td>
      <td>
        <div class="d-flex gap-3 justify-content-end">
          <button aria-label="Editatu" title="Editatu" class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button aria-label="Ezabatu" title="Ezabatu" class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td> 
    `;
    tr.querySelector('.btnEditatu').addEventListener('click', () => editatuKategoria(k));
    tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(k));
    tbody.appendChild(tr);
  });
}

//Taula gela
function renderizarGelak(gelak) {
  const tbody = document.querySelector('#tabla-gelak tbody');
  tbody.innerHTML = '';

  gelak.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.izena}</td>
      <td>${g.taldea}</td>
      <td>
        <div class="d-flex gap-3 justify-content-end">
          <button aria-label="Editatu" title="Editatu" class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button aria-label="Ezabatu" title="Ezabatu" class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tr.querySelector('.btnEditatu').addEventListener('click', () => editatuGela(g));
    tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(g));
    tbody.appendChild(tr);
  });
}

//MODALAK 

//Modal kokaleku
function editatuKokaleku(kokalekua) {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'kokaleku';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kokalekua editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="etiketaInput" class="form-label"><strong>Etiketa</strong></label>
        <input disabled type="text" class="form-control" id="etiketaInput" value="${kokalekua.etiketa}">
      </div>
      <div class="mb-3">
        <label for="idGelaInput" class="form-label"><strong>Gela</strong></label>
        <select class="form-select" id="idGelaInput" value="${kokalekua.idGela}"></select>
      </div>
      <div class="mb-3">
        <label for="hasieraInput" class="form-label"><strong>Hasiera data</strong></label>
        <input disabled type="date" class="form-control" id="hasieraInput" value="${kokalekua.hasieraData}">
      </div>
      <div class="mb-3">
        <label for="amaieraInput" class="form-label"><strong>Amaiera data</strong></label>
        <input type="date" class="form-control" id="amaieraInput" value="${kokalekua.amaieraData}" required>
      </div>
    </form>
  `;
  //Gelak kargatzen dira izena id-aren ordez agertzeko, selected aukera idGelaren berdina dena
  const select = modalBody.querySelector('#idGelaInput');
  gelak.forEach(g => {
    const option = document.createElement('option');
    option.value = g.id;
    option.textContent = g.izena;
    if (g.id === kokalekua.idGela) option.selected = true;
    select.appendChild(option);
  });
  
  modal.show();
}

//Modal gela
function editatuGela(gela) {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'gela';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Gela editatu';


  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
      <form id="formEditKokaleku" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="idGelaInput" class="form-label"><strong>ID</strong></label>
          <input disabled type="text" class="form-control" id="idGelaInput" value="${gela.id}">
        </div>
        <div class="mb-3">
          <label for="izenaInput" class="form-label"><strong>Izena</strong></label>
          <input type="text" class="form-control" id="izenaInput" value="${gela.izena}" required>
        </div>
        <div class="mb-3">
          <label for="taldeaInput" class="form-label"><strong>Taldea</strong></label>
          <input type="text" class="form-control" id="taldeaInput" value="${gela.taldea}" required>
        </div>
      </form>
  `;

  modal.show();
}

//Modal Kategoria
function editatuKategoria(kategoria) {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'kategoria';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kategoria editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="idKategoriaInput" class="form-label"><strong>ID</strong></label>
        <input disabled type="text" class="form-control" id="idKategoriaInput" value="${kategoria.id}">
      </div>
      <div class="mb-3">
        <label for="izenaKategoriaInput" class="form-label"><strong>izena</strong></label>
        <input type="text" class="form-control" id="izenaKategoriaInput" value="${kategoria.izena}" required>
      </div>
    </form>
  `;
  
  modal.show();
}


//Modal sortu Gela
function sortuGela() {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'gela';
  modalElement.dataset.modo = 'sortu';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Gela berria sortu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formSortuGela" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="izenaInput" class="form-label"><strong>Izena</strong></label>
        <input type="text" class="form-control" id="izenaInput" required maxlength="4" required>
      </div>
      <div class="mb-3">
        <label for="taldeaInput" class="form-label"><strong>Taldea</strong></label>
        <input type="text" class="form-control" id="taldeaInput" required maxlength="5" required>
      </div>
    </form>
  `;

  modal.show();
}

//Modal sortu Kategoria
function sortuKategoria() {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'kategoria';
  modalElement.dataset.modo = 'sortu';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kategoria berria sortu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formSortuKategoria" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="izenaKategoriaInput" class="form-label"><strong>Izena</strong></label>
        <input type="text" class="form-control" id="izenaKategoriaInput" required>
      </div>
    </form>
  `;

  modal.show();
}

//Modal ezabatzeko konfirmazioa
function confirmEzabatuModal(item) {
  const modalTitle = document.querySelector('#ezabatuModalLabel');
  if (item.etiketa) {
    modalTitle.textContent = `${item.izena} kokalekua ezabatuko duzu`;
  } else if (item.taldea) {
    modalTitle.textContent = `${item.izena} gela ezabatuko duzu`;
  } else {
    modalTitle.textContent = `${item.izena} kategoria ezabatuko duzu`;
  }

  const modal = new bootstrap.Modal(document.getElementById('ezabatuModal'));
  modal.show();

  const confirmBtn = document.querySelector('#confirmEzabatuBtn');
  confirmBtn.onclick = async () => {
    try {
      if (item.etiketa) {
        await kokalekuakService.delete(item.id);
      } else if (item.taldea) {
        await gelakService.delete(item.id);
      } else {
        await kategoriakService.delete(item.id);
      }

      modal.hide();
      location.reload();

    } catch (errorea) {
      console.error('Errorea elementua ezabatzean:', errorea);
    }
  };
}


//EKINTZAK

//Editatutako eta sortutako datuak gordetzeko
//Modo bidez sortu edo editatu. EZ BADA SORTU EDITATU DA DEFEKTU
//Mota bidez ze Service deitzen den erabakitzen da
async function gordeDatuak() {
  const modalElement = document.getElementById('kudeaketaModal');
  const mota = modalElement.dataset.mota;
  const modo = modalElement.dataset.modo || 'editatu';
  const form = modalElement.querySelector('form');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  try {
    if (mota === 'gela') {
      modo === 'sortu' ? await sortuGelaBerria() : await gordeGela();
    } else if (mota === 'kokaleku') {
      modo === 'sortu' ? await sortuKokalekuBerria() : await gordeKokalekua();
    } else if (mota === 'kategoria') {
      modo === 'sortu' ? await sortuKategoriaBerria() : await gordeKategoria();
    }
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('kudeaketaModal'));
    modal.hide();
    location.reload();
  } catch (errorea) {
    console.error('Errorea datuak gordetzean:', errorea);
    alert('Errorea datuak gordetzean');
  }
}


//Service-ra deitzen da eta bidali baino lehen balidazioak

//EDITATZEKO FUNTZIOAK
async function gordeGela() {
  const id = document.querySelector('#idGelaInput').value;
  const izena = document.querySelector('#izenaInput').value.trim();
  const taldea = document.querySelector('#taldeaInput').value.trim();

  if (!izena) {
    alert('Izena falta da');
    return;
  }
  if (izena.length > 4) {
    alert('Izena ezin da 4 karaktere baino gehiago izan');
    return;
  }
  if (!taldea) {
    alert('Taldea falta da');
    return;
  }
  if (taldea.length > 5) {
    alert('Taldea ezin da 5 karaktere baino gehiago izan');
    return;
  }

  await gelakService.update(id, izena, taldea);
}

async function gordeKokalekua() {
  const etiketa = document.querySelector('#etiketaInput').value;
  const idGela = document.querySelector('#idGelaInput').value;
  const hasieraData = document.querySelector('#hasieraInput').value;
  const amaieraData = document.querySelector('#amaieraInput').value;

  if (!idGela) {
    alert('Gela falta da');
    return;
  }

  if (hasieraData && amaieraData && new Date(hasieraData) > new Date(amaieraData)) {
    alert('Amaiera data ezin da hasiera data baino lehenago izan.');
    return;
  }

  await kokalekuakService.update(etiketa, idGela, hasieraData, amaieraData);
}

async function gordeKategoria() {
  const id = document.querySelector('#idKategoriaInput').value;
  const izena = document.querySelector('#izenaKategoriaInput').value;

  if (!izena) {
    alert('Izena falta da');
    return;
  }

  await kategoriakService.update(id, izena);
}

document.querySelector('#btnGorde').addEventListener('click', gordeDatuak);

//SORTZEKO FUNTZIOAK

async function sortuKokalekuBerria() {
  const etiketa = document.querySelector('#etiketaInput').value.trim();
  const idGela = document.querySelector('#idGelaInput').value;
  const hasieraData = document.querySelector('#hasieraInput').value;
  const amaieraData = document.querySelector('#amaieraInput').value;

  if (!etiketa) {
    alert('Etiketa falta da');
    return;
  }
  if (!idGela) {
    alert('Gela hautatu behar da');
    return;
  }

  await kokalekuakService.create( etiketa, idGela, hasieraData, amaieraData );
}

async function sortuGelaBerria() {
  const izena = document.querySelector('#izenaInput').value.trim();
  const taldea = document.querySelector('#taldeaInput').value.trim();
  await gelakService.create( izena, taldea );
}

async function sortuKategoriaBerria() {
  const izena = document.querySelector('#izenaKategoriaInput').value.trim();
  await kategoriakService.create( izena );
}