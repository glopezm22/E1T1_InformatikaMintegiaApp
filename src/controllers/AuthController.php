<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../models/Erabiltzaile.php';

header('Content-Type: application/json; charset=utf-8');

$db = new DB();
$db->konektatu();
$model = new Erabiltzaile($db);

function json_err($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit();
}

function json_ok($data = [], $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

// Login
if ($method === 'POST' && $action === 'login') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $user = $body['erabiltzailea'] ?? null;
    $pass = $body['pasahitza'] ?? null;

    if (!$user || !$pass) json_err('Erabiltzailea eta pasahitza beharrezkoak dira.', 400);

    $u = $model->authenticateSimple($user, $pass);
    if (!$u) json_err('Autentikazioa huts egin du.', 401);

    // Saioa hasi
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    // Gorde erabiltzailearen oinarrizko datuak saioan
    $_SESSION['user'] = [
        'nan' => $u['nan'],
        'izena' => $u['izena'],
        'abizena' => $u['abizena'],
        'erabiltzailea' => $u['erabiltzailea'],
        'rola' => $u['rola']
    ];

    json_ok(['message' => 'Saioa ondo hasi da.', 'user' => $_SESSION['user']]);
}

// Logout
if ($method === 'POST' && $action === 'logout') {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    json_ok(['message' => 'Saioa itxi da.']);
}

// Me
if ($method === 'GET' && $action === 'me') {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (empty($_SESSION['user'])) json_err('Erabiltzaile saiorik ez.', 401);
    json_ok(['user' => $_SESSION['user']]);
}

// Bestela
json_err('Bideratze okerra. Erabili ?action=login|logout|me', 400);
