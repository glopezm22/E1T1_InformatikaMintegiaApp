<?php
/**
 * Kategorien taula kudeatzen duen klasea.
 */
class Kategoria {
    private $db;

    public function __construct($db){ $this->db = $db; }

    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM kategoria");
        if(!$emaitza) die("ERROREA: Ezin izan dira kategoriak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function get($id){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM kategoria WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    public function create($izena){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO kategoria (izena) VALUES (?)"
        );
        $stmt->bind_param("s",$izena);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    public function delete($id){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM kategoria WHERE id = ?");
        $stmt->bind_param("i",$id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
