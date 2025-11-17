START TRANSACTION;
SET time_zone = "+00:00";

-- Kategoriak txertatu (id auto-increment: 1.. 7)
INSERT INTO kategoria (izena) VALUES
('Ordenagailua'),
('Portatila'),
('Teklatua'),
('Arratoia'),
('Switch'),
('Router'),
('Beste batzuk');

-- Gelak txertatu (id auto-increment 1.. 9)
INSERT INTO gela (izena,taldea) VALUES
('A203', '2MSS1A'),
('A205', '2MSS1B'),
('A103', '2MSS2A'),
('A204', '2MSS2B'),
('A003', '3PAG1'),
('A208', '3PAG2'),
('A206', '3WAG1'),
('A207', '3WAG2'),
('A201', '4IAB1');

-- Ekipamendua txertatu (id auto-increment, 1ean hasita)
INSERT INTO ekipamendua (izena,deskribapena,marka,modelo,stock,idKategoria) VALUES
('PC_Torre_Asus_1', 'Torre Asus básica. CPU i3, 8GB RAM, 256GB SSD.', 'Asus', 'Basic-i3', 10, 1),
('PC_Torre_Asus_2', 'Torre Asus básica. CPU i5, 16GB RAM, 512GB SSD.', 'Asus', 'Basic-i5', 5, 1),
('PC_Torre_Asus_3', 'Torre Asus básica. CPU i7, 16GB RAM, 1TB HDD.', 'Asus', 'Basic-i7', 3, 1),
('Portatil_MSI_1', 'Portátil MSI para docencia. Ryzen 5, 8GB, 512GB.', 'MSI', 'Edu-5', 6, 2),
('Portatil_MSI_2', 'Portátil MSI. Ryzen 7, 16GB, 1TB.', 'MSI', 'Edu-7', 2, 2),
('Teklatu_Subblim_1', 'Teclado Subblim básico, USB.', 'Subblim', 'KB-basic', 25, 3),
('Teklatu_Subblim_2', 'Teclado Subblim compacto, USB.', 'Subblim', 'KB-compact', 15, 3),
('Arratoi_Subblim_1', 'Ratón Subblim óptico, USB.', 'Subblim', 'MS-optic', 30, 4),
('Switch_Cisco_1', 'Switch Cisco 24 puertos gestionable.', 'Cisco', 'SG24', 4, 5),
('Switch_Cisco_2', 'Switch Cisco 8 puertos no gestionable.', 'Cisco', 'NG8', 6, 5),
('Router_Linksys_1','Router Linksys para red aula.', 'Linksys', 'LR100', 3, 6),
('Monitor_BrandX_1','Monitor 24" (categoria: Beste batzuk).', 'BrandX', 'M24', 12, 7);

-- Inbentarioa txertatu (etiketa bakarrak), ausazko erosketa-data berriekin
INSERT INTO inbentarioa (etiketa,idEkipamendu,erosketaData) VALUES
('E0001', 1, '2024-11-15'),
('E0002', 1, '2025-03-02'),
('E0003', 2, '2025-01-20'),
('E0004', 3, '2024-08-05'),
('E0005', 4, '2025-02-10'),
('E0006', 4, '2025-06-18'),
('E0007', 5, '2025-09-01'),
('E0008', 6, '2025-04-22'),
('E0009', 7, '2025-05-30'),
('E0010', 8, '2025-07-12'),
('E0011', 9, '2024-12-03'),
('E0012',10, '2025-03-28'),
('E0013',11, '2025-02-14'),
('E0014',12, '2025-08-21');

-- Kokalekua txertatu (FK inbentarioa.etiketa eta gela.id)
-- hasieraData = 2025-10-20, amaieraData = 2026-06-05, jarraibideen arabera
INSERT INTO kokalekua (etiketa,idGela,hasieraData,amaieraData) VALUES
('E0001', 1, '2025-10-20', '2026-06-05'),
('E0002', 1, '2025-10-20', '2026-06-05'),
('E0003', 2, '2025-10-20', '2026-06-05'),
('E0004', 3, '2025-10-20', '2026-06-05'),
('E0005', 4, '2025-10-20', '2026-06-05'),
('E0006', 4, '2025-10-20', '2026-06-05'),
('E0007', 5, '2025-10-20', '2026-06-05'),
('E0008', 6, '2025-10-20', '2026-06-05'),
('E0009', 7, '2025-10-20', '2026-06-05'),
('E0010', 8, '2025-10-20', '2026-06-05'),
('E0011', 9, '2025-10-20', '2026-06-05'),
('E0012', 2, '2025-10-20', '2026-06-05'),
('E0013', 3, '2025-10-20', '2026-06-05'),
('E0014', 1, '2025-10-20', '2026-06-05');

-- Erabiltzaileak txertatu (erabiltzailea)
-- Araua: erabiltzailea = izenaren lehen letra + abizen osoa; pasahitza = balio bera.
-- Rolak: 'A' = admin, 'U' = user.
INSERT INTO erabiltzailea (nan,izena,abizena,erabiltzailea,pasahitza,rola) VALUES
('12345678A','Gorka','Lopez','glopez','glopez','A'),
('23456789B','Asier','Laiz','alaiz','alaiz','A'),
('34567890C','Ainara','Diaz','adiaz','adiaz','A'),
('45678901D','Asier','Peña','apena','apena','A'),
('56789012E','Jon','Igual','jigual','jigual','A'),
('67890123F','Egoitz','Gallaga','egallaga','egallaga','U'),
('78901234G','Jon','Quintano','jquintano','jquintano','U'),
('89012345H','Jon','Ibarra','jibarra','jibarra','U');

COMMIT;