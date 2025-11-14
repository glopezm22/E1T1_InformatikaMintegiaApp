<?php
// Fitxategi honek kudeatzen ditu aplikazioaren rutak (.htaccess lagunduta Apacherako)

// JSON erantzunak nahi baditugu lehenetsi gisa, deskomentatu behar da:
// // header('Content-Type: application/json; charset=utf-8');

// Eskatutako bidea lortu
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// "Base"-a detektatu (app dagoen azpikarpetan) eta kendu bideetatik.
// Horrela / edo /app/ bezalakoetan funtzionatzen du
$route = trim($uri, '/');

// Biderik ez badago -> landing page
if ($route === '') {
    $route = 'index';
}

// Mapeo sinplea, sartu rutak
$routes = [
    'index'     => __DIR__ . '/index.html',
    'home'        => __DIR__ . '/home.php',
    'inbentarioa' => __DIR__ . '/inbentarioa.php',
    'ekipoak'     => __DIR__ . '/ekipoak.php',
    'kudeaketa'   => __DIR__ . '/kudeaketa.php',
    'login'       => __DIR__ . '/login.html',
    'kontua'      => __DIR__ . '/perfil.php',
    'erabiltzaileak'      => __DIR__ . '/erabiltzaileak.php'
];

// Ruta mapan badago, kargatu zuzenean
if (isset($routes[$route]) && file_exists($routes[$route])) {
    require $routes[$route];
    exit;
}

// Ez badago mapan, saiatu <ruta>.php
$maybe = __DIR__ . $route . '.php';
if (file_exists($maybe)) {
    require $maybe;
    exit;
}

// Ez badago, 404
http_response_code(404);
// JSON nahi badugu: echo json_encode(['error'=>'Ez da aurkitu']);
// Probak azkarrak egiteko:
echo '404 - Ez da aurkitu';
exit;
