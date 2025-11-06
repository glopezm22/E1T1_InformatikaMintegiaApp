<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../assets/img/icon/icon.ico" />
    <link rel="stylesheet" href="../assets/vendor/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="..." crossorigin="anonymous" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <link rel="stylesheet" href="../assets/css/syles2.css" />
    <title>FP Santurtzi LH</title>
</head>
<body>
<header>
    <nav class="navbar navbar-expand-lg pb-3 fixed-top">
        
        <a class="navbar-brand ms-5" href="home" alt="Orri printzipalera joan"><img src="../assets/img/logo/FPSanturtzi_Logo.png" alt="FP Santurtzi LH logoa" /></a>
        
        <button class="navbar-toggler custom-transition collapsed"
                type="button" 
                alt="Menua Ireki"
                data-bs-toggle="collapse"       
                data-bs-target="#mainMenu"       
                aria-controls="mainMenu" 
                aria-expanded="false"  
                aria-label="Toggle navigation">
            
            <div class="hamburger-lines me-3">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
        </button>
        
        <div class="collapse navbar-collapse me-5 ms-5 ms-lg-0 mt-3 mt-lg-0" id="mainMenu">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> 
                <hr class="-none d-lg-block">
                <li class="nav-item">
                    <a class="nav-link" href="./inbentarioa" alt="Inbentariora joan">Inbentarioa</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./ekipoak" alt="Ekipoetara joan">Ekipoak</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./erosketak" alt="Erosketara joan">Erosketak</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./kokalekua" alt="Kokalekura joan">Kokalekua</a>
                </li>
                <?php if (isset($CURRENT_USER['rola']) && $CURRENT_USER['rola'] === 'A'): ?>
                    <li class="nav-item">
                        <a class="nav-link" href="./erabiltzaileak" alt="Erabiltzaileetara joan">Erabiltzaileak</a>
                    </li>
                <?php endif; ?>
                <li class="d-lg-none nav-item">
                    <a class="nav-link" href="./kontua" alt="Nire kontuaren modal-a ireki">Nire kontua</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-5 mb-2 mb-lg-0">
                <li class="perfil d-none d-lg-block position-relative">
                    <a href="#" id="profile-toggle" class="profile-toggle d-block">
                        <img src="../assets/img/perfil/perfil.png" alt="Nire perfila-ren argazkia" />
                    </a>

                    <div id="profile-menu" class="profile-menu-box card shadow-lg p-3 bg-white border border-secondary rounded-3">
                        
                        <button class="close-btn position-absolute top-0 end-0 m-2 border-0 bg-transparent text-secondary" aria-label="Itxi menua" alt="Itxi menua">
                            <i class="fas fa-times x-cerrar-pront"></i>
                        </button>
                        <div class="d-block mb-3"></div>
                        <a href="./kontua" class="btn btn-primary btnPerf w-100 mb-2" alt="Nire kontura joan">
                            <i class="fas fa-user me-1"></i>Nire kontua
                        </a>
                        <a id="logoutBtnMenu" class="btn btn-danger w-100 btnSaiItx" alt="Nire saioa itxi">
                            <i class="fas fa-sign-out-alt me-1"></i> Saioa Itxi
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header>