-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 10 Février 2016 à 23:51
-- Version du serveur :  5.6.16
-- Version de PHP :  5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `smk`
--

-- --------------------------------------------------------

--
-- Structure de la table `cases`
--

CREATE TABLE IF NOT EXISTS `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `maps`
--

CREATE TABLE IF NOT EXISTS `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `bronze` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `maps`
--

INSERT INTO `maps` (`id`, `name`, `img`, `nbLaps`, `maxTime`, `maxInterval`, `width`, `height`, `checkpoints`, `finish`, `start`, `gold`, `silver`, `bronze`) VALUES
(1, 'Test', 'map1.png', 1, 10000, 20000, 1000, 1000, '[{"x":140,"y":150,"r":100,"nb":1}]', '{"x":60,"y":300,"w":160,"h":60}', '{"x":100,"y":100,"rotation":0}', NULL, NULL, NULL),
(2, 'Test2', 'map1.png', 1, 10000, 20000, 1000, 1000, '[{"x":140,"y":150,"r":100,"nb":1}]', '{"x":600,"y":300,"w":160,"h":60}', '{"x":100,"y":100,"rotation":0}', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `races`
--

CREATE TABLE IF NOT EXISTS `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_m` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=102 ;

--
-- Contenu de la table `races`
--

INSERT INTO `races` (`id`, `id_m`, `date`) VALUES
(1, 1, 1451512374),
(2, 1, 1451583757),
(3, 1, 1451603673),
(4, 2, 1451604496),
(5, 1, 1451620228),
(6, 1, 1451620258),
(7, 1, 1451620279),
(8, 1, 1451620299),
(9, 1, 1451620314),
(10, 1, 1451620345),
(11, 1, 1451620367),
(12, 2, 1451620390),
(13, 1, 1451620501),
(14, 1, 1451620520),
(15, 1, 1451620535),
(16, 2, 1451620555),
(17, 2, 1451620572),
(18, 2, 1451620590),
(19, 1, 1451620627),
(20, 1, 1451620643),
(21, 1, 1451620659),
(22, 2, 1451620675),
(23, 1, 1451620691),
(24, 1, 1451620714),
(25, 1, 1452078634),
(26, 1, 1452078692),
(27, 1, 1452078919),
(28, 1, 1453135114),
(29, 2, 1453582990),
(30, 2, 1453583017),
(31, 1, 1453583155),
(32, 2, 1453583171),
(33, 1, 1453583236),
(34, 2, 1453583262),
(35, 1, 1453593303),
(36, 1, 1453593408),
(37, 2, 1453594611),
(38, 1, 1453594900),
(39, 1, 1453594946),
(40, 1, 1453595010),
(41, 1, 1453595054),
(42, 2, 1453595082),
(43, 1, 1453595156),
(44, 1, 1453595205),
(45, 2, 1453595224),
(46, 2, 1453595242),
(47, 1, 1453595258),
(48, 2, 1453595275),
(49, 2, 1453595301),
(50, 2, 1453596775),
(51, 1, 1453600702),
(52, 2, 1453600718),
(53, 2, 1453601124),
(54, 1, 1453601139),
(55, 2, 1453601229),
(56, 2, 1453601311),
(57, 2, 1453601372),
(58, 2, 1453601654),
(59, 2, 1453601719),
(60, 2, 1453601770),
(61, 1, 1453601792),
(62, 1, 1453601823),
(63, 1, 1453601909),
(64, 2, 1453601933),
(65, 2, 1453602012),
(66, 1, 1453602053),
(67, 1, 1453602171),
(68, 2, 1453602220),
(69, 1, 1453602278),
(70, 1, 1453602297),
(71, 1, 1453602359),
(72, 1, 1453602377),
(73, 1, 1453602403),
(74, 2, 1453658777),
(75, 1, 1453658789),
(76, 1, 1453658802),
(77, 1, 1453658822),
(78, 2, 1453658837),
(79, 2, 1453658860),
(80, 2, 1453658873),
(81, 1, 1453658885),
(82, 2, 1453658901),
(83, 1, 1453658913),
(84, 2, 1453658933),
(85, 1, 1453658952),
(86, 2, 1453658967),
(87, 2, 1453658982),
(88, 1, 1453658999),
(89, 2, 1453659013),
(90, 1, 1453659026),
(91, 2, 1453659039),
(92, 2, 1453659053),
(93, 1, 1453659079),
(94, 2, 1453659145),
(95, 1, 1453659187),
(96, 1, 1453856034),
(97, 2, 1453856107),
(98, 1, 1453856371),
(99, 2, 1453856403),
(100, 2, 1453856436),
(101, 2, 1453856605);

-- --------------------------------------------------------

--
-- Structure de la table `skins`
--

CREATE TABLE IF NOT EXISTS `skins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `chest` int(11) DEFAULT NULL,
  `rarity` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `centerx` int(11) DEFAULT NULL,
  `centery` int(11) DEFAULT NULL,
  `rWidth` int(11) DEFAULT NULL,
  `rHeight` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `skins`
--

INSERT INTO `skins` (`id`, `name`, `chest`, `rarity`, `img`, `x`, `y`, `width`, `height`, `centerx`, `centery`, `rWidth`, `rHeight`) VALUES
(1, 'Ferrari Rouge', -1, 1, 'ferrari.png', 0, 0, 291, 137, 145, 68, 60, 30),
(2, 'Ferrari Verte', 0, 0, 'ferrariverte.png', 0, 0, 600, 297, 300, 150, 60, 30),
(3, 'Coccinelle', 1, 3, 'coccinelle.png', 0, 0, 580, 282, 290, 141, 80, 40);

-- --------------------------------------------------------

--
-- Structure de la table `times`
--

CREATE TABLE IF NOT EXISTS `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_u` int(11) DEFAULT NULL,
  `id_r` int(11) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `oldElo` int(11) DEFAULT NULL,
  `deltaElo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=96 ;

--
-- Contenu de la table `times`
--

INSERT INTO `times` (`id`, `id_u`, `id_r`, `timestamp`, `oldElo`, `deltaElo`) VALUES
(1, 1, 1, 2310, 1000, 0),
(2, 1, 2, 2310, 1000, 0),
(3, 1, 3, 5577, 1000, 0),
(4, 1, 4, 3993, 1000, 0),
(5, 1, 5, 3300, 1000, 0),
(6, 1, 6, 2343, 1000, 0),
(7, 1, 7, 2343, 1000, 0),
(8, 1, 8, 2310, 1000, 0),
(9, 1, 9, 2376, 1000, 0),
(10, 1, 10, 2310, 1000, 0),
(11, 1, 11, 2310, 1000, 0),
(12, 1, 12, 8316, 1000, 0),
(13, 1, 13, 2310, 1000, 0),
(14, 1, 14, 2343, 1000, 0),
(15, 1, 15, 2310, 1000, 0),
(16, 1, 16, 3960, 1000, 0),
(17, 1, 17, 4059, 1000, 0),
(18, 1, 18, 4389, 1000, 0),
(19, 1, 19, 7656, 1000, 0),
(20, 1, 20, 2376, 1000, 0),
(21, 1, 21, 2409, 1000, 0),
(22, 1, 22, 3333, 1000, 0),
(23, 1, 23, 2310, 1000, 0),
(24, 1, 24, 4521, 1000, 0),
(25, 1, 25, 5841, 1000, 0),
(26, 1, 26, -1, 1000, 0),
(27, 1, 27, -1, 1000, 0),
(28, 1, 28, 5676, 1000, 0),
(29, 1, 29, 8514, 1000, 0),
(30, 1, 30, -1, 1000, 0),
(31, 1, 31, 2343, 1000, 0),
(32, 1, 32, 3993, 1000, 0),
(33, 1, 33, -1, 1000, 0),
(34, 1, 34, -1, 1000, 0),
(35, 1, 35, -1, 1000, 0),
(36, 1, 36, -1, 1000, 0),
(37, 1, 37, -1, 1000, 0),
(38, 1, 38, 2343, 1000, 0),
(39, 1, 39, 2409, 1000, 0),
(40, 1, 40, 2310, 1000, 0),
(41, 1, 41, 2343, 1000, 0),
(42, 1, 42, 3960, 1000, 0),
(43, 1, 43, 2343, 1000, 0),
(44, 1, 44, 2376, 1000, 0),
(45, 1, 45, 3498, 1000, 0),
(46, 1, 46, 4092, 1000, 0),
(47, 1, 47, 2343, 1000, 0),
(48, 1, 48, 4092, 1000, 0),
(49, 1, 49, -1, 1000, 0),
(50, 1, 50, 9471, 1000, 0),
(51, 1, 51, -1, 1000, 0),
(52, 1, 52, 5016, 1000, 0),
(53, 1, 53, 7854, 1000, 0),
(54, 1, 54, 2376, 1000, 0),
(55, 1, 59, 4191, 1000, 0),
(56, 1, 60, 7227, 1000, 0),
(57, 1, 61, 5214, 1000, 0),
(58, 1, 62, -1, 1000, 0),
(59, 1, 63, 2310, 1000, 0),
(60, 1, 66, 2343, 1000, 0),
(61, 1, 67, 2508, 1000, 0),
(62, 1, 68, 3663, 1000, 0),
(63, 1, 69, 2310, 1000, 0),
(64, 1, 70, 2343, 1000, 0),
(65, 1, 71, 2310, 1000, 0),
(66, 1, 72, 2310, 1000, 0),
(67, 1, 73, 5874, 1000, 0),
(68, 1, 74, 5412, 1000, 0),
(69, 1, 75, 2310, 1000, 0),
(70, 1, 76, 2376, 1000, 0),
(71, 1, 77, -1, 1000, 0),
(72, 1, 78, 6699, 1000, 0),
(73, 1, 79, 5742, 1000, 0),
(74, 1, 80, 3564, 1000, 0),
(75, 1, 81, 2310, 1000, 0),
(76, 1, 82, 5775, 1000, 0),
(77, 1, 83, 2310, 1000, 0),
(78, 1, 84, 7128, 1000, 0),
(79, 1, 85, -1, 1000, 0),
(80, 1, 86, 5016, 1000, 0),
(81, 1, 87, 4521, 1000, 0),
(82, 1, 88, 5775, 1000, 0),
(83, 1, 89, 4554, 1000, 0),
(84, 1, 90, 2376, 1000, 0),
(85, 1, 91, 3564, 1000, 0),
(86, 1, 92, 4686, 1000, 0),
(87, 1, 93, 8679, 1000, 0),
(88, 1, 94, 7557, 1000, 0),
(89, 1, 95, -1, 1000, 0),
(90, 1, 96, -1, 1000, 0),
(91, 1, 97, 3960, 1000, 0),
(92, 1, 98, -1, 1000, 0),
(93, 1, 99, 4917, 1000, 0),
(94, 1, 100, 3927, 1000, 0),
(95, 1, 101, 4026, 1000, 0);

-- --------------------------------------------------------

--
-- Structure de la table `usercase`
--

CREATE TABLE IF NOT EXISTS `usercase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_u` int(11) DEFAULT NULL,
  `id_c` int(11) DEFAULT NULL,
  `soldPrice` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `elo` int(11) DEFAULT NULL,
  `xp` int(11) DEFAULT NULL,
  `played` int(11) DEFAULT NULL,
  `registration_time` int(11) DEFAULT NULL,
  `connection_time` int(11) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL,
  `nbskintodrop` int(11) DEFAULT NULL,
  `skindropin` int(11) DEFAULT NULL,
  `nbcasetodrop` int(11) DEFAULT NULL,
  `casedropin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `email`, `elo`, `xp`, `played`, `registration_time`, `connection_time`, `online`, `nbskintodrop`, `skindropin`, `nbcasetodrop`, `casedropin`) VALUES
(1, 'ElBazia', '9adfb0a6d03beb7141d8ec2708d6d9fef9259d12cd230d50f70fb221ae6cabd5', NULL, 1000, 0, 91, 1451512317, 1455135960, 0, 2, 7, 0, 11);

-- --------------------------------------------------------

--
-- Structure de la table `userskin`
--

CREATE TABLE IF NOT EXISTS `userskin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_u` int(11) DEFAULT NULL,
  `id_s` int(11) DEFAULT NULL,
  `soldPrice` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `userskin`
--

INSERT INTO `userskin` (`id`, `id_u`, `id_s`, `soldPrice`) VALUES
(1, 1, 3, 0),
(2, 1, 2, 0),
(3, 1, 2, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
