<?php
require '../db.php';
require '../models/Kokaleku.php';
require_once __DIR__ . '/../src/require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$kokalekuDB = new Kokaleku($db);

header('Content-Type: application/json; charset=utf-8');

// GET: devolver todos los kokalekuak
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = $kokalekuDB->getAll();
    echo json_encode($data);
    exit();
}

// POST: crear un kokaleku nuevo
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    if (!isset($body['etiketa'], $body['idGela'], $body['hasieraData'], $body['amaieraData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos obligatorios']);
        exit();
    }

    $res = $kokalekuDB->create(
        $body['etiketa'],
        $body['idGela'],
        $body['hasieraData'],
        $body['amaieraData']
    );

    if ($res) {
        echo json_encode(['message' => 'Kokaleku sortuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea sortzean']);
    }
    exit();
}

// DELETE: eliminar un kokaleku existente
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['etiketa'], $body['hasieraData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos: etiketa eta hasieraData behar dira']);
        exit();
    }

    $res = $kokalekuDB->delete($body['etiketa'], $body['hasieraData']);

    if ($res) {
        echo json_encode(['message' => 'Kokaleku ezabatuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea ezabatzean']);
    }
    exit();
}

// Otros métodos no permitidos
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
