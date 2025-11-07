<?php
/**
 * Kokalekuen taula kudeatzen duen klasea.
 */
class Kokaleku {
    private $db;

    public function __construct($db){ $this->db = $db; }
    // Get all kokalekuak
    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM kokalekua");
        if(!$emaitza) die("ERROREA: Ezin izan dira kokalekuak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }
    // Get etiketa eta hasieraData-ren arabera
    public function get($etiketa,$hasieraData){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM kokalekua WHERE etiketa = ? AND hasieraData = ?");
        $stmt->bind_param("ss",$etiketa,$hasieraData);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    public function getByGela($idGela){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM kokalekua WHERE idGela = ?");
        $stmt->bind_param("i",$idGela);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function getByEtiketa($etiketa){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM kokalekua WHERE etiketa = ?");
        $stmt->bind_param("s",$etiketa);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    public function create($etiketa,$idGela,$hasieraData,$amaieraData){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO kokalekua (etiketa,idGela,hasieraData,amaieraData) VALUES (?,?,?,?)"
        );
        $stmt->bind_param("siss",$etiketa,$idGela,$hasieraData,$amaieraData);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Kokaleku bat eguneratzen du etiketa eta hasieraData erabiliz (konposizio klabea)
    public function update($etiketa, $hasieraData, $idGela, $amaieraData) {
        $stmt = $this->db->getKonexioa()->prepare(
            "UPDATE kokalekua
            SET idGela = ?, amaieraData = ?
            WHERE etiketa = ? AND hasieraData = ?"
        );
        $stmt->bind_param("isss", $idGela, $amaieraData, $etiketa, $hasieraData);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Kokalekuak ezabatzen ditu
    public function delete($etiketa,$hasieraData){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM kokalekua WHERE etiketa = ? AND hasieraData = ?");
        $stmt->bind_param("ss",$etiketa,$hasieraData);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }
}
