<?php
require '../db.php';
require '../models/Ekipo.php';

$db = new DB();
$db->konektatu();
$ekipoDB = new Ekipo($db);

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST['_method']) && $_POST['_method']=="DELETE"){
        $ekipoDB->delete($_POST['id']);
        header("Location: ekipamenduak.php?ezabatuta=true");
        exit();
    } else {
        $ekipoDB->create($_POST['izena'],$_POST['deskribapena'],$_POST['marka'],$_POST['modelo'],$_POST['stock'],$_POST['idKategoria']);
        header("Location: ekipamenduak.php?sortuta=true");
        exit();
    }
}
