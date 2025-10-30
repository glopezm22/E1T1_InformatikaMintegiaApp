<?php
require '../db.php';
require '../models/Kategoria.php';
require_once __DIR__ . '/../src/require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$kategoriaDB = new Kategoria($db);

header('Content-Type: application/json; charset=utf-8');

// GET: devolver todas las categorías
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = $kategoriaDB->getAll();
    echo json_encode($data);
    exit();
}

// POST: crear una categoría nueva
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    if (!isset($body['izena'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el campo izena']);
        exit();
    }

    $res = $kategoriaDB->create($body['izena']);
    if ($res) {
        echo json_encode(['message' => 'Kategoria sortuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea sortzean']);
    }
    exit();
}

// DELETE: eliminar una categoría
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el campo id']);
        exit();
    }

    $res = $kategoriaDB->delete($body['id']);
    if ($res) {
        echo json_encode(['message' => 'Kategoria ezabatuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea ezabatzean']);
    }
    exit();
}

// Otros métodos no permitidos
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
