<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

<main class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">
  <div class="container bg-light p-md-5 pt-5 rounded-2">
    <div class="contenedor my-5">
      <h1 class="mb-3 text-dark">Ekipoak</h1>
      <div class="mb-4 me-3 d-flex justify-content-end">
        <button class="btn btn-sm btnSumar" id="sumarEkipo" title="Sortu ekipo berria"><i class="fa-solid fa-plus"></i> Sortu</button>
      </div>
      <div class="input-group mb-4 bilatu">
        <input type="text" class="form-control bilatuInput" placeholder="Izena, Marka edo Modelo bidez bilatu ...">
        <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
      </div>
      <div style="overflow-y: auto; max-height: 500px;">
        <table class="table table-hover" id="tabla-ekipoak">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Izena</th>
              <th scope="col">Deskribapena</th>
              <th scope="col">Marka</th>
              <th scope="col">Modeloa</th>
              <th scope="col">Stock</th>
              <th scope="col">Kategoria</th>
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
<script type="module" src="../assets/js/ekipoak.js"></script>
<?php require_once "partials/footer.php" ?>

<!-- ikusi modal -->
<div class="modal fade" id="ekipoakModal" tabindex="-1" aria-labelledby="ekipoakModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoakModalLabel"></i> Ekipoa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>

<!-- gehitu ekipo modal -->
<div class="modal fade" style="margin-top: 50px" id="ekipoModalAdd" tabindex="-1" aria-labelledby="ekipoModalAddLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content ">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoModalAddLabel">Ekipo berria sortu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       
      </div>
      <div class="modal-footer">
        <button id="btnGordeBerria" type="button" class="btn btn-primary">Sortu</button>
      </div>
    </div>
  </div>
</div>

<!-- Editatzeko modal -->
<div class="modal fade" style="margin-top: 50px" id="ekipoModal" data-mota="" tabindex="-1" aria-labelledby="inbentarioaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content ">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="inbentarioaModalLabel"></h5>
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



<!-- ezabatzeko modal -->
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