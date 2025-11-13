import ekipoakService from './services/ekipoakService.js'
import gelakService from './services/gelakService.js'
import inbentarioService from './services/inbentarioaService.js';

document.addEventListener('DOMContentLoaded', async () => {
  const produktuak = await ekipoakService.getAll();
  const select1 = document.querySelector('#select1');
  const gelak = await gelakService.getAll();
  const select2 = document.querySelector('#select2');
  const kokapenaForm = document.querySelector('#kokapenaForm');
  const inbentarioForm = document.querySelector('#inbentarioForm');

  //Ekipoak kargatzeko
  select1.innerHTML = '<option selected disabled hidden>Hautatu ekipoa</option>';
  produktuak.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.izena;
    select1.appendChild(option);
  });

  // kokapenak kargatzeko
  select2.innerHTML = '<option selected disabled hidden>Hautatu kokalekua</option>';
  gelak.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.izena;
    select2.appendChild(option);
  });

  // formulario inbentarioa
  inbentarioForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idEkipamendu = select1.value;
  const idGela = select2.value;
  const erosketaData = document.querySelector('#erosketaData').value.trim();
  const kopurua = parseInt(document.querySelector('#numberInput').value) || 1;

  // Balidazioak
  if (!idEkipamendu || !idGela || !erosketaData) {
    showAlert('Bete eremu guztiak', 'danger');
    return;
  }

  try {
    const res = await inbentarioService.create(idEkipamendu, idGela, kopurua, erosketaData);

    console.log("Erregistro sortuak:", res);
    showAlert(`${kopurua} etiketa sortu dira`, 'success');
    inbentarioForm.reset();

  } catch (error) {
    console.error('Errorea sortzean:', error);
    showAlert('Errorea sortzean', 'danger');
  }
});

  //hemen kokapen berria sortzen da balidazioekin
  kokapenaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const izena = document.querySelector('#kokapenaIzena').value.trim();
    const taldea = document.querySelector('#kokapenaTaldea').value.trim();

    if (!izena) {
      showAlert('Idatzi kokapenaren izena.', 'danger');
      return;
    }
    if (!taldea) {
      showAlert('Idatzi taldearen izena.', 'danger');
      return;
    }
    if (izena.length > 4) {
      showAlert('Izena ezin da 4 karaktere baino gehiagokoa izan.', 'danger');
      return;
    }
    if (taldea.length > 5) {
      showAlert('Taldea ezin da 5 karaktere baino gehiagokoa izan.', 'danger');
      return;
    }
    try {
      await gelakService.create(izena, taldea);
      kokapenaForm.reset();

      const kokapenaModal = bootstrap.Modal.getInstance(document.getElementById('kokapenaModal'));
      kokapenaModal.hide();

      showAlert('Kokapena sortu da', 'success');

    } catch (error) {
      console.error('Errorea kokapena sortzean:', error);
      showAlert('Errorea kokapen berria sortzean.');
    }
  });

  function showAlert(message, type = 'info') {

    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  }


});
