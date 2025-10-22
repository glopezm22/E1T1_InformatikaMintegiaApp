<?php
// Cargar variables de entorno
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
if (strpos(trim($line), '#') === 0) continue;
[$key, $value] = explode('=', $line, 2);
$_ENV[$key] = trim($value);
}
}


// Config global
const APP_ENV = 'local';
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'informintegia');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');