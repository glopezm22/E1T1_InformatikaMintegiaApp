<?php
require '../db.php';
require '../models/Inbentario.php';

$db = new DB();
$db->konektatu();
$inbentarioDB = new Inbentario($db);

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST['_method']) && $_POST['_method']=="DELETE"){
        $inbentarioDB->delete($_POST['etiketa']);
        header("Location: inbentarioak.php?ezabatuta=true");
        exit();
    } else {
        $inbentarioDB->create($_POST['etiketa'],$_POST['idEkipamendu'],$_POST['erosketaData']);
        header("Location: inbentarioak.php?sortutaOk=true");
        exit();
    }
}
