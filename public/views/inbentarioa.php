<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

<main class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">
  <div class="container bg-light p-md-5 pt-5 rounded-2">
    <div class="contenedor my-5">
      <h1 class="mb-5 text-dark">Inbentarioa</h1>
      <div class="input-group mb-4 bilatu">
        <input type="text" class="form-control bilatuInput" placeholder="Etiketa bidez bilatu ...">
        <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
      </div>
      <div style="overflow-y: auto; max-height: 500px;">
        <table class="table table-hover" id="tabla-inbentarioa">
          <thead>
            <tr>
              <th scope="col">Etiketa</th>
              <th scope="col">Ekipoa</th>
              <th scope="col">Erosketa data</th>
              <th scope="col" colspan="3"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
<script type="module" src="./assets/js/inbentarioa.js"></script>
<?php require_once "partials/footer.php" ?>

<div class="modal fade" id="inbentarioaModal" tabindex="-1" aria-labelledby="inbentarioaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="inbentarioaModalLabel"><i class="fa-solid fa-truck-ramp-box me-2"></i> Produktu Inbentariatua</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>

<!-- Editatzeko modal -->
<div class="modal fade" id="inbentarioaEditatuModal" data-mota="" tabindex="-1" aria-labelledby="inbentarioaEditatuModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="inbentarioaEditatuModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- modalaren edulia hemen agertzen da -->
      </div>
      <div class="modal-footer">
        <button id="btnGorde" type="button" class="btn btn-primary">Gorde</button>
      </div>
    </div>
  </div>
</div>



<!-- Ezabatzeko modal -->
<div class="modal fade" id="ezabatuModal" tabindex="-1" aria-labelledby="ezabatuModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ezabatuModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Ziur zaude elementu hori ezabatu nahi duzula?</p>
        <p class="text-danger">Ekintza hau ez da itzulgarria</p>
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Utzi</button>
        <button type="button" class="btn btn-danger btnEzabatu" id="confirmEzabatuBtn">Ezabatu</button>

      </div>
    </div>
  </div>
</div>