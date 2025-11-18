<?php

header("Access-Control-Allow-Origin: https://app.talde1.edu");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

class DB {
    private $konexioa;
    private $user;
    private $host;
    private $pass;
    private $db;
    
    /**
     * Eraikitzailea.
     */
    public function __construct()
    {
        $cfgFile = __DIR__ . '/secrets/db_credentials.php';
        if (is_file($cfgFile)) {
            $cfg = require $cfgFile;
            $this->host = $cfg['host'];
            $this->user = $cfg['user'];
            $this->pass = $cfg['pass'];
            $this->db   = $cfg['db'];
        } else {
            die('Datu-basea konfiguratzeko fitxategia ez da aurkitu.');
        }
    }

    /**
     * Konexioa ireki eta gorde atributu moduan.
     */
    public function konektatu() {
        $this->konexioa = new mysqli($this->host,$this->user,$this->pass,$this->db);
        if ($this->konexioa->connect_errno) {
            printf("Konexio errorea: %s\n", $this->konexioa->connect_error);
            die();
        }
        else {
            return $this->konexioa;
        }       
    }

    /**
     * Bueltatu konexio atributua.
     */
    public function getKonexioa() {
        return $this->konexioa;
    }

    /**
     * Destruktorea.
     */
    public function __destruct() {
        if ($this->konexioa) {
            $this->konexioa->close();
        }
    }
}