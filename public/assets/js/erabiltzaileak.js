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

function ikusiGehituErab() {
    const modal = new bootstrap.Modal(document.getElementById('erabiltzaileaGehituModal'));
    modal.show();
}