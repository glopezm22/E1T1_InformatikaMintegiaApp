<?php
/**
 * Erabiltzaileen taula kudeatzen duen klasea.
 */
class Erabiltzaile {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    // Get arrunta, bueltatzen ditu erregistro guztiak
    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM erabiltzailea");
        if (!$emaitza) die('ERROREA: Ezin izan dira erabiltzaileak eskuratu.');
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    // Get pasahitzik gabe, bueltatzen ditu erregistro guztiak
    public function getAllNoPasahitza() {
        $sql = "SELECT nan, izena, abizena, erabiltzailea, rola FROM erabiltzailea";
        $emaitza = $this->db->getKonexioa()->query($sql);
        if (!$emaitza) die('ERROREA: Ezin izan dira erabiltzaileak eskuratu.');
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    // Get nan-aren arabera
    public function get($nan) {
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM erabiltzailea WHERE nan = ?");
        $stmt->bind_param("s", $nan);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    // Get nan-aren arabera, pasahitzik gabe
    public function getNoPasahitza($nan) {
        $stmt = $this->db->getKonexioa()->prepare(
            "SELECT nan, izena, abizena, erabiltzailea, rola FROM erabiltzailea WHERE nan = ? LIMIT 1"
        );
        $stmt->bind_param("s", $nan);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    // Get erabiltzailea-aren arabera
    public function findByUsername($erabiltzaile) {
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM erabiltzailea WHERE erabiltzailea = ?");
        $stmt->bind_param("s", $erabiltzaile);
        $stmt->execute();
        $res = $stmt->get_result();
        $stmt->close();
        return $res->num_rows ? $res->fetch_assoc() : null;
    }

    // Erabiltzaile berria sortzen du
    public function create($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola) {
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO erabiltzailea (nan, izena, abizena, erabiltzailea, pasahitza, rola) VALUES (?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param("ssssss", $nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Erabiltzaile bat eguneratzen du NAN-aren arabera
    public function update($nan, $izena, $abizena, $erabiltzailea, $rola) {
        $stmt = $this->db->getKonexioa()->prepare(
            "UPDATE erabiltzailea
            SET izena = ?, abizena = ?, erabiltzailea = ?, rola = ?
            WHERE nan = ?"
        );
        $stmt->bind_param("sssss", $izena, $abizena, $erabiltzailea, $rola, $nan);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Erabiltzaile baten pasahitza eguneratzen du NAN-aren arabera. Bi aldiz sartu behar da pasahitza, konfirmatzeko segurtasuna dela eta.
    public function updatePasahitza($nan, $pasahitza, $pasahitzaKonfirm) {
        if ($pasahitza !== $pasahitzaKonfirm) {
            // Pasahitzak ez datoz bat
            return false;
        }
        $stmt = $this->db->getKonexioa()->prepare(
            "UPDATE erabiltzailea
            SET pasahitza = ?
            WHERE nan = ?"
        );
        $stmt->bind_param("ss", $pasahitza, $nan);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Erabiltzaile bat ezabatzen du NAN-aren arabera
    public function delete($nan) {
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM erabiltzailea WHERE nan = ?");
        $stmt->bind_param("s", $nan);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Autentifikazio sinplea: erabiltzailea eta pasahitza egiaztatu
    public function authenticateSimple($erabiltzaile, $pasahitza) {
        $row = $this->findByUsername($erabiltzaile);
        if (!$row) return null;
        if (hash_equals((string)$row['pasahitza'], (string)$pasahitza)) {
            unset($row['pasahitza']);
            return $row;
        }
        return null;
    }

    // Sortu edo eguneratu "remember me" tokena
    public function createRememberToken($nan, $token, $expira) {
        $conn = $this->db->getKonexioa();
        $stmt = $conn->prepare(
            "INSERT INTO remember_tokens (nan, token, expira) VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE token = VALUES(token), expira = VALUES(expira)"
        );
        $stmt->bind_param("sss", $nan, $token, $expira);
        $res = $stmt->execute();
        $stmt->close();
        return $res;
    }

    // Tokena balidatu eta erabiltzaile oinarrizkoa itzuli baliozkoa eta iraungi ez bada.
    public function validateRememberToken($token) {
        $conn = $this->db->getKonexioa();
        $stmt = $conn->prepare(
            "SELECT r.nan, e.izena, e.abizena, e.erabiltzailea, e.rola
             FROM remember_tokens r
             JOIN erabiltzailea e ON r.nan = e.nan
             WHERE r.token = ? AND r.expira > NOW()
             LIMIT 1"
        );
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $res = $stmt->get_result();
        $stmt->close();
        return $res->num_rows ? $res->fetch_assoc() : null;
    }

    // Tokena ezabatu, logout egitean
    public function deleteRememberToken($token) {
        $conn = $this->db->getKonexioa();
        $stmt = $conn->prepare("DELETE FROM remember_tokens WHERE token = ?");
        $stmt->bind_param("s", $token);
        $res = $stmt->execute();
        $stmt->close();
        return $res;
    }
}
