<?php
require '../db.php';
require '../models/Kokaleku.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$kokalekuDB = new Kokaleku($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu kokaleku guztiak edo bakarra ID bidez
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['etiketa'], $_GET['hasieraData'])) {
        $etiketa = $_GET['etiketa'];
        $hasieraData = $_GET['hasieraData'];
        $data = $kokalekuDB->get($etiketa, $hasieraData);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } elseif (isset($_GET['idGela'])) {
        $idGela = $_GET['idGela'];
        $data = $kokalekuDB->getByGela($idGela);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } elseif (isset($_GET['etiketa'])) {
        $etiketa = $_GET['etiketa'];
        $data = $kokalekuDB->getByEtiketa($etiketa);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } else {
        $data = $kokalekuDB->getAll();
        echo json_encode($data);
    }
    exit();
}

// POST: sortu kokaleku berria
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    if (!isset($body['etiketa'], $body['idGela'], $body['hasieraData'], $body['amaieraData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta dira derrigorrezko datuak']);
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

// DELETE: kendu kokalekua
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['etiketa'], $body['hasieraData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Etiketa edo hasieraData falta dira']);
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

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
