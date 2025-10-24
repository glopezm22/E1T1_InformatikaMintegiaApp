<?php

function handleRequest(string $action): void {
    switch ($action) {
        case 'login':
            require __DIR__ . '/../public/views/login.php';
            break;
        case 'logout':
            require __DIR__ . '/../public/views/logout.php';
            break;
        case 'usuarios':
            require __DIR__ . '/../public/views/usuarios.php';
            break;
        case 'equipos':
            require __DIR__ . '/../public/views/equipos.php';
            break;
        case 'aulas':
            require __DIR__ . '/../public/views/aulas.php';
            break;
        default:
            require __DIR__ . '/../public/views/login.php';
    }
}


//NO HACER CASO DE MOMENTO
