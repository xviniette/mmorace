-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 18 Décembre 2015 à 23:46
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
-- Structure de la table `maps`
--

CREATE TABLE IF NOT EXISTS `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `nbLaps` int(11) DEFAULT NULL,
  `maxTime` int(11) DEFAULT NULL,
  `maxInterval` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `track` text,
  `checkpoints` text,
  `finish` text,
  `start` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `maps`
--

INSERT INTO `maps` (`id`, `name`, `nbLaps`, `maxTime`, `maxInterval`, `width`, `height`, `track`, `checkpoints`, `finish`, `start`) VALUES
(1, 'Test', 3, 120000, 20000, 1000, 800, '[[[80,200],[800,200],[800,600],[200,600],[200,200],[80,200],[80,700],[900,700],[900,100],[80,100],[80,200],[964,708]]]', '[{"x":140,"y":150,"r":100,"nb":1},{"x":850,"y":150,"r":100,"nb":2},{"x":850,"y":650,"r":100,"nb":3},{"x":150,"y":650,"r":100,"nb":4}]', '{"x":60,"y":300,"w":160,"h":60}', '{"x":140,"y":400,"rotation":-90}');

-- --------------------------------------------------------

--
-- Structure de la table `races`
--

CREATE TABLE IF NOT EXISTS `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_m` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `times`
--

CREATE TABLE IF NOT EXISTS `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_u` int(11) DEFAULT NULL,
  `id_r` int(11) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `email`, `elo`, `xp`, `played`, `registration_time`, `connection_time`, `online`) VALUES
(9, 'ElBazia', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', NULL, 1105, 0, 0, 1450051013, 1450474889, 0),
(10, 'ElGringo', 'a459f2cbd08e7c472a64f04d804664e089bb451ed1a0983930d94a0be77bdc77', NULL, 1978, 0, 0, 1450051079, 0, 0),
(11, 'ElGrin77go', 'a459f2cbd08e7c472a64f04d804664e089bb451ed1a0983930d94a0be77bdc77', NULL, 1200, 0, 0, 1450051141, 0, 0),
(12, 'ElGriazego', 'a459f2cbd08e7c472a64f04d804664e089bb451ed1a0983930d94a0be77bdc77', NULL, 1200, 0, 0, 1450051146, 0, 0),
(13, 'NiqueTaMere', 'a459f2cbd08e7c472a64f04d804664e089bb451ed1a0983930d94a0be77bdc77', NULL, 1200, 0, 0, 1450051152, 1450469188, 0),
(14, 'JeSuisJuif', 'eaeff72b6055aa253c6470f4cb272f841c5eb8d613d6926f7ce9f6e9ee90c54a', NULL, 1570, 0, 0, 1450051219, 1450064727, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
