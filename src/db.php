<?php
require_once __DIR__ . '/config.php';


function getConnection(): PDO {
static $conn;
if ($conn === null) {
$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
try {
$conn = new PDO($dsn, DB_USER, DB_PASS, [
PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);
} catch (PDOException $e) {
exit('Errorea datu-basearekin konektatzean: ' . $e->getMessage());
}
}
return $conn;
}