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
  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kokalekua editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku">
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
        <input type="date" class="form-control" id="hasieraInput" value="${kokalekua.hasieraData}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Amaiera data</strong></label>
        <input type="date" class="form-control" id="amaieraInput" value="${kokalekua.amaieraData}">
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
  //blur focus-a kentzeko modalaren barruan dauden elementuetik eskuragarritasun abisua ez ateratzeko
  document.activeElement.blur();
  const modal = new bootstrap.Modal(document.getElementById('kudeaketaModal'));
  modal.show();
}

//Modal gela
function editatuGela(gela) {
  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Gela editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku">
      <div class="mb-3">
        <label class="form-label"><strong>ID</strong></label>
        <input disabled type="text" class="form-control" id="idGelaInput" value="${gela.id}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Izena</strong></label>
        <input type="text" class="form-control" id="izenaInput" value="${gela.izena}">
      </div>
      <div class="mb-3">
        <label class="form-label"><strong>Taldea</strong></label>
        <input type="text" class="form-control" id="taldeaInput" value="${gela.taldea}">
      </div>
    </form>
  `;
  const modal = new bootstrap.Modal(document.getElementById('kudeaketaModal'));
  document.activeElement.blur();
  modal.show();
}

//Modal Kategoria
function editatuKategoria(kategoria) {
  const modalTitle = document.querySelector('#inbentarioaModalLabel');
  modalTitle.textContent = 'Kategoria editatu';

  const modalBody = document.querySelector('#kudeaketaModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditKokaleku">
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


  const modal = new bootstrap.Modal(document.getElementById('kudeaketaModal'));
  document.activeElement.blur();
  modal.show();
}

//Modal ezabatzeko konfirmazioa
function confirmEzabatuModal(item) {
  const modalTitle = document.querySelector('#ezabatuModalLabel');
  if(item.etiketa){
    modalTitle.textContent = `${item.izena} kokalekua ezabatuko duzu`;
  }else if(item.taldea){
    modalTitle.textContent = `${item.izena} gela ezabatuko duzu`;
  }else{
    modalTitle.textContent = `${item.izena} kategoria ezabatuko duzu`;
  }

  const modal = new bootstrap.Modal(document.getElementById('ezabatuModal'));
  document.activeElement.blur();
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
