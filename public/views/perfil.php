<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

    <main class="container-fluid text-white vh-100 d-flex align-items-center justify-content-center p-5 container-home">
        <div class="container color-ez mb-5">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10">
                    <div class="card shadow-lg rounded-3 border-0 overflow-hidden container-carta">
                        <div class="card-body p-4 p-md-5 bg-white">
                            <div class="row">
                                <div class="col-md-4 text-center mb-4 mb-md-0 border-end pe-4 nombre-perfil">
                                    <img src="./assets/img/perfil/perfil.png" alt="Foto de Perfil" class="rounded-circle mb-3 border border-4 border-secondary">
                                    <h3 id="erabiltzailea" class="fw-bold mb-1 text-uppercase"></h3>
                                    <p class="text-primary fw-medium small text-muted" id="rola"></p>
                                </div>

                                <div class="col-md-8 ps-md-5">
                                    <h4 class="mb-4 text-secondary border-bottom pb-2 fw-semibold">Informazio Pertsonala</h4>

                                    <ul class="list-unstyled">
                                        <li class="mb-3">
                                            <p class="mb-0 text-muted small"><i class="bi bi-envelope me-2"></i> NAN:</p>
                                            <p id="nan" class="fw-normal fs-6 text-dark ms-3"></p>
                                        </li>
                                        <li class="mb-3">
                                            <p class="mb-0 text-muted small"><i class="bi bi-person me-2"></i> Izena:</p>
                                            <p id="izena" class="fw-normal fs-6 text-dark ms-3"></p>
                                        </li>
                                        <li class="mb-3">
                                            <p class="mb-0 text-muted small"><i class="bi bi-person-fill me-2"></i> Abizena:</p>
                                            <p id="abizena" class="fw-normal fs-6 text-dark ms-3"></p>
                                        </li>
                                        <li class="mb-3">
                                            <p class="mb-1 text-muted small"><i class="bi bi-person-fill me-2"></i> Theme:</p>
                                            <button id="themeToggle" class="btn btn-sm btnIkusi ms-3">
                                                <i class="fas fa-moon"></i>
                                            </button>
                                        </li>
                                    </ul>

                                    <hr class="mt-4 mb-3">

                                    <button id="logoutBtnProfile" class="text-decoration-none btn btn-danger btnSaiItx fw-medium d-inline-block align-items-center" alt="Saioa Itxi">
                                        <i class="fas fa-sign-out-alt me-1"></i> Saioa Itxi
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

<?php require_once "partials/footer.php" ?>

<script src="./assets/js/profileLoad.js"></script>