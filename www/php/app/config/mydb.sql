-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 03, 2018 at 08:22 AM
-- Server version: 5.7.21
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mydb`;

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `whoBlock` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenBlock` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender` int(20) NOT NULL,
  `receiver` int(20) NOT NULL,
  `msg` text NOT NULL,
  `whenSend` datetime NOT NULL,
  `seen` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `who` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenLike` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `who`, `target`, `whenLike`) VALUES
(222, 28, 27, '2018-09-03 18:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `partner1` int(20) NOT NULL,
  `partner2` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`partner1`, `partner2`) VALUES
(9, 11),
(16, 11),
(10, 11),
(11, 9);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userNbr` int(20) NOT NULL,
  `src` text CHARACTER SET utf8 NOT NULL,
  `whenAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userNbr`, `src`, `whenAdd`) VALUES
(134, 26, 'http://localhost:8080/userPhoto/c1f6oH50JM.png', '2018-09-03 13:58:38'),
(136, 27, 'http://localhost:8080/userPhoto/IK8q07dgcw.png', '2018-09-03 14:01:35'),
(137, 27, 'http://localhost:8080/userPhoto/fxqP4hlJvm.png', '2018-09-03 14:01:44'),
(138, 27, 'http://localhost:8080/userPhoto/prieMFCh09.png', '2018-09-03 14:02:41'),
(139, 28, 'http://localhost:8080/userPhoto/LjQe5g03ER.png', '2018-09-03 14:07:30'),
(140, 28, 'http://localhost:8080/userPhoto/QjJEXYAl39.png', '2018-09-03 14:08:21');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user` int(20) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` text,
  `sexPref` text,
  `bio` text,
  `tags` text,
  `fameRate` int(11) DEFAULT '10',
  `stars` float NOT NULL DEFAULT '1',
  `longetude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `showMe` tinyint(1) NOT NULL,
  `profilePic` text,
  `isFull` tinyint(4) DEFAULT '0',
  `isOnline` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user`, `age`, `sex`, `sexPref`, `bio`, `tags`, `fameRate`, `stars`, `longetude`, `latitude`, `showMe`, `profilePic`, `isFull`, `isOnline`) VALUES
(17, 26, 26, 'female', 'hetero', 'I like to mode it!)', ' jazz photo', 10, 1, 30.462270602152, 50.469088855963, 1, 'http://localhost:8080/userPhoto/c1f6oH50JM.png', 1, 1),
(18, 27, 25, 'female', 'hetero', 'Born to be wild', ' cooking books', 10, 1, 30.548520872921, 50.413622494661, 1, 'http://localhost:8080/userPhoto/IK8q07dgcw.png', 1, 0),
(19, 28, 30, 'male', 'hetero', 'Live fast, die yang', ' books music', 10, 1, 30.4625539016, 50.449655410868, 1, 'http://localhost:8080/userPhoto/LjQe5g03ER.png', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `scammers`
--

CREATE TABLE `scammers` (
  `id` int(11) NOT NULL,
  `whoReported` int(20) NOT NULL,
  `target` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(20) NOT NULL,
  `fbNbr` text,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `token` text NOT NULL,
  `isEmailConfirmed` tinyint(11) NOT NULL,
  `last_seen` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `fbNbr`, `login`, `password`, `email`, `fname`, `lname`, `token`, `isEmailConfirmed`, `last_seen`) VALUES
(26, NULL, 'BertaFly', '$2y$10$3IwHKNEu1U6FZqulgVvOHeLvupsyQ70vmwnzxxU2UexqWK3wJ5NSe', 'ishtar929@gmail.com', 'Ira', 'Novikova', 'f3KhF6V2!Q/CnjDY1lIX', 1, '2018-09-03 16:58:48'),
(27, '1804906392950910', 'Ira Novikova', '$2y$10$qNhWuYVtHF7nfCG6QvAuIecEAfiSeISxw99P8wziQEsp0wUbAM3O6', 'ishtar929@gmail.com', 'Ira', 'Novikova', '1kHrvJgO8SIf/h9q7(3x', 1, '2018-09-03 17:02:56'),
(28, NULL, 'DoReMi', '$2y$10$n914NLKEC45oRmMp9kH5R.DjPJ9c1puz7veBbn1XSAwZ3q3kUMSeq', 'xoye@bit-degree.com', 'Dorian', 'Gray', 'jA*LmyruZl7V8(tJEcas', 1, '2018-09-03 18:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `whoView` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenView` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `whoView`, `target`, `whenView`) VALUES
(1, 9, 11, '2018-08-06 00:00:00'),
(2, 1, 11, '2018-08-05 00:00:00'),
(3, 12, 11, '2018-08-08 00:00:00'),
(4, 13, 11, '2018-08-04 00:00:00'),
(33, 11, 9, '2018-08-10 16:25:11'),
(34, 16, 11, '2018-08-08 18:00:00'),
(35, 11, 16, '2018-08-15 12:07:54'),
(36, 11, 17, '2018-08-15 14:21:42'),
(37, 17, 11, '2018-08-16 14:20:14'),
(38, 11, 10, '2018-08-24 20:10:50'),
(39, 11, 4, '2018-08-27 06:17:00'),
(40, 11, 19, '2018-08-27 11:00:00'),
(41, 11, 20, '2018-08-27 18:09:44'),
(42, 20, 11, '2018-08-27 18:14:54'),
(43, 20, 20, '2018-08-28 15:23:14'),
(44, 17, 17, '2018-08-29 13:39:12'),
(45, 17, 16, '2018-08-29 13:39:18'),
(46, 17, 9, '2018-08-29 13:39:53'),
(47, 17, 25, '2018-09-03 14:00:00'),
(48, 28, 26, '2018-09-03 17:11:33'),
(49, 28, 27, '2018-09-03 17:11:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scammers`
--
ALTER TABLE `scammers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `scammers`
--
ALTER TABLE `scammers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
