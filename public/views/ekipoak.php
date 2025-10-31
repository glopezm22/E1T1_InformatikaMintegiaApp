<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.html" ?>

<main class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">
  <div class="container bg-light p-5 rounded-2">
    <div class="contenedor my-5">
      <h1 class="mb-5 text-dark">Ekipoak</h1>
      <div style="overflow-y: auto; max-height: 500px;">
        <table class=" table  table-hover" id="tabla-ekipoak">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Izena</th>
              <th scope="col">Deskribapena</th>
              <th scope="col">Marka</th>
              <th scope="col">Modeloa</th>
              <th scope="col">Stock</th>
              <th scope="col">Kategoria ID</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
<script type="module" src="../assets/js/ekipoak.js"></script>
<?php require_once "partials/footer.html" ?>


<div class="modal fade" id="ekipoakModal" tabindex="-1" aria-labelledby="ekipoakModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoakModalLabel">Produktu Inbentariatua</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>
