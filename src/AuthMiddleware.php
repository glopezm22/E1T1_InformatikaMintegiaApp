<?php
header('Content-Type: application/json; charset=utf-8');

function requireAuth() {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (empty($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Saio baliogabea. Identifikatu mesedez.']);
        exit();
    }
    return $_SESSION['user'];
}
