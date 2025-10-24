<?php
/**
 * Inbentarioaren taula kudeatzen duen klasea.
 */
class Inbentario {
    private $db;

    public function __construct($db){ $this->db = $db; }

    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM inbentarioa");
        if(!$emaitza) die("ERROREA: Ezin izan dira inbentarioak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function get($etiketa){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM inbentarioa WHERE etiketa = ?");
        $stmt->bind_param("s",$etiketa);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    public function create($etiketa, $idEkipamendu, $erosketaData){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO inbentarioa (etiketa, idEkipamendu, erosketaData) VALUES (?, ?, ?)"
        );
        $stmt->bind_param("sis",$etiketa, $idEkipamendu, $erosketaData);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    public function delete($etiketa){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM inbentarioa WHERE etiketa = ?");
        $stmt->bind_param("s",$etiketa);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
