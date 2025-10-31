<?php require_once "partials/header.html" ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- etiketa berria sortzeko formularioa -->
<div class="contenedor my-5">
    <div class="contenedorEtiketa">
        <h1 class="mb-5">Etiketak</h1>
        <form class="p-4 border rounded-3 shadow-sm bg-light">
            <h2 class="mb-5">Etiketa berriak sortu</h2>
            <div class="mb-3">
                <label for="select1" class="form-label fw-bold">Hautatu ekipoa</label>
                <select id="select1" class="form-select"></select>
            </div>
            <div class="mb-3 d-flex align-items-center gap-2">
                <div class="flex-grow-1">
                    <label for="select2" class="form-label fw-bold">Kokapena</label>
                    <select id="select2" class="form-select"></select>
                </div>
                <button type="button" class="btn btn-outline-dark align-self-end" title="Kokapen berria" data-bs-toggle="modal" data-bs-target="#kokapenaModal">
                    <i class="fa-solid fa-plus"></i> 
                </button>
            </div>
            <div class="mb-3">
                <label for="numberImput" class="form-label fw-bold">Ekipo kopurua</label>
                <input type="number" id="numberImput" class="form-control"></input>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-dark">
                    Etiketa sortu
                </button>
            </div>
        </form>
    </div>

    </form>
</div>



<!-- modala kokaken berria sortzeko -->
<div class="modal fade" id="kokapenaModal" tabindex="-1" aria-labelledby="kokapenaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="kokapenaModalLabel">Kokapen berria sortu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Itxi"></button>
      </div>
      <div class="modal-body">
        <form id="kokapenaForm">
          <div class="my-3">
            <label for="kokapenaIzena" class="form-label fw-bold">Kokapenaren izena</label>
            <input type="text" class="form-control" id="kokapenaIzena" placeholder="Sartu kokapenaren izena" required>
          </div>
          <div class="mb-3">
            <label for="kokapenaTaldea" class="form-label fw-bold">Taldea</label>
            <input type="text" class="form-control" id="kokapenaTaldea" placeholder="Sartu kokapenaren taldea" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Utzi</button>
        <button type="submit" form="kokapenaForm" class="btn btn-primary">Gorde</button>
      </div>
    </div>
  </div>
</div>


</div>
<script type="module" src="../assets/js/etiketak.js"></script>
<?php require_once "partials/footer.html" ?>