<?php
/**
 * Erabiltzaileen taula kudeatzen duen klasea.
 */
class Erabiltzaile {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM erabiltzailea");
        if (!$emaitza) die('ERROREA: Ezin izan dira erabiltzaileak eskuratu.');
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function get($nan) {
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM erabiltzailea WHERE nan = ?");
        $stmt->bind_param("s", $nan);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    public function findByUsername($erabiltzaile) {
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM erabiltzailea WHERE erabiltzailea = ?");
        $stmt->bind_param("s", $erabiltzaile);
        $stmt->execute();
        $res = $stmt->get_result();
        $stmt->close();
        return $res->num_rows ? $res->fetch_assoc() : null;
    }

    public function create($nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola) {
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO erabiltzailea (nan, izena, abizena, erabiltzailea, pasahitza, rola) VALUES (?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param("ssssss", $nan, $izena, $abizena, $erabiltzailea, $pasahitza, $rola);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    public function delete($nan) {
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM erabiltzailea WHERE nan = ?");
        $stmt->bind_param("s", $nan);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    public function authenticateSimple($erabiltzaile, $pasahitza) {
        $row = $this->findByUsername($erabiltzaile);
        if (!$row) return null;
        if (hash_equals((string)$row['pasahitza'], (string)$pasahitza)) {
            unset($row['pasahitza']);
            return $row;
        }
        return null;
    }
}
