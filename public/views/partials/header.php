<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/img/icon/icon.ico" />
    <base href="/app/public/">
    <link rel="stylesheet" href="assets/vendor/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/styles.css" />
    <title>FP Santurtzi LH</title>
</head>
<body>
<header>
    <nav class="navbar navbar-expand-lg">
        
        <a class="navbar-brand ms-5" href="views/home.php"><img src="assets/img/logo/FPSanturtzi_Logo.png" /></a>
        
        <button class="navbar-toggler custom-transition collapsed" 
                type="button" 
                data-bs-toggle="collapse"       
                data-bs-target="#mainMenu"       
                aria-controls="mainMenu" 
                aria-expanded="false"  
                aria-label="Toggle navigation">
            
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
        </button>
        
        <div class="collapse navbar-collapse me-5" id="mainMenu">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> 
                <li class="nav-item">
                    <a class="nav-link" href="#">Primero</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Segundo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Tercero</a>
                </li>
            </ul>
        </div>
    </nav>
</header>