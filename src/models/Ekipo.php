<?php
/**
 * Ekipamenduaren taula kudeatzen duen klasea.
 */
class Ekipo {
    private $db;

    public function __construct($db) { $this->db = $db; }

    // Get arrunta, bueltatzen ditu erregistro guztiak
    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM ekipamendua");
        if(!$emaitza) die("ERROREA: Ezin izan dira ekipamenduak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    // Get id-aren arabera
    public function get($id){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM ekipamendua WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    // Ekipamendu berria sortzen du
    public function create($izena,$deskribapena,$marka,$modelo,$stock,$idKategoria){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO ekipamendua (izena, deskribapena, marka, modelo, stock, idKategoria) VALUES (?,?,?,?,?,?)"
        );
        $stmt->bind_param("ssssii",$izena,$deskribapena,$marka,$modelo,$stock,$idKategoria);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Ekipamendu bat eguneratzen du ID-aren arabera
    public function update($id, $izena, $deskribapena, $marka, $modelo, $stock, $idKategoria){
        $stmt = $this->db->getKonexioa()->prepare(
            "UPDATE ekipamendua 
            SET izena = ?, deskribapena = ?, marka = ?, modelo = ?, stock = ?, idKategoria = ?
            WHERE id = ?"
        );
        $stmt->bind_param("ssssiii", $izena, $deskribapena, $marka, $modelo, $stock, $idKategoria, $id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Ekipamendu bat ezabatzen du ID-aren arabera
    public function delete($id){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM ekipamendua WHERE id = ?");
        $stmt->bind_param("i",$id);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
