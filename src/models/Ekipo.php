<?php
/**
 * Ekipamenduaren taula kudeatzen duen klasea.
 */
class Ekipo {
    private $db;

    public function __construct($db) { $this->db = $db; }

    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM ekipamendua");
        if(!$emaitza) die("ERROREA: Ezin izan dira ekipamenduak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function get($id){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM ekipamendua WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    public function create($izena,$deskribapena,$marka,$modelo,$stock,$idKategoria){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO ekipamendua (izena, deskribapena, marka, modelo, stock, idKategoria) VALUES (?,?,?,?,?,?)"
        );
        $stmt->bind_param("sssiii",$izena,$deskribapena,$marka,$modelo,$stock,$idKategoria);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    public function delete($id){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM ekipamendua WHERE id = ?");
        $stmt->bind_param("i",$id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
