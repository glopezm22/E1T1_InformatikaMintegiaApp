import kokalekuService from './services/kokalekuService.js';
import kategoriaService from './services/kategoriaService.js';
import gelaService from './services/gelaService.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const kokalekuak = await kokalekuService.getAll();
    renderizarKokalekuak(kokalekuak);
    const kategoriak = await kategoriaService.getAll();
    renderizarKategoriak(kategoriak);
    const gelak = await gelaService.getAll();
    renderizarGelak(gelak);
  } catch (errorea) {
    console.error('Errorea datuak kargatzean:', errorea);
  }
});


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
      <td><button class="btn btn-sm btn-outline-primary btnIkusi"><i class="fa-solid fa-eye"></i></button></td>
      <td><button class="btn btn-sm btn-outline-secondary btnEditatu"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusiKokalekua(p));
    tbody.appendChild(tr);
  });
}

function renderizarKategoriak(kategoriak) {
  const tbody = document.querySelector('#tabla-kategoriak tbody');
  tbody.innerHTML = '';

  kategoriak.forEach(k => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${k.id}</td>
      <td>${k.izena}</td>
      <td><button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-eye"></i></button></td>
      <td><button class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></td>

    `;
    tbody.appendChild(tr);
  });
}

function renderizarGelak(gelak) {
  const tbody = document.querySelector('#tabla-gelak tbody');
  tbody.innerHTML = '';

  gelak.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.izena}</td>
      <td>${g.taldea}</td>
      <td><button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-eye"></i></button></td>
      <td><button class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button class="btnEzabatu btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button></td>

    `;
    tbody.appendChild(tr);
  });
}

//modales
function ikusi(produktua) {
  const modalBody = document.querySelector('#inbentarioaModal .modal-body');
  modalBody.innerHTML = `
    <p><strong>Etiketa:</strong> ${produktua.etiketa}</p>
    <p><strong>Ekipamendu ID:</strong> ${produktua.idEkipamendu}</p>
    <p><strong>Erosketa data:</strong> ${produktua.erosketaData}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('inbentarioaModal'));
  modal.show();
}