<?php
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../models/Erabiltzaile.php';

header('Content-Type: application/json; charset=utf-8');
// Datu-baserako konexioa
$db = new DB();
$db->konektatu();
$model = new Erabiltzaile($db);

// Helpers erantzunak JSON
function json_err($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit();
}

// Erantzun orokorra
function json_ok($data = [], $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

// Helper: saioa berreraiki cookie remember_me erabiliz, hala badagokio
function tryRebuildSessionFromCookie($model) {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (!empty($_SESSION['user'])) return; 

    if (!empty($_COOKIE['remember_me'])) {
        $token = $_COOKIE['remember_me'];
        $u = $model->validateRememberToken($token);
        if ($u) {
            // Session user berreraiki (pasahitzik gabe)
            $_SESSION['user'] = [
                'nan' => $u['nan'],
                'izena' => $u['izena'],
                'abizena' => $u['abizena'],
                'erabiltzailea' => $u['erabiltzailea'],
                'rola' => $u['rola']
            ];
        } else {
            // token baliogabea edo iraungia -> cookiea ezabatu segurtasunagatik
            setcookie('remember_me', '', time() - 3600, '/', '', false, true);
            #samesite 'None' -> Produkzioko aplikazioan (zerbitzarian) lerro hau jartzen da da.
            # Produkzioko aplikazioan (zerbitzarian) '.talde1.edu' jartzen da domeinu bezala.
        }
    }
}

// Saioa automatikoki berreraiki eskaera bakoitzean, hala badagokio
tryRebuildSessionFromCookie($model);

// Login
if ($method === 'POST' && $action === 'login') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $user = $body['erabiltzailea'] ?? null;
    $pass = $body['pasahitza'] ?? null;
    $remember = !empty($body['remember']) ? true : false;

    if (!$user || !$pass) json_err('Erabiltzailea eta pasahitza beharrezkoak dira.', 400);

    $u = $model->authenticateSimple($user, $pass);
    if (!$u) json_err('Autentikazioa huts egin du.', 401);

    // Saioa hasi
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    $_SESSION['user'] = [
        'nan' => $u['nan'],
        'izena' => $u['izena'],
        'abizena' => $u['abizena'],
        'erabiltzailea' => $u['erabiltzailea'],
        'rola' => $u['rola']
    ];

    // Remember-me: token sortu, BDn gorde eta cookie
    if ($remember) {
        try {
            $token = bin2hex(random_bytes(32)); 
        } catch (Exception $e) {
            $token = bin2hex(openssl_random_pseudo_bytes(32));
        }
        $expira_ts = time() + (7 * 24 * 60 * 60);
        $expira = date('Y-m-d H:i:s', $expira_ts);
        $model->createRememberToken($u['nan'], $token, $expira);
        setcookie('remember_me', $token, $expira_ts, '/', '', false, true);
        #samesite 'None' -> Produkzioko aplikazioan (zerbitzarian) lerro hau jartzen da da.
        # Produkzioko aplikazioan (zerbitzarian) '.talde1.edu' jartzen da domeinu bezala.   
    }

    json_ok(['message' => 'Saioa ondo hasi da.', 'user' => $_SESSION['user']]);
    exit();
}

// Logout
if ($method === 'POST' && $action === 'logout') {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();

    // Ezabatu token BDn cookierik badago
    if (!empty($_COOKIE['remember_me'])) {
        $model->deleteRememberToken($_COOKIE['remember_me']);
        setcookie('remember_me', '', time() - 3600, '/', '', false, true);
        #samesite 'None' -> Produkzioko aplikazioan (zerbitzarian) lerro hau jartzen da da.
        # Produkzioko aplikazioan (zerbitzarian) '.talde1.edu' jartzen da domeinu bezala.         
    }

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
    exit();
}

// Me
if ($method === 'GET' && $action === 'me') {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (empty($_SESSION['user'])) json_err('Erabiltzaile saiorik ez.', 401);
    json_ok(['user' => $_SESSION['user']]);
    exit();
}

// Bestela
json_err('Bideratze okerra. Erabili ?action=login|logout|me', 400);
