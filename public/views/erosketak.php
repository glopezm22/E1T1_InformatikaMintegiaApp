<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

<div class="container-fluid text-white d-block align-items-center justify-content-center p-3 p-md-5 container-home">
    
<main class="py-3 py-md-5" style="min-height: 80vh;">
    
    <div class="container mt-3 mt-md-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                <div class="card-erosketacard shadow-xl rounded-3 border-0">

                    <ul class="nav nav-tabs erosketak flex-column flex-md-row tab-list-custom" id="myTab">
                        
                        <li class="btn-superior-erosketak flex-md-fill">
                            <button class="nav-link active rounded-top-3 px-4" id="tab-opcion1" data-bs-toggle="tab" data-bs-target="#content-opcion1">
                                <i class="fa-solid fa-note-sticky me-1"></i> Gehitu Stock-a
                            </button>
                        </li>
                        
                        <li class="btn-inferior-erosketak flex-md-fill">
                            <button class="nav-link rounded-top-3 px-4" id="tab-opcion2" data-bs-toggle="tab" data-bs-target="#content-opcion2">
                                <i class="fa-solid fa-toolbox me-1"></i> Sortu Ekipoa
                            </button>
                        </li>
                    </ul>

                    <section class="tab-content p-3 p-md-5 radius-inferior-5" id="myTabContent">
                    
                        <article class="tab-pane fade show active" id="content-opcion1" aria-labelledby="tab-opcion1">
                            <h5 class="text-dark mb-4 border-bottom pb-2"><i class="fa-solid fa-plus ms-1"></i> Stock</h5>
                            <form method="post" action="#">
                                <div class="form-floating mb-3">
                                    <select class="form-select" id="ekipoa_stock" name="ekipoa_stock" aria-label="Ekipoa hautatu">
                                        <option selected disabled value="">Aukeratu bat...</option>
                                        <option value="1">Ejemplo 1</option>
                                        <option value="2">Ejemplo 2</option>
                                    </select>
                                    <label for="ekipoa_stock">Ekipoa</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="kopurua_stock" placeholder="Idatzi kopurua...">
                                    <label for="kopurua_stock">Kopurua</label>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-lg">Gehitu <i class="ms-1 fa-solid fa-paper-plane"></i></button>
                                </div>
                            </form>
                        </article>
                        
                        <article class="tab-pane fade" id="content-opcion2" aria-labelledby="tab-opcion2">
                            <h5 class="text-dark mb-4 border-bottom pb-2"><i class="fa-solid fa-plus ms-1"></i> Ekipoa</h5>
                            <form method="post" action="#">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="izena_ekipoa" placeholder="Idatzi izena...">
                                    <label for="izena_ekipoa">Izena</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="marka_ekipoa" placeholder="Idatzi marka...">
                                    <label for="marka_ekipoa">Marka</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="modeloa_ekipoa" placeholder="Idatzi modeloa...">
                                    <label for="modeloa_ekipoa">Modeloa</label>

                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="deskribapena_ekipoa" placeholder="Idatzi deskribapena...">
                                    <label for="deskribapena_ekipoa">Deskribapena</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <select class="form-select" id="kategoria_ekipoa" name="kategoria_ekipoa" aria-label="Kategoria hautatu">
                                        <option selected disabled value="">Aukeratu bat...</option>
                                        <option value="1">Ejemplo 1</option>
                                        <option value="2">Ejemplo 2</option>
                                    </select>
                                    <label for="kategoria_ekipoa">Kategoria</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="kopurua_ekipoa" placeholder="Idatzi kopurua...">
                                    <label for="kopurua_ekipoa">Kopurua</label>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-lg">Sortu <i class="ms-1 fa-solid fa-paper-plane"></i></button>
                                </div>
                            </form>
                        </article>
                    </section>
                </div>
            </div>
        </div>
    </div>
</main>
</div>

<?php require_once "partials/footer.html" ?>