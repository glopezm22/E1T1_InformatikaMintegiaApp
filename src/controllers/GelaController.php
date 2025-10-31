<?php
require '../db.php';
require '../models/Gela.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$gelaDB = new Gela($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu gela guztiak edo bakarra ID bidez
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $data = $gelaDB->get($id);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } else {
        $data = $gelaDB->getAll();
        echo json_encode($data);
    }
    exit();
}

// POST: sortu gela berriak
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    if (!isset($body['izena'], $body['taldea'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta dira derrigorrezko datuak']);
        exit();
    }

    $res = $gelaDB->create(
        $body['izena'], 
        $body['taldea']
    );

    if ($res) {
        echo json_encode(['message' => 'Gela sortuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea sortzean']);
    }
    exit();
}

// DELETE: kendu gela
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID falta da']);
        exit();
    }

    $res = $gelaDB->delete($body['id']);

    if ($res) {
        echo json_encode(['message' => 'Gela ezabatuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea ezabatzean']);
    }
    exit();
}

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
