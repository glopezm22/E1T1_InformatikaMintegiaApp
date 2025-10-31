<?php
require '../db.php';
require '../models/Erabiltzaile.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_admin_api();

$db = new DB();
$db->konektatu();
$erabiltzaileDB = new Erabiltzaile($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu erabiltzaile guztiak edo bakarra NAN bidez
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['nan'])) {
        $nan = $_GET['nan'];
        $data = $erabiltzaileDB->getNoPasahitza($nan);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } else {
        $data = $erabiltzaileDB->getAllNoPasahitza();
        echo json_encode($data);
    }
    exit();
}

// POST: sortu erregistro berriak.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    
    if (!isset($body['nan'], $body['izena'], $body['abizena'], $body['erabiltzailea'], $body['pasahitza'], $body['rola'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta dira derrigorrezko datuak']);
        exit();
    }

    $res = $erabiltzaileDB->create(
        $body['nan'],
        $body['izena'],
        $body['abizena'],
        $body['erabiltzailea'],
        $body['pasahitza'],
        $body['rola']
    );

    if ($res) {
        echo json_encode(['message' => 'Erabiltzailea sortuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea sortzean']);
    }
    exit();
}

// DELETE: kendu erabiltzailea
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;
    
    if (!isset($body['nan'])) {
        http_response_code(400);
        echo json_encode(['error' => 'NAN falta da']);
        exit();
    }

    $res = $erabiltzaileDB->delete($body['nan']);

    if ($res) {
        echo json_encode(['message' => 'Erabiltzailea ezabatuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea ezabatzean']);
    }
    exit();
}

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
