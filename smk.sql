-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 28 Décembre 2015 à 20:57
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
(1, 2, 1451323363),
(2, 1, 1451324873),
(3, 1, 1451324900),
(4, 2, 1451324919),
(5, 1, 1451324936),
(6, 2, 1451325048),
(7, 2, 1451325069);

-- --------------------------------------------------------

--
-- Structure de la table `skins`
--

CREATE TABLE `skins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rarity` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `centerx` int(11) DEFAULT NULL,
  `centery` int(11) DEFAULT NULL,
  `rWidth` int(11) DEFAULT NULL,
  `rHeight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `skins`
--

INSERT INTO `skins` (`id`, `name`, `rarity`, `img`, `x`, `y`, `width`, `height`, `centerx`, `centery`, `rWidth`, `rHeight`) VALUES
(1, 'Ferrari Rouge', 1, 'ferrari.png', 0, 0, 291, 137, 145, 68, 60, 30);

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
(1, 24, 1, 3564, 1005, 0),
(2, 24, 2, 2310, 1005, 0),
(3, 24, 3, 2508, 1005, 0),
(4, 24, 4, 4092, 1005, 0),
(5, 24, 5, 2409, 1005, 0),
(6, 24, 6, 6897, 1005, 0),
(7, 24, 7, 6831, 1005, 0);

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
(24, 'aze', '9adfb0a6d03beb7141d8ec2708d6d9fef9259d12cd230d50f70fb221ae6cabd5', NULL, 1005, 0, 260, 1450546253, 1451332611, 0),
(25, 'qsd', '0b1b8e9fc13fa4c07a6d7983ee14619bd71f2ea4001c2c6dba9ab79da4920d5c', NULL, 965, 0, 30, 1450546261, 1451321608, 0),
(26, 'wxc', '312f9d6d8559d52ebff1dc501db57b29b96afb9aabb8d6293aa30f8f43c8f3b0', NULL, 1003, 0, 2, 1450546270, 1450720903, 0),
(27, 'ElGringo', '2c1b8795c15edcb9b85814709980664fdae43b7f074c9c63279da2f415973848', NULL, 1000, 0, 1, 1451239132, 1451244704, 0);

-- --------------------------------------------------------

--
-- Structure de la table `userskin`
--

CREATE TABLE `userskin` (
  `id` int(11) NOT NULL,
  `id_u` int(11) DEFAULT NULL,
  `id_s` int(11) DEFAULT NULL,
  `soldPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Index pour la table `skins`
--
ALTER TABLE `skins`
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
-- Index pour la table `userskin`
--
ALTER TABLE `userskin`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `times`
--
ALTER TABLE `times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT pour la table `userskin`
--
ALTER TABLE `userskin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
