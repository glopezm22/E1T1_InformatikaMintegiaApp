import ekipoakService from './services/ekipoakService.js'

document.addEventListener('DOMContentLoaded', async () => {
  const produktuak = await ekipoakService.getAll();
  const select1 = document.querySelector('#select1');

 select1.innerHTML = '<option selected disabled hidden>Hautatu ekipoa</option>';
  produktuak.forEach(p => {
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
});