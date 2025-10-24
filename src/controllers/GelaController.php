<?php
require '../db.php';
require '../models/Gela.php';

$db = new DB();
$db->konektatu();
$gelaDB = new Gela($db);

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST['_method']) && $_POST['_method']=="DELETE"){
        $gelaDB->delete($_POST['id']);
        header("Location: gelak.php?ezabatuta=true");
        exit();
    } else {
        $gelaDB->create($_POST['izena'], $_POST['taldea']);
        header("Location: gelak.php?sortuta=true");
        exit();
    }
}
