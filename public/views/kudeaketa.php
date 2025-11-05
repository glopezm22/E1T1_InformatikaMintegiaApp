<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.html" ?>

<div class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">

  <main class="py-3 py-md-5" style="min-height: 80vh;">

    <div class="container mt-3 mt-md-5">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-md-10">
          <div class="card-erosketacard shadow-xl rounded-3 border-0">
            <div class="card-body p-0">
              <!-- pestainak -->
              <ul class="nav nav-tabs erosketak flex-column flex-md-row tab-list-custom" id="myTab">

                <li class="btn-superior-erosketak flex-md-fill">
                  <button class="nav-link active rounded-top-3 px-4" id="tab-opcion1" data-bs-toggle="tab"
                    data-bs-target="#content-opcion1">
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

              <div class="tab-content p-3 p-md-5 radius-inferior-5" id="myTabContent">
                <div class="tab-pane fade show active" id="content-opcion1" aria-labelledby="tab-opcion1">
                  <!--gelen taula -->
                  <table class=" table  table-hover" id="tabla-gelak">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">izena</th>
                        <th scope="col">taldea</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>

                <div class="tab-pane fade" id="content-opcion2" aria-labelledby="tab-opcion2">
                  <!--Kokalekuen taula -->
                  <table class=" table  table-hover" id="tabla-kokalekuak">
                    <thead>
                      <tr>
                        <th scope="col">Etiketa</th>
                        <th scope="col">id gela</th>
                        <th scope="col">hasiera data</th>
                        <th scope="col">amaiera data</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>

                <div class="tab-pane fade" id="content-opcion3" aria-labelledby="tab-opcion3">
                  <!--kategorien taula -->
                  <table class=" table  table-hover" id="tabla-kategoriak">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">izena</th>
                        <th scope="col"></th>
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
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<script type="module" src="../assets/js/kudeaketa.js"></script>
<?php require_once "partials/footer.html" ?>