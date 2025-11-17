import erabiltzaileakService from './services/erabiltzaileakService.js';
document.addEventListener('DOMContentLoaded', async () => {
    const erabiltzaileak = await erabiltzaileakService.getAll();
    renderizarTabla(erabiltzaileak);
});

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
                    <button class="btnEtiketatu btn btn-sm btn-warning" title='Editatu pasahitza' aria-label='Editatu pasahitza'><i class="fa-solid fa-key"></i></button>
                    <button class="btnIkusi btn btn-sm btn-warning" title='Informazio gehiago' aria-label='Informazio gehiago'><i class="fa-solid fa-eye"></i></button>
                    <button class="btnEditatu btn btn-sm btn-warning" title='Editatu objektua' aria-label='Editatu objektua'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btnEzabatu btn btn-sm btn-danger" title='Ezabatu objektua' aria-label='Ezabatu objektua'><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
    `;
        tr.querySelector('.btnEtiketatu').addEventListener('click', () => editatuPasahitza(e));
        tr.querySelector('.btnIkusi').addEventListener('click', () => ikusi(e));
        tr.querySelector('.btnEditatu').addEventListener('click', () => editatuErabiltzailea(e));
        tr.querySelector('.btnEzabatu').addEventListener('click', () => confirmEzabatuModal(e));
        tbody.appendChild(tr);
    });
}

//Modal Pasahitza Editatu
function editatuPasahitza(erabiltzailea) {
    const modalElement = document.getElementById('erabiltzaileakPasahitzaModal');
    const modal = new bootstrap.Modal(modalElement);

    const modalTitle = document.querySelector('#erabiltzaileakPasahitzaModalLabel');
    modalTitle.textContent = 'Pasahitza aldatu';

    const modalBody = document.querySelector('#erabiltzaileakPasahitzaModal .modal-body');

    modalBody.innerHTML = `
    <form id="formEditPasahitza" class="needs-validation" novalidate>
        <span class="mensajeError"></span>
        <span class="mensajeSuccess"></span>
        <div class="mb-3">
            <label class="form-label"><strong>NAN:</strong></label>
            <input disabled type="text" class="form-control" id="nanErabiltzaileakPasahitzaInput" value="${erabiltzailea.nan}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Pasahitza:</strong></label>
            <input type="password" class="form-control" id="pasahitzaErabiltzaileakPasahitzaInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Pasahitza Errepikatu:</strong></label>
            <input type="password" class="form-control" id="pasahitzaRepeErabiltzaileakPasahitzaInput">
        </div>
    </form>
`;

    modal.show();
}

// Modal Ikusi
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

//Modal Erabiltzailea Gehitu
function gehituErabiltzailea() {
    const modalElement = document.getElementById('erabiltzaileakGehitzekoModal');
    const modal = new bootstrap.Modal(modalElement);

    const modalTitle = document.querySelector('#erabiltzaileakGehitzekoModalLabel');
    modalTitle.textContent = 'Erabiltzailea editatu';

    const modalBody = document.querySelector('#erabiltzaileakGehitzekoModal .modal-body');

    modalBody.innerHTML = `
    <form id="formGehitzekoErabiltzaileak" class="needs-validation" novalidate>
        <span class="mensajeError"></span>
        <span class="mensajeSuccess"></span>
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
            <label class="form-label"><strong>Pasahitza:</strong></label>
            <input type="password" class="form-control" id="pasahitzaBatErabiltzaileakInput">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Pasahitza Errepikatu:</strong></label>
            <input type="password" class="form-control" id="pasahitzaBiErabiltzaileakInput">
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
            <input disabled type="text" class="form-control" id="nanErabiltzaileakEditInput" value="${erabiltzailea.nan}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Izena:</strong></label>
            <input type="text" class="form-control" id="izenaErabiltzaileakEditInput" value="${erabiltzailea.izena}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Abizena:</strong></label>
            <input type="text" class="form-control" id="abizenaErabiltzaileakEditInput" value="${erabiltzailea.abizena}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Erabiltzailea:</strong></label>
            <input type="text" class="form-control" id="erabiltzaileaErabiltzaileakEditInput" value="${erabiltzailea.erabiltzailea}">
        </div>
        <div class="mb-3">
            <label class="form-label"><strong>Rola:</strong></label>
            <select id="selectEditRola" class="form-select">
                <option value="A" ${erabiltzailea.rola === 'A' ? 'selected' : ''}>Administradorea</option>
                <option value="U" ${erabiltzailea.rola === 'U' ? 'selected' : ''}>Erabiltzailea</option>
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

//Service-ra deitzen da eta bidali baino lehen balidazioak
async function updateErabiltzailea() {
    const nan = document.querySelector('#nanErabiltzaileakEditInput').value.trim();
    const izena = document.querySelector('#izenaErabiltzaileakEditInput').value.trim();
    const abizena = document.querySelector('#abizenaErabiltzaileakEditInput').value.trim();
    const erabiltzailea = document.querySelector('#erabiltzaileaErabiltzaileakEditInput').value.trim();
    const rola = document.querySelector('#selectEditRola').value.trim();

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

//Service-ra deitzen da eta bidali baino lehen balidazioak
async function updatePasahitza() {

    const nan = document.querySelector('#nanErabiltzaileakPasahitzaInput').value.trim();
    const pasahitza = document.querySelector('#pasahitzaErabiltzaileakPasahitzaInput');
    const pasahitzaRepe = document.querySelector('#pasahitzaRepeErabiltzaileakPasahitzaInput');
    const mensajeError = document.querySelector('.mensajeError');
    const mensajeSuccess = document.querySelector('.mensajeSuccess');

    if (!pasahitza.value.trim()) {
        pasahitza.style.border = '1px solid red';
        document.querySelector('#pasahitzaRepeErabiltzaileakPasahitzaInput').style.border = '1px solid grey';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Pasahitza bat sartu behar da';
        return;
    }

    if (pasahitza.value.trim().length < 6 || pasahitza.value.trim().length > 20) {
        pasahitza.style.border = '1px solid red';
        pasahitzaRepe.style.border = '1px solid grey';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Pasahitza 6-20 caractereen artean egon behar da';
        return;
    }

    if (!pasahitzaRepe.value.trim()) {
        pasahitzaRepe.style.border = '1px solid red';
        pasahitza.style.border = '1px solid grey';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Pasahitza Errepikatua sartu behar da';
        return;
    }

    if (pasahitza.value.trim() != pasahitzaRepe.value.trim()) {
        pasahitzaRepe.style.border = '1px solid red';
        pasahitza.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Bi pasahitz berdinak sartu behar da';
        return;
    }

    await erabiltzaileakService.updatePasahitza(nan, pasahitza.value.trim(), pasahitzaRepe.value.trim());

    mensajeSuccess.style.display = 'block';
    mensajeSuccess.innerHTML = 'Pasahitza aldatu da';
}

//Service-ra deitzen da eta bidali baino lehen balidazioak
async function sortuErabiltzailea() {

    const nanSortu = document.querySelector('#nanErabiltzaileakInput');
    const izenaSortu = document.querySelector('#izenaErabiltzaileakInput');
    const abizenaSortu = document.querySelector('#abizenaErabiltzaileakInput');
    const erabiltzaileaSortu = document.querySelector('#erabiltzaileaErabiltzaileakInput');
    const pasahitzaBatSortu = document.querySelector('#pasahitzaBatErabiltzaileakInput');
    const pasahitzaBiSortu = document.querySelector('#pasahitzaBiErabiltzaileakInput');
    const rolaSortu = document.querySelector('#selectRola').value.trim();
    const mensajeError = document.querySelector('.mensajeError');
    const mensajeSuccess = document.querySelector('.mensajeSuccess');

    if (!nanSortu.value.trim()) {
        nanSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile NAN falta da';
        return;
    }
    // NAN Komprobatzeko egiazkoa den
    if (!komprobatuNAN(nanSortu.value.trim())) {
        nanSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile NAN ez da egokia';
        return;
    }
    if (!izenaSortu.value.trim()) {
        izenaSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile izena falta da';
        return;
    }
    if (!abizenaSortu.value.trim()) {
        abizenaSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile abizena falta da';
        return;
    }
    if (!erabiltzaileaSortu.value.trim()) {
        erabiltzaileaSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaileen erabiltzaile-izena falta da';
        return;
    }
        if (!pasahitzaBatSortu.value) {
        pasahitzaBatSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile pasahitza falta da';
        return;
    }

    if (pasahitzaBatSortu.value.lenght < 6 || pasahitzaBatSortu.value.lenght > 20) {
        pasahitzaBatSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile pasahitza 6-20 karaktereen artean egon behar da';
        return;
    }

    if (!pasahitzaBiSortu.value) {
        pasahitzaBiSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Erabiltzaile pasahitza errepikatzea falta da';
        return;
    }

    if (pasahitzaBatSortu.value !== pasahitzaBiSortu.value) {
        pasahitzaBiSortu.style.border = '1px solid red';
        pasahitzaBatSortu.style.border = '1px solid red';
        mensajeError.style.display = 'block';
        mensajeError.innerHTML = 'Bi pasahitzak ez dira berdinak';
        return;
    }
    if (!rolaSortu) {
        alert('Erabiltzaileen rola falta da');
        return;
    }

    await erabiltzaileakService.create(nanSortu.value.trim(), izenaSortu.value.trim(), abizenaSortu.value.trim(), erabiltzaileaSortu.value.trim(), pasahitzaBatSortu.value, rolaSortu);

    mensajeSuccess.style.display = 'block';
    mensajeSuccess.innerHTML = 'Pasahitza aldatu da';
}

function komprobatuNAN(dni) {
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    // 1. Sarrera garbitu eta estandarizatu (zuriuneak/gidoiak kendu, larri bihurtu)
    dni = dni.toUpperCase().replace(/[^0-9A-Z]/g, '');

    // 2. Luzera eta oinarrizko formatua konprobatu (9 karaktere)
    if (dni.length !== 9 || !dni.match(/^[0-9XYZ]?\d{7}[A-Z]$/)) {
        return false; // Okerra: formatu edo luzera desegokia
    }

    // 3. NIE kudeatu (atzerritarrak): X, Y, Z 0, 1, 2 bihurtu kalkulua egiteko
    dni = dni.replace(/^X/, '0').replace(/^Y/, '1').replace(/^Z/, '2');

    // 4. Zenbakia eta letra bereizi
    // parseInt erabiliz, zenbakizko zatia lortzen dugu
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);

    // 5. Kalkulua eta konprobazioa (23ko Modulua)
    // Zenbakiaren 23rekiko zatiketaren hondarrak letrak duen indizearekin bat etorri behar du
    const indiceCalculado = numero % 23;
    const letraCalculada = letras.charAt(indiceCalculado);

    return letraCalculada === letra;
}

document.querySelector('#btnGorde').addEventListener('click', updateErabiltzailea);
document.querySelector('#btnSortu').addEventListener('click', sortuErabiltzailea);
document.querySelector('#btnAldatu').addEventListener('click', updatePasahitza);
document.querySelector('#sumarErabiltzaile').addEventListener('click', gehituErabiltzailea);