<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

<style>

</style>

<div class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">

  <main class="py-3 py-md-5" style="min-height: 80vh;">

    <div class="container color-ez mt-3 mt-md-5">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-md-10">
          <div class="card-erosketacard shadow-xl rounded-3 border-0">
            <div class="card-body p-0">
              <!-- PESTAINAK -->
              <ul class="nav nav-tabs erosketak flex-column flex-md-row tab-list-custom" id="myTab">
                <li class="btn-superior-erosketak flex-md-fill">
                  <button class="nav-link active rounded-top-3 px-4" id="tab-opcion1" 
                  data-bs-toggle="tab" data-bs-target="#content-opcion1">
                    Gelak
                  </button>
                </li>


                <li class="flex-md-fill">
                  <button class="nav-link rounded-top-3 px-4" id="tab-opcion2" data-bs-toggle="tab"
                    data-bs-target="#content-opcion2">
                    Kokalekuak
                  </button>
                </li>

                <li class="btn-inferior-erosketak flex-md-fill">
                  <button class="nav-link rounded-top-3 px-4" id="tab-opcion3" data-bs-toggle="tab"
                    data-bs-target="#content-opcion3">
                    Kategoriak
                  </button>
                </li>
              </ul>
              <!-- GELAK TAB -->
              <div class="tab-content p-3 p-md-5 radius-inferior-5" id="myTabContent">
                <div class="tab-pane fade show active" id="content-opcion1" aria-labelledby="tab-opcion1">
                  <div class="mb-4 me-3 d-flex justify-content-end">
                    <button class="btn btn-sm btnSumar" id="sumarGela" title="Sortu gela berria"><i class="fa-solid fa-plus"></i> Sortu</button>
                  </div>
                  <div class="table-responsive table-scroll-container">
                    <table class="table table-hover" id="tabla-gelak">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Izena</th>
                          <th scope="col">Taldea</th>
                          <th scope="col" colspan="2"></th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- KOKALEKU TAB -->
                <div class="tab-pane fade" id="content-opcion2" aria-labelledby="tab-opcion2">
                  <div class="table-responsive table-scroll-container">
                    <table class="table table-hover" id="tabla-kokalekuak">
                      <thead>
                        <tr>
                          <th scope="col">Etiketa</th>
                          <th scope="col">Gela</th>
                          <th scope="col">Hasiera data</th>
                          <th scope="col">Amaiera data</th>
                          <th scope="col" colspan="2"></th>

                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- KATEGORIA TAB -->
                <div class="tab-pane fade" id="content-opcion3" aria-labelledby="tab-opcion3">
                  <div class="mb-4 me-3 d-flex justify-content-end">
                    <button class="btn btn-sm btnSumar" id="sumarKategoria" title="Sortu kategoria berria"><i class="fa-solid fa-plus"></i> Sortu</button>
                  </div>
                  <div class="table-responsive table-scroll-container">
                    <table class="table table-hover" id="tabla-kategoriak">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Izena</th>
                          <th scope="col" colspan="2"></th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<script type="module" src="./assets/js/kudeaketa.js"></script>
<?php require_once "partials/footer.php" ?>

<!-- Modal editatzeko -->
<div class="modal fade" id="kudeaketaModal" data-mota="" tabindex="-1" aria-labelledby="inbentarioaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title" id="inbentarioaModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button id="btnGorde" type="button" class="btn btn-primary">Gorde</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal ezabatu -->
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