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
        <button class="btn btn-sm btnSumar" id="sumarEkipo" alt="Sortu ekipo berria"><i class="fa-solid fa-plus"></i></button>
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
<?php require_once "partials/footer.html" ?>


<div class="modal fade" id="ekipoakModal" tabindex="-1" aria-labelledby="ekipoakModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoakModalLabel"><i class="fa-solid fa-truck-ramp-box me-2"></i> Produktu Inbentariatua</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="ekipoakGehituModal" tabindex="-1" aria-labelledby="ekipoakGehituModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="ekipoakGehituModalLabel"><i class="fa-solid fa-plus me-2"></i> Gehitu Ekipoa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <form method="post" action="#" class="modal-body pe-5 ps-5">
        <label for="izena" class="form-label">Izena:</label>
        <input type="text" class="form-control" id="izena" aria-describedby="izena">
        <label for="deskibapena" class="form-label mt-2">Deskibapena:</label>
        <input type="text" class="form-control" id="deskibapena" aria-describedby="deskibapena">
        <label for="marka" class="form-label mt-2">Marka:</label>
        <input type="text" class="form-control" id="marka" aria-describedby="marka">
        <label for="modeloa" class="form-label mt-2">Modeloa:</label>
        <input type="text" class="form-control" id="modeloa" aria-describedby="modeloa">
        <label for="stock" class="form-label mt-2">Stock:</label>
        <input type="number" class="form-control" id="stock" aria-describedby="stock">
        <label for="kategoria" class="form-label mt-2">Kategoria:</label>
        <select class="form-select" aria-label="kategoria">
          <option selected>Aukeratu bat ...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div class="d-flex justify-content-center mt-4 mb-2">
          <button class="btn btn-primary" type="submit">Sortu</button>
        </div>
      </form>
    </div>
  </div>
</div>