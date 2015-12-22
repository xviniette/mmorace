-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 23 Décembre 2015 à 00:20
-- Version du serveur :  10.1.9-MariaDB
-- Version de PHP :  5.5.30

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
  `start` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `maps`
--

INSERT INTO `maps` (`id`, `name`, `img`, `nbLaps`, `maxTime`, `maxInterval`, `width`, `height`, `checkpoints`, `finish`, `start`) VALUES
(1, 'Test', 'map1.png', 1, 10000, 20000, 1000, 1000, '[{"x":140,"y":150,"r":100,"nb":1}]', '{"x":60,"y":300,"w":160,"h":60}', '{"x":100,"y":100,"rotation":0}'),
(2, 'Test2', 'map1.png', 1, 10000, 20000, 1000, 1000, '[{"x":140,"y":150,"r":100,"nb":1}]', '{"x":600,"y":300,"w":160,"h":60}', '{"x":100,"y":100,"rotation":0}');

-- --------------------------------------------------------

--
-- Structure de la table `races`
--

CREATE TABLE `races` (
  `id` int(11) NOT NULL,
  `id_m` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `races`
--

INSERT INTO `races` (`id`, `id_m`, `date`) VALUES
(1, 1, 1450574822),
(2, 1, 1450574847),
(3, 1, 1450574874),
(4, 1, 1450574893),
(5, 1, 1450574966),
(6, 1, 1450574985),
(7, 1, 1450613025),
(8, 1, 1450643264),
(9, 1, 1450653522),
(10, 1, 1450653665),
(11, 1, 1450653742),
(12, 1, 1450653795),
(13, 1, 1450654048),
(14, 1, 1450654120),
(15, 1, 1450654170),
(16, 1, 1450654217),
(17, 1, 1450654363),
(18, 1, 1450654462),
(19, 1, 1450654546),
(20, 1, 1450654774),
(21, 1, 1450659577),
(22, 1, 1450659877),
(23, 1, 1450660010),
(24, 1, 1450660057),
(25, 1, 1450660099),
(26, 1, 1450660264),
(27, 1, 1450660348),
(28, 1, 1450660386),
(29, 1, 1450660443),
(30, 1, 1450660525),
(31, 1, 1450660581),
(32, 1, 1450660619),
(33, 1, 1450660650),
(34, 1, 1450660681),
(35, 1, 1450660713),
(36, 1, 1450660738),
(37, 1, 1450660889),
(38, 1, 1450706517),
(39, 1, 1450706716),
(40, 1, 1450706771),
(41, 1, 1450706825),
(42, 1, 1450706922),
(43, 1, 1450707046),
(44, 1, 1450707521),
(45, 1, 1450708083),
(46, 1, 1450708534),
(47, 1, 1450708595),
(48, 1, 1450708677),
(49, 1, 1450709703),
(50, 1, 1450709733),
(51, 1, 1450709970),
(52, 1, 1450710033),
(53, 1, 1450711716),
(54, 1, 1450711751),
(55, 1, 1450711816),
(56, 1, 1450711940),
(57, 1, 1450711976),
(58, 1, 1450711997),
(59, 1, 1450712035),
(60, 1, 1450716452),
(61, 1, 1450716513),
(62, 1, 1450716596),
(63, 1, 1450716630),
(64, 1, 1450716656),
(65, 1, 1450716679),
(66, 1, 1450716704),
(67, 1, 1450716725),
(68, 1, 1450716878),
(69, 1, 1450716912),
(70, 1, 1450717039),
(71, 1, 1450717138),
(72, 1, 1450717219),
(73, 1, 1450717235),
(74, 1, 1450717317),
(75, 1, 1450718243),
(76, 1, 1450718286),
(77, 1, 1450718374),
(78, 1, 1450718427),
(79, 1, 1450718555),
(80, 1, 1450720619),
(81, 1, 1450720653),
(82, 1, 1450720688),
(83, 1, 1450720718),
(84, 1, 1450721886),
(85, 1, 1450740885),
(86, 1, 1450741728),
(87, 1, 1450741844),
(88, 1, 1450741948),
(89, 1, 1450743413),
(90, 1, 1450744417),
(91, 1, 1450744456),
(92, 1, 1450744479),
(93, 1, 1450744511),
(94, 1, 1450744766),
(95, 1, 1450744832),
(96, 1, 1450744895),
(97, 1, 1450744950),
(98, 1, 1450745001),
(99, 1, 1450745036),
(100, 1, 1450745231),
(101, 1, 1450745326),
(102, 1, 1450745353),
(103, 1, 1450745393),
(104, 1, 1450745422),
(105, 1, 1450746857),
(106, 1, 1450746919),
(107, 1, 1450746957),
(108, 1, 1450747048),
(109, 1, 1450747110),
(110, 1, 1450747141),
(111, 1, 1450747221),
(112, 1, 1450747315),
(113, 1, 1450751197),
(114, 1, 1450752757),
(115, 1, 1450785672),
(116, 1, 1450821773),
(117, 2, 1450824126),
(118, 1, 1450824148),
(119, 1, 1450824168),
(120, 2, 1450824191),
(121, 2, 1450824479),
(122, 2, 1450826090),
(123, 2, 1450826182);

-- --------------------------------------------------------

--
-- Structure de la table `times`
--

CREATE TABLE `times` (
  `id` int(11) NOT NULL,
  `id_u` int(11) DEFAULT NULL,
  `id_r` int(11) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `oldElo` int(11) DEFAULT NULL,
  `deltaElo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `times`
--

INSERT INTO `times` (`id`, `id_u`, `id_r`, `timestamp`, `oldElo`, `deltaElo`) VALUES
(1, 24, 1, -1, NULL, NULL),
(2, 24, 2, -1, NULL, NULL),
(3, 24, 3, -1, NULL, NULL),
(4, 24, 4, -1, NULL, NULL),
(5, 24, 5, -1, NULL, NULL),
(6, 24, 6, -1, NULL, NULL),
(7, 24, 7, -1, NULL, NULL),
(8, 24, 8, -1, NULL, NULL),
(9, 24, 9, -1, NULL, NULL),
(10, 24, 10, -1, NULL, NULL),
(11, 24, 11, -1, NULL, NULL),
(12, 24, 12, -1, NULL, NULL),
(13, 24, 13, -1, NULL, NULL),
(14, 24, 14, -1, NULL, NULL),
(15, 24, 15, -1, NULL, NULL),
(16, 24, 16, -1, NULL, NULL),
(17, 24, 17, -1, NULL, NULL),
(18, 24, 18, -1, NULL, NULL),
(19, 24, 19, -1, NULL, NULL),
(20, 24, 20, -1, NULL, NULL),
(21, 24, 21, -1, NULL, NULL),
(22, 24, 26, -1, NULL, NULL),
(23, 24, 46, -1, NULL, NULL),
(25, 24, 48, 7033, NULL, NULL),
(26, 25, 49, 1967, NULL, NULL),
(27, 24, 49, -1, NULL, NULL),
(28, 25, 50, 2467, NULL, NULL),
(29, 24, 50, 8700, NULL, NULL),
(30, 25, 51, 2867, NULL, NULL),
(31, 24, 51, 7767, NULL, NULL),
(32, 26, 51, -1, NULL, NULL),
(33, 25, 52, 4433, NULL, NULL),
(34, 24, 52, -1, NULL, NULL),
(35, 24, 53, -1, NULL, NULL),
(36, 24, 54, 7467, NULL, NULL),
(37, 24, 57, -1, NULL, NULL),
(38, 24, 58, 3933, NULL, NULL),
(39, 24, 69, -1, NULL, NULL),
(40, 24, 71, -1, NULL, NULL),
(41, 24, 82, 3267, NULL, NULL),
(42, 25, 82, -1, NULL, NULL),
(43, 26, 83, 6100, NULL, NULL),
(44, 24, 83, -1, NULL, NULL),
(45, 25, 83, -1, NULL, NULL),
(46, 24, 84, -1, NULL, NULL),
(47, 25, 85, -1, NULL, NULL),
(48, 24, 89, -1, NULL, NULL),
(49, 25, 89, -1, NULL, NULL),
(50, 24, 90, -1, NULL, NULL),
(51, 24, 91, -1, NULL, NULL),
(52, 25, 94, -1, NULL, NULL),
(53, 24, 94, -1, NULL, NULL),
(54, 25, 95, -1, NULL, NULL),
(55, 24, 95, -1, NULL, NULL),
(56, 25, 96, -1, NULL, NULL),
(57, 24, 96, -1, NULL, NULL),
(58, 24, 97, -1, NULL, NULL),
(59, 25, 97, -1, NULL, NULL),
(60, 24, 98, -1, NULL, NULL),
(61, 24, 99, -1, NULL, NULL),
(62, 24, 105, -1, NULL, NULL),
(63, 24, 107, -1, NULL, NULL),
(64, 24, 108, -1, NULL, NULL),
(65, 24, 109, -1, NULL, NULL),
(66, 24, 111, -1, NULL, NULL),
(67, 24, 116, -1, NULL, NULL),
(68, 24, 118, 2433, NULL, NULL),
(69, 24, 119, 4400, NULL, NULL),
(70, 24, 120, 4467, NULL, NULL),
(71, 24, 121, 4200, NULL, NULL),
(72, 25, 123, -1, 989, -26),
(73, 24, 123, 4700, 981, 26);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `elo` int(11) DEFAULT NULL,
  `xp` int(11) DEFAULT NULL,
  `played` int(11) DEFAULT NULL,
  `registration_time` int(11) DEFAULT NULL,
  `connection_time` int(11) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `email`, `elo`, `xp`, `played`, `registration_time`, `connection_time`, `online`) VALUES
(24, 'aze', '9adfb0a6d03beb7141d8ec2708d6d9fef9259d12cd230d50f70fb221ae6cabd5', NULL, 1007, 0, 89, 1450546253, 1450826249, 0),
(25, 'qsd', '0b1b8e9fc13fa4c07a6d7983ee14619bd71f2ea4001c2c6dba9ab79da4920d5c', NULL, 963, 0, 16, 1450546261, 1450826163, 0),
(26, 'wxc', '312f9d6d8559d52ebff1dc501db57b29b96afb9aabb8d6293aa30f8f43c8f3b0', NULL, 1003, 0, 2, 1450546270, 1450720903, 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `races`
--
ALTER TABLE `races`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT pour la table `times`
--
ALTER TABLE `times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
