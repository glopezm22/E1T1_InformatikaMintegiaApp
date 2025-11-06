<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_admin_view('login', 'home');
?>
<?php require_once "partials/header.php" ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
<main class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">
  <div class="container bg-light p-md-5 pt-5 rounded-2">
    <div class="contenedor my-5">
      <h1 class="mb-3 text-dark">Erabiltzaileak</h1>
      <div class="mb-4 me-3 d-flex justify-content-end">
        <button class="btn btn-sm btnSumar" id="sumarErabiltzaile" alt="Sortu erabiltzaile berria"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div class="input-group mb-4 bilatu">
        <input type="text" class="form-control bilatuInput" placeholder="NAN, Izena edo Erabiltzaile bidez bilatu ...">
        <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
      </div>
      <div style="overflow-y: auto; max-height: 500px;">
        <table class="table table-hover" id="tabla-erabiltzaileak">
          <thead>
            <tr>
              <th scope="col">NAN</th>
              <th scope="col">Izena</th>
              <th scope="col">Abizena</th>
              <th scope="col">Erabiltzailea</th>
              <th scope="col">Rola</th>
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
<script type="module" src="../assets/js/erabiltzaileak.js"></script>
<?php require_once "partials/footer.html" ?>


<div class="modal fade" id="erabiltzaileakModal" tabindex="-1" aria-labelledby="erabiltzaileakModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="erabiltzaileakModalLabel"><i class="fa-solid fa-user me-2"></i>Erabiltzailea</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="erabiltzaileaGehituModal" tabindex="-1" aria-labelledby="erabiltzaileaGehituModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="erabiltzaileaGehituModalLabel"><i class="fa-solid fa-plus me-2"></i> Sortu Erabiltzailea</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <form method="post" action="#" class="modal-body pe-5 ps-5">
        <label for="nan" class="form-label">NAN:</label>
        <input type="text" class="form-control" id="nan" aria-describedby="nan">
        <label for="izena" class="form-label mt-2">Izena:</label>
        <input type="text" class="form-control" id="izena" aria-describedby="izena">
        <label for="abizena" class="form-label mt-2">Abizena:</label>
        <input type="text" class="form-control" id="abizena" aria-describedby="abizena">
        <label for="erabiltzailea" class="form-label mt-2">Erabiltzailea:</label>
        <input type="text" class="form-control" id="erabiltzailea" aria-describedby="erabiltzailea">
        <div class="d-flex justify-content-center mt-4 mb-2">
          <button class="btn btn-primary" type="submit">Sortu</button>
        </div>
      </form>
    </div>
  </div>
</div>