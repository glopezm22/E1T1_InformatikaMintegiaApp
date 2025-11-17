-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2023 a las 11:09:32
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datu-basea: `informintegia`
--

-- --------------------------------------------------------

--
-- Taularen egitura: `ekipamendua`
--

CREATE TABLE `ekipamendua` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(50) NOT NULL,
  `deskribapena` varchar(200) NOT NULL,
  `marka` varchar(20) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `stock` int NOT NULL,
  `idKategoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kategoria` (`idKategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `erabiltzailea`
--

CREATE TABLE `erabiltzailea` (
  `nan` varchar(9) NOT NULL,
  `izena` varchar(20) NOT NULL,
  `abizena` varchar(50) NOT NULL,
  `erabiltzailea` varchar(20) NOT NULL,
  `pasahitza` varchar(20) NOT NULL,
  `rola` char(1) NOT NULL,
  PRIMARY KEY (`nan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `gela`
--

CREATE TABLE `gela` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(4) NOT NULL,
  `taldea` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `inbentarioa`
--

CREATE TABLE `inbentarioa` (
  `etiketa` varchar(10) NOT NULL,
  `idEkipamendu` int NOT NULL,
  `erosketaData` date NOT NULL,
  PRIMARY KEY (`etiketa`),
  KEY `fk_ekipamendua` (`idEkipamendu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `kokalekua`
--

CREATE TABLE `kokalekua` (
  `etiketa` varchar(10) NOT NULL,
  `idGela` int NOT NULL,
  `hasieraData` date NOT NULL,
  `amaieraData` date DEFAULT NULL,
  PRIMARY KEY (`etiketa`,`hasieraData`),
  KEY `fk_gela` (`idGela`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Taularen egitura: `remember_tokens`
--

CREATE TABLE `remember_tokens` (
    `nan` VARCHAR(9) NOT NULL,
    `token` CHAR(64) NOT NULL,
    `expira` DATETIME NOT NULL,
    PRIMARY KEY(nan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumpatutako taulen indizeak
--

--
-- `ekipamendua` taularen indizeak
--
ALTER TABLE `ekipamendua`
  ADD CONSTRAINT `fk_kategoria`
  FOREIGN KEY (`idKategoria`)
  REFERENCES `kategoria` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

--
-- `erabiltzailea`
--
-- Jadanik jarrita

--
-- `gela`
--
-- Jadanik jarrita

--
-- `inbentarioa`
--
ALTER TABLE `inbentarioa`
  ADD CONSTRAINT `fk_ekipamendua`
  FOREIGN KEY (`idEkipamendu`)
  REFERENCES `ekipamendua` (`id`)
  ON DELETE CASCADE;

--
-- `kategoria`
--
-- Jadanik jarrita

--
-- `kokalekua`
--
ALTER TABLE `kokalekua`
  ADD CONSTRAINT `fk_gela` FOREIGN KEY (`idGela`) REFERENCES `gela` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_inbentarioa` FOREIGN KEY (`etiketa`) REFERENCES `inbentarioa` (`etiketa`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;