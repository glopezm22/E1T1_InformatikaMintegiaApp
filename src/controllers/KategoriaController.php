<?php
require '../db.php';
require '../models/Kategoria.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$kategoriaDB = new Kategoria($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu kategoria guztiak edo bakarra ID bidez
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $data = $kategoriaDB->get($id);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ez da aurkitu']);
        }
    } else {
        $data = $kategoriaDB->getAll();
        echo json_encode($data);
    }
    exit();
}

// POST: sortu kategoria berria
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    if (!isset($body['izena'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta dira derrigorrezko datuak']);
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

// DELETE: kendu kategoria
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID falta da']);
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

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
