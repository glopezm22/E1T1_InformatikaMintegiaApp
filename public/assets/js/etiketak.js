import ekipoakService from './services/ekipoakService.js'
import gelaService from './services/gelaService.js'

document.addEventListener('DOMContentLoaded', async () => {
  const produktuak = await ekipoakService.getAll();
  const select1 = document.querySelector('#select1');
  const gelak = await gelaService.getAll();
  const select2 = document.querySelector('#select2');
  const kokapenaForm = document.querySelector('#kokapenaForm');

 select1.innerHTML = '<option selected disabled hidden>Hautatu ekipoa</option>';
  produktuak.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.izena;
    select1.appendChild(option);
  });

  select2.innerHTML = '<option selected disabled hidden>Hautatu kokalekua</option>';
  gelak.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.izena;
    select1.appendChild(option);
  });

  select1.addEventListener('change', async (e) => {
    const id = e.target.value;
    if (id && id !== "Hautatu ekipoa") {
      const produktua = await ekipoakService.getById(id);
      console.log("Produktu hautatua:", produktua);
    }
  });

  select2.addEventListener('change', async (e) => {
    const id = e.target.value;
    if (id && id !== "Hautatu kokalekua") {
      const gela = await gelaService.getById(id);
      console.log("Produktu hautatua:", gela);
    }
  });

  kokapenaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const izena = document.querySelector('#kokapenaIzena').value.trim();
  const taldea = document.querySelector('#kokapenaTaldea').value.trim();

  if (!izena) {
    alert('Idatzi kokapenaren izena.');
    return;
  }
  try {
    const berria = await gelaService.create(izena, taldea);
    const select2 = document.querySelector('#select2');
    const option = document.createElement('option');
    option.value = berria.id;
    option.textContent = berria.izena;
    select2.appendChild(option);
    kokapenaForm.reset();

  } catch (error) {
    console.error('Errorea kokapena sortzean:', error);
    alert('Errorea kokapen berria sortzean.');
  }
});


});