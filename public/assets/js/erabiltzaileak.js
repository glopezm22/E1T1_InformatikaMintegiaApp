import erabiltzaileakService from './services/erabiltzaileakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const erabiltzaileak = await erabiltzaileakService.getAll();
    renderizarTabla(erabiltzaileak);
});

document.querySelector('#sumarErabiltzaile').addEventListener('click', () => ikusiGehituErab());

document.querySelector('.bilatuInput').addEventListener('keyup', function () {
    let input, filter, table, tr, tdNAN, tdIzena, tdErabiltzailea, i, txtValue;
    input = document.querySelector('.bilatuInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("tabla-erabiltzaileak");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tdNAN = tr[i].getElementsByTagName("td")[0];
        tdIzena = tr[i].getElementsByTagName("td")[1];
        tdErabiltzailea = tr[i].getElementsByTagName("td")[3];

        if (tdNAN || tdIzena || tdErabiltzailea) {
            if (tdNAN.textContent.toUpperCase().indexOf(filter) > -1 ||
                tdIzena.textContent.toUpperCase().indexOf(filter) > -1 ||
                tdErabiltzailea.textContent.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});



function renderizarTabla(erabiltzaileak) {
    const tbody = document.querySelector('#tabla-erabiltzaileak tbody');
    tbody.innerHTML = '';

    erabiltzaileak.forEach(e => {
        const tr = document.createElement('tr');
        let rolaTxt = '';
        if (e.rola === 'A') {
            rolaTxt = 'Administratzailea';
        } else {
            rolaTxt = 'Erabiltzailea';
        }
        tr.innerHTML = `
            <td>${e.nan}</td>
            <td>${e.izena}</td>
            <td>${e.abizena}</td>
            <td>${e.erabiltzailea}</td>
            <td>${rolaTxt}</td>
            <td>
                <div class="d-flex gap-3 justify-content-end"> 
                    <button class="btnIkusi btn btn-sm btn-warning" alt='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" alt='Editatu objektua'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" alt='Ezabatu objektua'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
        tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(e));
        tr.querySelector('.btnEditatu').addEventListener('click', () => editatuErabiltzailea(e));
        tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(e));
        tbody.appendChild(tr);
    });
}


function ikusi(erabiltzailea) {
    const modalBody = document.querySelector('#erabiltzaileakModal .modal-body');
    let rolaTxt = '';
    if (erabiltzailea.rola === 'A') {
        rolaTxt = 'Administratzailea';
    } else {
        rolaTxt = 'Erabiltzailea';
    }
    modalBody.innerHTML = `
    <p><strong>NAN:</strong> ${erabiltzailea.nan}</p>
    <p><strong>Izena:</strong> ${erabiltzailea.izena}</p>
    <p><strong>Abizena:</strong> ${erabiltzailea.abizena}</p>
    <p><strong>Erabiltzailea:</strong> ${erabiltzailea.erabiltzailea}</p>
    <p><strong>Rola:</strong> ${rolaTxt}</p>
  `;
    const modal = new bootstrap.Modal(document.getElementById('erabiltzaileakModal'));
    modal.show();
}

//Modal Inbentarioa
function gehituErabiltzailea() {
  const modalElement = document.getElementById('erabiltzaileakGehituModal');
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#erabiltzaileakGehituModalLabel');
  modalTitle.textContent = 'Erabiltzailea editatu';

  const modalBody = document.querySelector('#erabiltzaileakGehituModal .modal-body');

modalBody.innerHTML = `
    <form id="formGehituErabiltzaileak" class="needs-validation" novalidate>
        <div class="mb-3">
            <label class="form-label"><strong>NAN:</strong></label>
            <input type="text" class="form-control" id="nanErabiltzaileakInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Izena:</strong></label>
            <input type="text" class="form-control" id="izenaErabiltzaileakInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Abizena:</strong></label>
            <input type="text" class="form-control" id="abizenaErabiltzaileakInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Erabiltzailea:</strong></label>
            <input type="text" class="form-control" id="erabiltzaileaErabiltzaileakInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Rola:</strong></label>
            <select id="selectRola" class="form-select">
                <option value="A">Admin</option>
                <option value="U">User</option>
            </select>
        </div>
    </form>
`;

  modal.show();
}

//Modal Erabiltzailea Editatu
function editatuErabiltzailea(erabiltzailea) {
  const modalElement = document.getElementById('erabiltzaileakEditatuModal');
  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.querySelector('#erabiltzaileakEditatuModalLabel');
  modalTitle.textContent = 'Erabiltzailea editatu';

  const modalBody = document.querySelector('#erabiltzaileakEditatuModal .modal-body');

modalBody.innerHTML = `
    <form id="formEditErabiltzaileak" class="needs-validation" novalidate>
        <div class="mb-3">
            <label class="form-label"><strong>NAN:</strong></label>
            <input disabled type="text" class="form-control" id="nanErabiltzaileakInput" value="${erabiltzailea.nan}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Izena:</strong></label>
            <input type="text" class="form-control" id="izenaErabiltzaileakInput" value="${erabiltzailea.izena}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Abizena:</strong></label>
            <input type="text" class="form-control" id="abizenaErabiltzaileakInput" value="${erabiltzailea.abizena}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Erabiltzailea:</strong></label>
            <input type="text" class="form-control" id="erabiltzaileaErabiltzaileakInput" value="${erabiltzailea.erabiltzailea}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Rola:</strong></label>
            <select id="selectRola" class="form-select">
                <option value="A" ${erabiltzailea.rola === 'A' ? 'selected' : ''}>Admin</option>
                <option value="U" ${erabiltzailea.rola === 'U' ? 'selected' : ''}>User</option>
            </select>
        </div>
    </form>
`;

  modal.show();
}

//Modal ezabatzeko konfirmazioa
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

async function gordeDatuak(method){
    if(method == 1){
        try {

            await updateErabiltzailea();
        
            const modal = bootstrap.Modal.getInstance(document.getElementById('erabiltzaileakEditatuModal'));
            modal.hide();
            location.reload();
        } catch (errorea) {
            console.error('Errorea datuak gordetzean:', errorea);
            alert('Errorea datuak gordetzean');
        }
    }else if(method == 2){
        try {

            await sortuErabiltzailea();
        
            const modal = bootstrap.Modal.getInstance(document.getElementById('erabiltzaileakGehituModal'));
            modal.hide();
            location.reload();
        } catch (errorea) {
            console.error('Errorea datuak gordetzean:', errorea);
            alert('Errorea datuak gordetzean');
        }
    }
}

//Service-ra deitzen da eta bidali baino lehen balidazioak
async function updateErabiltzailea() {
    const nan = document.querySelector('#nanErabiltzaileakInput').value.trim();
    const izena = document.querySelector('#izenaErabiltzaileakInput').value.trim();
    const abizena = document.querySelector('#abizenaErabiltzaileakInput').value.trim();
    const erabiltzailea = document.querySelector('#erabiltzaileaErabiltzaileakInput').value.trim();
    const rola = document.querySelector('#selectRola').value.trim();

    if (!izena) {
        alert('Erabiltzaile izena falta da');
        return;
    }
    if (!abizena) {
        alert('Erabiltzaile abizena falta da');
        return;
    }
    if (!erabiltzailea) {
        alert('Erabiltzaileen erabiltzaile-izena falta da');
        return;
    }

    await erabiltzaileakService.update(nan, izena, abizena, erabiltzailea, rola);
}

async function sortuErabiltzailea() {
    const nan = document.querySelector('#nanErabiltzaileakInput').value.trim();
    const izena = document.querySelector('#izenaErabiltzaileakInput').value.trim();
    const abizena = document.querySelector('#abizenaErabiltzaileakInput').value.trim();
    const erabiltzailea = document.querySelector('#erabiltzaileaErabiltzaileakInput').value.trim();
    const rola = document.querySelector('#selectRola').value.trim();

    if (!izena) {
        alert('Erabiltzaile izena falta da');
        return;
    }
    if (!abizena) {
        alert('Erabiltzaile abizena falta da');
        return;
    }
    if (!erabiltzailea) {
        alert('Erabiltzaileen erabiltzaile-izena falta da');
        return;
    }

    await erabiltzaileakService.update(nan, izena, abizena, erabiltzailea, rola);
}

document.querySelector('#btnGorde').addEventListener('click', gordeDatuak(1));
document.querySelector('#btnSortu').addEventListener('click', gordeDatuak(2));
document.querySelector('#sumarErabiltzaile').addEventListener('click', gehituErabiltzailea);