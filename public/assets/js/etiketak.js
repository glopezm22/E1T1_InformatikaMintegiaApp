import inbentarioaService from './services/inbentarioaService.js'

document.addEventListener('DOMContentLoaded', async () => {
  const produktuak = await inbentarioaService.getAll();
  const select1 = document.querySelector('#select1');

 select1.innerHTML = '<option selected>Hautatu ekipoa</option>';
  produktuak.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.izena;
    select1.appendChild(option);
  });

  select1.addEventListener('change', async (e) => {
    const id = e.target.value;
    if (id && id !== "Hautatu ekipoa") {
      const produktua = await inbentarioaService.getById(id);
      console.log("Produktu hautatua:", produktua);
    }
  });
});