<?php
require '../db.php';
require '../models/Inbentario.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$inbentarioDB = new Inbentario($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu registro guztiak edo bakarra etiketa bidez
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['etiketa'])) {
        $etiketa = $_GET['etiketa'];
        $data = $inbentarioDB->get($etiketa);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } else {
        $data = $inbentarioDB->getAll();
        echo json_encode($data);
    }
    exit();
}

// POST: sortu erregistro berriak.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (!isset($body['etiketa'], $body['idEkipamendu'], $body['erosketaData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos obligatorios']);
        exit();
    }

    $res = $inbentarioDB->create($body['etiketa'], $body['idEkipamendu'], $body['erosketaData']);
    if ($res) {
        echo json_encode(['message' => 'Creado con éxito']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'No se pudo crear el registro']);
    }
    exit();
}

// DELETE: kendu erregistroak.
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;
    if (!isset($body['etiketa'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el campo etiketa']);
        exit();
    }

    $res = $inbentarioDB->delete($body['etiketa']);
    if ($res) {
        echo json_encode(['message' => 'Borrado con éxito']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'No se pudo eliminar']);
    }
    exit();
}

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
