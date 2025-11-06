<?php
/**
 * Inbentarioaren taula kudeatzen duen klasea.
 */
class Inbentario {
    private $db;

    public function __construct($db){ $this->db = $db; }

    // Get arrunta, bueltatzen ditu erregistro guztiak
    public function getAll() {
        $emaitza = $this->db->getKonexioa()->query("SELECT * FROM inbentarioa");
        if(!$emaitza) die("ERROREA: Ezin izan dira inbentarioak eskuratu.");
        $datuak = [];
        while($row = $emaitza->fetch_assoc()) $datuak[] = $row;
        return $datuak;
    }

    // Get etiketa-aren arabera
    public function get($etiketa){
        $stmt = $this->db->getKonexioa()->prepare("SELECT * FROM inbentarioa WHERE etiketa = ?");
        $stmt->bind_param("s",$etiketa);
        $stmt->execute();
        $emaitza = $stmt->get_result();
        $stmt->close();
        return $emaitza->num_rows ? $emaitza->fetch_assoc() : null;
    }

    // Inbentario erregistro berri bat sortzen du
    public function create($etiketa, $idEkipamendu, $erosketaData){
        $stmt = $this->db->getKonexioa()->prepare(
            "INSERT INTO inbentarioa (etiketa, idEkipamendu, erosketaData) VALUES (?, ?, ?)"
        );
        $stmt->bind_param("sis",$etiketa, $idEkipamendu, $erosketaData);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Inbentario erregistro bat ezabatzen du etiketa-aren arabera
    public function delete($etiketa){
        $stmt = $this->db->getKonexioa()->prepare("DELETE FROM inbentarioa WHERE etiketa = ?");
        $stmt->bind_param("s",$etiketa);
        $emaitza = $stmt->execute();
        $stmt->close();
        return $emaitza;
    }

    // Inbentario taulatik atera zein den etiketa handiena eta berri bat +1 gehitzen sortu
    public function getNextEtiketa(){
        $emaitza = $this->db->getKonexioa()->query("SELECT etiketa FROM inbentarioa ORDER BY etiketa DESC LIMIT 1");
        if(!$emaitza) die("ERROREA: Ezin izan da inbentario erregistro handiena eskuratu.");
        $row = $emaitza->fetch_assoc();
        if(!$row) return "E0001";
        $maxEtiketa = $row['etiketa'];
        $num = intval(substr($maxEtiketa, 1)) + 1;
        return 'E' . str_pad($num, 4, '0', STR_PAD_LEFT);
    }

    // Bueltatzen du idEkipamendu-rako etiketatu_gabe kopurua.
    public function getEtiketatuGabeById($idEkipamendu) {
        $conn = $this->db->getKonexioa();
        $id = intval($idEkipamendu);
        $sql = "
            SELECT e.stock AS stockTotala,
            (e.stock - COUNT(i.idEkipamendu)) AS etiketatu_gabe
            FROM ekipamendua e
            LEFT JOIN inbentarioa i ON e.id = i.idEkipamendu
            WHERE e.id = ?
            GROUP BY e.id, e.stock
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $res = $stmt->get_result();
        $row = $res->fetch_assoc();
        $stmt->close();
        if(!$row) return null;
        return intval($row['etiketatu_gabe']);
    }
}
