<?php
require_once __DIR__ . '/../../src/require_auth.php';
$CURRENT_USER = require_auth_view('login');
?>
<?php require_once "partials/header.php" ?>

<main>
    <div class="container-fluid text-white vh-100 d-flex align-items-center justify-content-center p-5 container-home">

        <div class="text-center">
            <h1 class="display-1 fw-bolder text-uppercase mb-4 title-home">
                Ongietorri
            </h1>
            
            <h2 class="display-5 fw-light mb-5 subtitle-home">
                FP Santurtzi LH
            </h2>

            <a href="./kontua" class="px-5 py-3 rounded-pill shadow-lg text-decoration-none btnHome" alt="Joan Nire Profilera">
                Ikusi Profila
            </a>
        </div>
    </div>
</main>

<?php require_once "partials/footer.html" ?>