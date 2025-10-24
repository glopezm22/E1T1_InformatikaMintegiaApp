<?php
require '../db.php';
require '../models/Kategoria.php';

$db = new DB();
$db->konektatu();
$kategoriaDB = new Kategoria($db);

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST['_method']) && $_POST['_method']=="DELETE"){
        $kategoriaDB->delete($_POST['id']);
        header("Location: kategoriak.php?ezabatuta=true");
        exit();
    } else {
        $kategoriaDB->create($_POST['izena']);
        header("Location: kategoriak.php?sortutaOk=true");
        exit();
    }
}
