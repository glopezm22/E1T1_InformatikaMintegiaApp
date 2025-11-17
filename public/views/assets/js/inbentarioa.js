import inbentarioaService from './services/inbentarioaService.js';
import ekipoakService from './services/ekipoakService.js';

let ekipoak = [];

//Kargatzen ditugu datuak
//aldagai globaletan eskaerak ez erreplikatzeko tauletan eta modaletan
document.addEventListener('DOMContentLoaded', async () => {
  try {
    ekipoak = await ekipoakService.getAll();

  } catch (errorea) {
    console.error('Errorea datuak kargatzean:', errorea);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const produktuak = await inbentarioaService.getAll();

  renderizarTabla(produktuak);
});

document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.querySelector('.bilatuInput');
  const tabla = document.getElementById('tabla-inbentarioa');
  const filasTabla = tabla.querySelector('tbody').rows;

  inputBusqueda.addEventListener('keyup', function () {
    const filtro = inputBusqueda.value.toLowerCase().trim();

    for (let i = 0; i < filasTabla.length; i++) {
      const celdaEtiketa = filasTabla[i].cells[0];

      if (celdaEtiketa) {
        const textoEtiketa = celdaEtiketa.textContent.toLowerCase().trim();

        if (textoEtiketa.includes(filtro)) {
          filasTabla[i].style.display = '';
        } else {
          filasTabla[i].style.display = 'none';
        }
      }
    }
  });
});


function renderizarTabla(produktuak) {
  const tbody = document.querySelector('#tabla-inbentarioa tbody');
  tbody.innerHTML = '';

  produktuak.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${p.etiketa}</td>
            <td>${p.idEkipamendu}</td>
            <td>${p.erosketaData}</td>
            <td>
                <div class="d-flex gap-3 justify-content-end"> 
                    <button class="btnIkusi btn btn-sm btn-warning" alt='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" alt='Editatu objektua'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" alt='Ezabatu objektua'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
    tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(p));
    tr.querySelector('.btnEditatu').addEventListener('click', () => editatuInbentarioa(p));
    tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(p));
    tbody.appendChild(tr);
  });
}


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

function editatuInbentarioa(produktuak) {
  const modalElement = document.getElementById('inbentarioaEditatuModal');
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#inbentarioaEditatuModalLabel');
  modalTitle.textContent = 'Inbentarioa editatu';

  const modalBody = document.querySelector('#inbentarioaEditatuModal .modal-body');
  modalBody.innerHTML = `
    <form id="formEditInbentarioa" class="needs-validation" novalidate>
        <span class="mensajeError"></span>
        <span class="mensajeSuccess"></span>
        <div class="mb-3">
            <label class="form-label"><strong>Etiketa:</strong></label>
            <input disabled type="text" class="form-control" id="etiketaInbentarioInput" value="${produktuak.etiketa}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Ekipamendua</strong></label>
            <select id="selectEkipamendua" class="form-select"></select>
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Erosketa data:</strong></label>
            <input type="date" class="form-control" id="erosketaDataInbentarioInput" value="${produktuak.erosketaData}">
        </div>
    </form>
  `;

  const select = modalBody.querySelector('#selectEkipamendua');

  ekipoak.forEach(e => {
    const option = document.createElement('option');
    option.value = e.id;
    option.textContent = e.izena;
    if (e.id === produktuak.idEkipamendu) option.selected = true;
    select.appendChild(option);
  });

  modal.show();
}

function confirmEzabatuModal(item) {
  const modalTitle = document.querySelector('#ezabatuModalLabel');

  modalTitle.textContent = `${item.etiketa} produktua ezabatuko duzu`;

  const modal = new bootstrap.Modal(document.getElementById('ezabatuModal'));
  modal.show();

  const confirmBtn = document.querySelector('#confirmEzabatuBtn');
  confirmBtn.onclick = async () => {
    try {
      if (item.etiketa) {
        await inbentarioaService.delete(item.etiketa);
      }

      modal.hide();
      location.reload();

    } catch (errorea) {
      console.error('Errorea elementua ezabatzean:', errorea);
    }
  };
}

async function gordeDatuak() {
  try {
    const etiketa = document.querySelector('#etiketaInbentarioInput').value.trim();
    const idEkipamendu = document.querySelector('#selectEkipamendua').value;
    const erosketaData = document.querySelector('#erosketaDataInbentarioInput').value.trim();

    const form = document.querySelector('#formEditInbentarioa');
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

    if (!idEkipamendu || parseInt(idEkipamendu) <= 0) {
      if (mensajeError) {
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Aukeratu ekipamendu bat zerrendatik.';
      }
      form.classList.add('was-validated');
      return;
    }

    if (!erosketaData || erosketaData == 'dd/mm/aaaa') {
      if (mensajeError) {
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erosketa data zehaztu behar da.';
      }
      form.classList.add('was-validated');
      return;
    }

    await inbentarioaService.update(etiketa, idEkipamendu, erosketaData);

    if (mensajeSuccess) {
      mensajeSuccess.style.display = 'block';
      mensajeSuccess.innerHTML = 'Datuak zuzen gorde dira!';
    }

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('inbentarioaEditatuModal'));
      modal.hide();
      location.reload();
    }, 2500);
  } catch (errorea) {
    console.error('Errorea datuak gordetzean:', errorea);
    alert('Errorea datuak gordetzean');
  }
}
document.querySelector('#btnGorde').addEventListener('click', gordeDatuak);