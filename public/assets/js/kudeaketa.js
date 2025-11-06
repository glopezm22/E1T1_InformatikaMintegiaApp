import kokalekuService from './services/kokalekuService.js';
import kategoriaService from './services/kategoriaService.js';
import gelaService from './services/gelaService.js';

let kokalekuak = [];
let kategoriak = [];
let gelak = [];
//Kargatzen ditugu datuak
//aldagai globaletan eskaerak ez erreplikatzeko tauletan eta modaletan
document.addEventListener('DOMContentLoaded', async () => {
  try {
    kokalekuak = await kokalekuService.getAll();
    kategoriak = await kategoriaService.getAll();
    gelak = await gelaService.getAll();

    renderizarKokalekuak(kokalekuak);
    renderizarKategoriak(kategoriak);
    renderizarGelak(gelak);
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
          <button class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
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
          <button class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
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
          <button class="btnEditatu btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
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
  modalElement.dataset.mota = 'gela';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kokalekua editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku" class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label"><strong>Etiketa</strong></label>
        <input disabled type="text" class="form-control" id="etiketaInput" value="${kokalekua.etiketa}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Gela</strong></label>
        <select class="form-select" id="idGelaInput" value="${kokalekua.idGela}"></select>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Hasiera data</strong></label>
        <input type="date" class="form-control" id="hasieraInput" value="${kokalekua.hasieraData}" required>
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Amaiera data</strong></label>
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
          <label class="form-label"><strong>ID</strong></label>
          <input disabled type="text" class="form-control" id="idGelaInput" value="${gela.id}">
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Izena</strong></label>
          <input type="text" class="form-control" id="izenaInput" value="${gela.izena}" required>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong>Taldea</strong></label>
          <input type="text" class="form-control" id="taldeaInput" value="${gela.taldea}" required>
        </div>
      </form>
  `;

  modal.show();
}

//Modal Kategoria
function editatuKategoria(kategoria) {
  const modalElement = document.getElementById('kudeaketaModal');
  modalElement.dataset.mota = 'gela';
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kategoria editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku" class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label"><strong>ID</strong></label>
        <input disabled type="text" class="form-control" id="idKategoriaInput" value="${kategoria.id}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>izena</strong></label>
        <select id="select2" class="form-select"></select>
      </div>
    </form>
  `;
  const select = modalBody.querySelector('#select2');

  kategoriak.forEach(k => {
    const option = document.createElement('option');
    option.value = k.id;
    option.textContent = k.izena;
    select.appendChild(option);
  });

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
        await kokalekuService.delete(item.id);
      } else if (item.taldea) {
        await gelaService.delete(item.id);
      } else {
        await kategoriaService.delete(item.id);
      }

      modal.hide();
      location.reload();

    } catch (errorea) {
      console.error('Errorea elementua ezabatzean:', errorea);
    }
  };
}


//EKINTZAK

//Editatutako datuak gordetzeko
//Mota bidez ze Service deitzen den erabakitzen da
async function gordeDatuak() {
  const modalElement = document.getElementById('kudeaketaModal');
  const mota = modalElement.dataset.mota;
  const form = modalElement.querySelector('form');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  try {
    if (mota === 'gela') {
      await gordeGela();
    } else if (mota === 'kokaleku') {
      await gordeKokalekua();
    } else if (mota === 'kategoria') {
      await gordeKategoria();
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
async function gordeGela() {
  const id = document.querySelector('#idGelaInput').value;
  const izena = document.querySelector('#izenaInput').value.trim();
  const taldea = document.querySelector('#taldeaInput').value.trim();

  if (!izena) {
    alert('Izena falta da');
    return;
  }
  if (izena.length < 2) {
    alert('izena 2 eta 4 karaktearen artean izan behar ditu');
    return;
  }
  if (!taldea) {
    alert('Taldea falta da');
    return;
  }

  await gelaService.update(id, { izena, taldea });
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

  await kokalekuService.update(etiketa, { idGela, hasieraData, amaieraData });
}

async function gordeKategoria() {
  const id = document.querySelector('#idKategoriaInput').value;
  const izena = document.querySelector('#select2').value;

  if (!izena) {
    alert('Izena falta da');
    return;
  }

  await kategoriaService.update(id, { izena });
}

document.querySelector('#btnGorde').addEventListener('click', gordeDatuak);

