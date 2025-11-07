<?php
/**
 * Gelen taula kudeatzen duen klasea.
 */
class Gela {
    private $db;

    public function __construct($db) { $this->db = $db; }

    // Get all gelak
    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM gela");
        if(!$emaitza) die("ERROREA: Ezin izan dira gelak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    // Get id-aren arabera
    public function get($id){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM gela WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    // Gela berria sortzen du 
    public function create($izena, $taldea){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO gela (izena, taldea) VALUES (?, ?)"
        );
        $stmt->bind_param("ss",$izena,$taldea);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Gela eguneratzen du ID-aren arabera
    public function update($id, $izena, $taldea) {
        $stmt = $this->db->getKonexioa()->prepare(
            "UPDATE gela
            SET izena = ?, taldea = ?
            WHERE id = ?"
        );
        $stmt->bind_param("ssi", $izena, $taldea, $id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Gelak ezabatzen ditu
    public function delete($id){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM gela WHERE id = ?");
        $stmt->bind_param("i",$id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
