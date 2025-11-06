<?php
require '../db.php';
require '../models/Inbentario.php';
require '../models/Kokaleku.php';
require_once __DIR__ . '/../require_auth.php';
$CURRENT_USER = require_auth_api();

$db = new DB();
$db->konektatu();
$inbentarioDB = new Inbentario($db);
$kokalekuDB = new Kokaleku($db);

header('Content-Type: application/json; charset=utf-8');

// GET: bueltatu etiketa guztiak edo bakarra ID bidez
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

// POST: sortu etiketado berriak
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (!isset($body['idEkipamendu'], $body['idGela'], $body['kopurua'], $body['erosketaData'], $body['hasieraData'], $body['amaieraData'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Falta dira derrigorrezko datuak']);
        exit();
    }
    $idE = intval($body['idEkipamendu']);
    $kop = intval($body['kopurua']);
    if ($kop <= 0) { 
        http_response_code(400); echo json_encode(['error'=>'kopurua izan behar da >0']); 
        exit(); 
    }

    $conn = $db->getKonexioa();
    try {
        $conn->begin_transaction();

        $available = $inbentarioDB->getEtiketatuGabeById($idE);
        if ($available === null) {
            $conn->rollback();
            http_response_code(404);
            echo json_encode(['error'=>'Ekipamendua ez da aurkitu']);
            exit();
        }
        if ($available < $kop) {
            $conn->rollback();
            http_response_code(400);
            echo json_encode(['error'=>'Kopurua handiegia da','available'=>$available]);
            exit();
        }

        $created = [];
        for ($i=0; $i < $kop; $i++) {
            $etiketa = $inbentarioDB->getNextEtiketa();
            $res = $inbentarioDB->create($etiketa, $idE, $body['erosketaData']);
            if (!$res) throw new Exception('Errorea inbentarioa sortzean');

            $res2 = $kokalekuDB->create($etiketa, $body['idGela'], $body['hasieraData'], $body['amaieraData']);
            if (!$res2) throw new Exception('Errorea kokalekua sortzean');

            $created[] = $etiketa;
        }

        $conn->commit();
        http_response_code(201);
        echo json_encode(['message'=>'Erregistroak sortu dira','etiketak'=>$created]);
    } catch (Exception $e) {
        if ($conn->in_transaction) $conn->rollback();
        http_response_code(500);
        echo json_encode(['error'=>'Barneko errorea','detail'=>$e->getMessage()]);
    }
    exit();
}


// DELETE: kendu etiketa
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true) ?: $_GET;

    if (!isset($body['etiketa'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Etiketa falta da']);
        exit();
    }

    $res = $inbentarioDB->delete($body['etiketa']);

    if ($res) {
        echo json_encode(['message' => 'Etiketa ezabatuta']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Errorea ezabatzean']);
    }
    exit();
}

// Beste metodoak:
http_response_code(405);
echo json_encode(['error' => 'Metodoa ez da onartzen']);
