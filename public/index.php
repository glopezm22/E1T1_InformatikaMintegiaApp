<?php
session_start();
require_once __DIR__ . '/../src/config.php';
require_once __DIR__ . '/../src/routes.php';

// Siempre carga el login de forma explícita
$action = $_GET['action'] ?? 'login';
handleRequest($action);
