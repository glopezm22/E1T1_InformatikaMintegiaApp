<?php
require '../db.php';
require '../models/Kokaleku.php';

$db = new DB();
$db->konektatu();
$kokalekuDB = new Kokaleku($db);

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST['_method']) && $_POST['_method']=="DELETE"){
        $kokalekuDB->delete($_POST['etiketa'],$_POST['hasieraData']);
        header("Location: kokalekuak.php?ezabatuta=true");
        exit();
    } else {
        $kokalekuDB->create($_POST['etiketa'],$_POST['idGela'],$_POST['hasieraData'],$_POST['amaieraData']);
        header("Location: kokalekuak.php?sortutaOk=true");
        exit();
    }
}
