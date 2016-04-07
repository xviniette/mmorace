-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 07 Avril 2016 à 14:42
-- Version du serveur :  10.1.9-MariaDB
-- Version de PHP :  5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `smk`
--

-- --------------------------------------------------------

--
-- Structure de la table `maps`
--

CREATE TABLE `maps` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `nbLaps` int(11) DEFAULT NULL,
  `maxTime` int(11) DEFAULT NULL,
  `maxInterval` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `checkpoints` text,
  `finish` text,
  `start` text,
  `gold` int(11) DEFAULT NULL,
  `silver` int(11) DEFAULT NULL,
  `bronze` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `maps`
--

INSERT INTO `maps` (`id`, `name`, `img`, `nbLaps`, `maxTime`, `maxInterval`, `width`, `height`, `checkpoints`, `finish`, `start`, `gold`, `silver`, `bronze`) VALUES
(1, 'La map 1', 'map1.png', 2, 180000, 20000, 2200, 2500, '[{"x":560,"y":200,"r":150,"nb":1},{"x":1920,"y":380,"r":150,"nb":2},\r\n{"x":900,"y":1000,"r":150,"nb":3},\r\n{"x":1950,"y":1820,"r":150,"nb":4},\r\n{"x":700,"y":1750,"r":150,"nb":5},\r\n{"x":1300,"y":2100,"r":150,"nb":6}]', '{"x":5,"y":1820,"w":322,"h":206}', '{"x":150,"y":1920,"rotation":0}', NULL, NULL, NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
