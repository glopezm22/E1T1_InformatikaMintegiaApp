<?php
// Middleware bakarra bistetarako eta APIetarako.
// $_SESSION['user'] berreraikitzen du remember_me cookie baliozkoa bada.

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/models/Erabiltzaile.php';

// Configuración segura de cookie de sesión para subdominios
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '', # Produkzioko aplikazioan .talde1.edu jartzen da.
    'secure' => false, # Produkzioko aplikazioan secure true jartzen da HTTPS konexiorako.
    'httponly' => true#,
    #'samesite' => 'None' # Produkzioko aplikazioan (zerbitzarian) lerro hau deskomentatzen da.
]);

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

$db = new DB();
$db->konektatu();
$model = new Erabiltzaile($db);

/** Sesioa berreraikitzen du remember_me cookietik, baldin eta egokia bada. */
function _rebuild_session_from_cookie($model) {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (!empty($_SESSION['user'])) return;
    if (empty($_COOKIE['remember_me'])) return;

    $token = $_COOKIE['remember_me'];
    $u = $model->validateRememberToken($token);
    if ($u) {
        $_SESSION['user'] = [
            'nan' => $u['nan'],
            'izena' => $u['izena'],
            'abizena' => $u['abizena'],
            'erabiltzailea' => $u['erabiltzailea'],
            'rola' => $u['rola']
        ];
    } else {
        // token baliogabea/iraila: cookie-a ezabatzen dugu
        setcookie('remember_me', '', time() - 3600, '/', '', false, true);
        #samesite 'None' -> Produkzioko aplikazioan (zerbitzarian) lerro hau jartzen da da.
        # Produkzioko aplikazioan (zerbitzarian) '.talde1.edu' jartzen da domeinu bezala.
        unset($_COOKIE['remember_me']);
    }
}

/**
 * Bistetan erabiltzeko (PHP). Sesio baliogabea bada $redirect-era birbideratzen du.
 * Erabiltzailearen array-a itzultzen du.
 */
function require_auth_view($redirect = '/login') {
    global $model;
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    _rebuild_session_from_cookie($model);
    if (empty($_SESSION['user'])) {
        header('Location: ' . $redirect);
        exit();
    }
    return $_SESSION['user'];
}

/**
 * API endpointetan erabiltzeko. Sesio baliogabea bada JSON 401 bidaltzen du eta bukatzen du.
 * Erabiltzailearen array-a itzultzen du.
 */
function require_auth_api() {
    global $model;
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    _rebuild_session_from_cookie($model);
    if (empty($_SESSION['user'])) {
        http_response_code(401);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Erabiltzaile saiorik ez.']);
        exit();
    }
    header('Content-Type: application/json; charset=utf-8');
    return $_SESSION['user'];
}

/**
 * Egiaztatzen du logeatuta dagoen erabiltzailea administratzailea den.
 * Bistetarako: ez bada administratzailea, birbideratzen du.
 */
function require_admin_view($redirectLogin = '/login', $redirectNoAdmin = '/home') {
    $user = require_auth_view($redirectLogin);
    if ($user['rola'] !== 'A') {
        header('Location: ' . $redirectNoAdmin);
        exit();
    }
    return $user;
}

/**
 * Egiaztatzen du logeatuta dagoen erabiltzailea administratzailea den API-rako.
 * JSON 403 itzultzen du ez bada administratzailea.
 */
function require_admin_api() {
    $user = require_auth_api();
    if (!isset($user['rola']) || $user['rola'] !== 'A') {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Acceso denegado: solo administradores']);
        exit();
    }
    return $user;
}
