<?php
require '../db.php';
require '../models/Erabiltzaile.php';
require_once __DIR__ . '/../AuthMiddleware.php';
$user = requireAuth();

$db = new DB();
$db->konektatu();
$erabiltzaileDB = new Erabiltzaile($db);

$nanErr = "";
$nan = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['_method']) && $_POST['_method'] == "DELETE") {
        if($erabiltzaileDB->delete($_POST['nan'])){
            header("Location: erabiltzaileak.php?ezabatuta=true");
            exit();
        } else {
            header("Location: erabiltzaileak.php?error=1");
            exit();
        }
    } else {
        if(empty($_POST["nan"])) {
            $nanErr = "NAN derrigorrezkoa da.";
        } else {
            $nan = htmlspecialchars($_POST["nan"]);
        }

        if(empty($nanErr)) {
            if($erabiltzaileDB->create(
                $_POST['nan'],
                $_POST['izena'],
                $_POST['abizena'],
                $_POST['erabiltzailea'],
                $_POST['pasahitza'],
                $_POST['rola']
            )){
                header("Location: erabiltzaileak.php?sortuta=true&nan=".$nan);
                exit();
            } else {
                header("Location: erabiltzaileak.php?error=1");
                exit();
            }
        } else {
            header("Location: erabiltzaileak.php?nanErr=$nanErr");
            exit();
        }
    }
} else {
    header("Location: erabiltzaileak.php");
    exit();
}
