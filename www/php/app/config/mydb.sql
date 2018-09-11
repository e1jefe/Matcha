-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Сен 05 2018 г., 11:33
-- Версия сервера: 5.7.21
-- Версия PHP: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mydb`
--
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mydb`;

-- --------------------------------------------------------

--
-- Структура таблицы `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `whoBlock` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenBlock` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender` int(20) NOT NULL,
  `receiver` int(20) NOT NULL,
  `msg` text NOT NULL,
  `whenSend` datetime NOT NULL,
  `seen` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `chat`
--

INSERT INTO `chat` (`id`, `sender`, `receiver`, `msg`, `whenSend`, `seen`) VALUES
(15, 32, 31, 'privet', '2018-09-05 17:02:17', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `who` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenLike` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`id`, `who`, `target`, `whenLike`) VALUES
(222, 28, 27, '2018-09-03 18:17:02'),
(229, 31, 27, '2018-09-04 16:00:10'),
(230, 32, 31, '2018-09-04 16:07:48'),
(232, 31, 32, '2018-09-05 16:31:54'),
(233, 33, 32, '2018-09-05 18:07:33'),
(234, 33, 26, '2018-09-05 18:09:22'),
(235, 36, 34, '2018-09-05 18:25:48'),
(236, 26, 33, '2018-09-05 20:49:53');

-- --------------------------------------------------------

--
-- Структура таблицы `matches`
--

CREATE TABLE `matches` (
  `partner1` int(20) NOT NULL,
  `partner2` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `matches`
--

INSERT INTO `matches` (`partner1`, `partner2`) VALUES
(9, 11),
(16, 11),
(10, 11),
(11, 9),
(31, 32),
(26, 33);

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userNbr` int(20) NOT NULL,
  `src` text CHARACTER SET utf8 NOT NULL,
  `whenAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `photos`
--

INSERT INTO `photos` (`id`, `userNbr`, `src`, `whenAdd`) VALUES
(136, 27, 'https://images.unsplash.com/photo-1507426946714-15f08a43d39e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39bcf1cfb97c85a85d17a7826d0cc781&auto=format&fit=crop&w=3150&q=80', '2018-09-05 17:53:11'),
(137, 27, 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=608629c5a6a368d239d44bf9e84956b8&auto=format&fit=crop&w=3150&q=80', '2018-09-05 17:53:53'),
(138, 27, 'https://images.unsplash.com/photo-1531617494862-4e322fb560c9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b997cc348b85d4663263413bb725b2d1&auto=format&fit=crop&w=3151&q=80', '2018-09-05 17:54:14'),
(139, 28, 'https://images.unsplash.com/photo-1511314023197-79bcd4a1bfc4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=361b466a926379ba341e8881c416f387&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:55:28'),
(140, 28, 'https://images.unsplash.com/photo-1532753876631-2d5cf129df39?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1dc0897be3b71a7486b2aad2778e66c2&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:59:14'),
(141, 31, 'https://images.unsplash.com/photo-1503430935654-c3847b9289eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f733794214dd319c94c43fec0d9cd490&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:56:08'),
(142, 31, 'https://images.unsplash.com/photo-1500577329392-f0af6d7dd827?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00833a7550843e83a90924c865440d7f&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:56:33'),
(143, 32, 'https://images.unsplash.com/photo-1525843164177-5f89f7263e3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2da73e9cc6baf46f3f72e9c467d1480f&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:57:25'),
(144, 32, 'https://images.unsplash.com/photo-1527514086375-0a7bae9089be?ixlib=rb-0.3.5&s=b82793e8763f5817f0374686e011cb10&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:58:01'),
(145, 33, 'http://www.jamesmatthewsphotography.com/jmp/wp-content/uploads/2014/05/1829-del-mar-portrait-photography.jpg', '2018-09-05 15:06:15'),
(146, 34, 'https://scontent.fiev11-1.fna.fbcdn.net/v/t31.0-8/24273814_1496735040633929_6745985961767942751_o.jpg?_nc_cat=0&oh=1e560ba15c1da53d6ec2b9b347732128&oe=5BF92780', '2018-09-05 15:15:42'),
(147, 36, 'http://www.p1600.com/8cc276a6-5814-4bd8-844d-507a204325ed/gallery/2012/11/1200/1200_129972761743048093_557.jpg', '2018-09-05 15:24:38'),
(148, 38, 'https://www.ctimages.co.uk/wp-content/uploads/headshots-photography-bolton.jpg', '2018-09-05 16:15:36'),
(150, 38, 'http://nycphoto.com/app/uploads/portrait-photography-female-executive.jpg', '2018-09-05 16:17:25'),
(151, 39, 'http://www.jamesallenphoto.com/uploads/7/8/3/1/78318796/portrait-photography-05-2000-px_orig.jpg', '2018-09-05 16:25:49'),
(152, 40, 'https://format-com-cld-res.cloudinary.com/image/private/s--7y8ccx8L--/c_limit,g_center,h_700,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/531800ee4af63b9bdc64399e5e457194/Portrait_photography_fuoco_vancouver_headshot.jpg', '2018-09-05 16:33:20'),
(153, 41, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFH-9wUmuLywG3kynZx5P4mKYuykeVRMweAgaqqtOcyDfAy-1', '2018-09-05 16:36:06'),
(154, 42, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4e7svXwMAkrZo7tbWyQgxXvnJV2_EOVNeZdnPdWF6bRDagJU', '2018-09-05 16:43:58'),
(155, 43, 'https://m.media-amazon.com/images/M/MV5BNGY5ZWQ2ZWQtNzQzMi00MTZkLTliOTItMWQxYTI5Y2Q5OWJhXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg', '2018-09-05 16:48:43'),
(156, 44, 'http://www.portrait-photography.ie/wp-content/uploads/2015/01/baby-portrait-and-lifestyle-photography-by-anna-nowakowska-.jpg', '2018-09-05 16:51:47'),
(157, 26, 'https://images.unsplash.com/photo-1507229943010-31ed01024f05?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4b32e8995cd0d4d8830a61e013d93d7&auto=format&fit=crop&w=800&q=60', '2018-09-05 17:52:38');

-- --------------------------------------------------------

--
-- Структура таблицы `profiles`
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
-- Дамп данных таблицы `profiles`
--

INSERT INTO `profiles` (`id`, `user`, `age`, `sex`, `sexPref`, `bio`, `tags`, `fameRate`, `stars`, `longetude`, `latitude`, `showMe`, `profilePic`, `isFull`, `isOnline`) VALUES
(17, 26, 26, 'female', 'hetero', 'I like to mode it!)', ' jazz photo', 20, 1, 30.462270602152, 50.469088855963, 1, 'https://images.unsplash.com/photo-1507229943010-31ed01024f05?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4b32e8995cd0d4d8830a61e013d93d7&auto=format&fit=crop&w=800&q=60', 1, 1),
(18, 27, 25, 'female', 'hetero', 'Born to be wild', ' cooking books', 10, 1, 30.548520872921, 50.413622494661, 1, 'https://images.unsplash.com/photo-1507426946714-15f08a43d39e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39bcf1cfb97c85a85d17a7826d0cc781&auto=format&fit=crop&w=3150&q=80', 1, 0),
(19, 28, 30, 'male', 'hetero', 'Live fast, die yang', ' books music', 15, 1, 30.4625539016, 50.449655410868, 1, 'https://images.unsplash.com/photo-1511314023197-79bcd4a1bfc4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=361b466a926379ba341e8881c416f387&auto=format&fit=crop&w=800&q=60', 1, 1),
(20, 31, 19, 'male', 'hetero', 'Trulalala', 'sex drug rocknroll', 100, 1, 30.498709445532, 50.482360730108, 1, 'https://images.unsplash.com/photo-1503430935654-c3847b9289eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f733794214dd319c94c43fec0d9cd490&auto=format&fit=crop&w=800&q=60', 1, 1),
(21, 32, 25, 'female', 'hetero', 'Trulalala', ' sex drug rocknroll', 27, 1, 30.634182760301, 50.399025599654, 1, 'https://images.unsplash.com/photo-1525843164177-5f89f7263e3b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2da73e9cc6baf46f3f72e9c467d1480f&auto=format&fit=crop&w=800&q=60', 1, 1),
(22, 33, 33, 'male', 'hetero', 'Rakamakafo!', ' football sex drugs unit php', 33, 1, 30.495174719756, 50.524631649492, 1, 'http://www.jamesmatthewsphotography.com/jmp/wp-content/uploads/2014/05/1829-del-mar-portrait-photography.jpg', 1, 1),
(23, 34, 26, 'male', 'homo', 'Come on Barbie let\'s go party', 'swift boys mens sex drugs rocknroll objectivec unitfactory beer running', 50, 1, 30.653432301322, 50.225188574418, 1, 'https://scontent.fiev11-1.fna.fbcdn.net/v/t31.0-8/24273814_1496735040633929_6745985961767942751_o.jpg?_nc_cat=0&oh=1e560ba15c1da53d6ec2b9b347732128&oe=5BF92780', 1, 1),
(24, 36, 30, 'male', 'homo', 'Hola mi amigos! Tambalala', ' sex gay boys swift ios unit', 25, 1, 30.207286627845, 50.428292271528, 1, 'http://www.p1600.com/8cc276a6-5814-4bd8-844d-507a204325ed/gallery/2012/11/1200/1200_129972761743048093_557.jpg', 1, 1),
(25, 38, 48, 'female', 'hetero', 'Very hot homekeeper', ' home garden flowers sex family men', 100, 1, 30.328340010867, 50.489578367096, 1, 'https://www.ctimages.co.uk/wp-content/uploads/headshots-photography-bolton.jpg', 1, 0),
(26, 39, 25, 'female', 'homo', 'Hola muchacha! Que pasa?', ' clubs travel valik men sex', 10, 1, 30.66100982023, 50.533298623104, 1, 'http://www.jamesallenphoto.com/uploads/7/8/3/1/78318796/portrait-photography-05-2000-px_orig.jpg', 1, 0),
(27, 40, 19, 'female', 'bi', '', ' drug weed sex guns', 37, 1, 30.604646029242, 50.527137527033, 1, 'https://format-com-cld-res.cloudinary.com/image/private/s--7y8ccx8L--/c_limit,g_center,h_700,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/531800ee4af63b9bdc64399e5e457194/Portrait_photography_fuoco_vancouver_headshot.jpg', 1, 0),
(28, 41, 26, 'male', 'bi', 'Hop, hey, lalaley, gde vopros , a gde otvet?', ' vodka beer latina salsa jazz', 70, 1, 30.765780097961, 50.501140770614, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFH-9wUmuLywG3kynZx5P4mKYuykeVRMweAgaqqtOcyDfAy-1', 1, 0),
(29, 42, 31, 'male', 'hetero', '', 'vodka seledka', 29, 1, 30.474899885633, 50.490213214078, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4e7svXwMAkrZo7tbWyQgxXvnJV2_EOVNeZdnPdWF6bRDagJU', 1, 0),
(30, 43, 28, 'female', 'hetero', '', 'hot girl sweet', 10, 1, 30.447986021057, 50.460919845982, 1, 'https://m.media-amazon.com/images/M/MV5BNGY5ZWQ2ZWQtNzQzMi00MTZkLTliOTItMWQxYTI5Y2Q5OWJhXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg', 1, 0),
(31, 44, 37, 'male', 'hetero', '', ' gun vodka dotka', 10, 1, 30.494656562805, 50.459460069364, 1, 'http://www.portrait-photography.ie/wp-content/uploads/2015/01/baby-portrait-and-lifestyle-photography-by-anna-nowakowska-.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `scammers`
--

CREATE TABLE `scammers` (
  `id` int(11) NOT NULL,
  `whoReported` int(20) NOT NULL,
  `target` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `scammers`
--

INSERT INTO `scammers` (`id`, `whoReported`, `target`) VALUES
(1, 31, 26);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
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
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userId`, `fbNbr`, `login`, `password`, `email`, `fname`, `lname`, `token`, `isEmailConfirmed`, `last_seen`) VALUES
(26, NULL, 'BertaFly', '$2y$10$3IwHKNEu1U6FZqulgVvOHeLvupsyQ70vmwnzxxU2UexqWK3wJ5NSe', 'ishtar929@gmail.com', 'Ira', 'Novikova', 'f3KhF6V2!Q/CnjDY1lIX', 1, '2018-09-05 21:08:18'),
(27, '1804906392950910', 'Ira Novikova', '$2y$10$qNhWuYVtHF7nfCG6QvAuIecEAfiSeISxw99P8wziQEsp0wUbAM3O6', 'ishtar929@gmail.com', 'Ira', 'Novikova', '1kHrvJgO8SIf/h9q7(3x', 1, '2018-09-03 17:02:56'),
(28, NULL, 'DoReMi', '$2y$10$n914NLKEC45oRmMp9kH5R.DjPJ9c1puz7veBbn1XSAwZ3q3kUMSeq', 'xoye@bit-degree.com', 'Dorian', 'Gray', 'jA*LmyruZl7V8(tJEcas', 1, '2018-09-03 18:42:44'),
(31, NULL, 'dsheptun', '$2y$10$cYychQCbiputbsjaSQyuguFJR7/cDk7K1F5OhOMqL1V1ytTDVV3T.', 'dmitry.sheptun@gmail.com', 'Dmitry', 'Sheptun', '(5MCRuthB0*91b!6q24O', 1, '2018-09-05 19:08:16'),
(32, NULL, 'Vikki', '$2y$10$gh7zuyDhlnDMGkCfagSxYubA8Bx7G88ShwmGikZQ4DwxLDgnqjdaa', 'ternovaviktory@gmail.com', 'Viks', 'Tralala', 'lR/Yo1Jt!T$HQshrzCWv', 1, '2018-09-05 17:02:17'),
(33, NULL, 'DoReMi', '$2y$10$vLTUNss2OXSwJFIlNwBT7e4H7bHkHTrYWZ5HY7C3Rhib3qVvlQGLy', 'larion.rei@lcelandic.com', 'John', 'Willson', 'DPjke8vydaIlwmYBKM$F', 1, '2018-09-05 18:09:25'),
(34, NULL, 'andrew', '$2y$10$3LpPdFkUnXqZHXAKB3/fMeF8DCy3VkEPK.CLUOobQHnLw5PzOi.Aq', 'yazid.ezriah@lcelandic.com', 'Andrew', 'Pukchinsky', 'GLoD(F!lnrwhK*$vCUeu', 1, '2018-09-05 18:17:45'),
(36, NULL, 'DoReMi', '$2y$10$sFMSJOK7yW6UlFAhNlhdYuq1LVos3fXHCkbA9qqdmqs8edA0JKQ/a', 'jacion.bentleigh@lcelandic.com', 'Loy', 'Limberg', 'USMWe8pZzEAv3jcfbioh', 1, '2018-09-05 18:49:54'),
(38, NULL, 'cindy', '$2y$10$2/iU4dGj2hrDLdWM8G3K1.boeKMfXv4UOKecZX1qfoyF0Cg/9SRay', 'tyhir.gurjot@lcelandic.com', 'Cindy', 'Milfinsky', 'R!7(GIv)PlumhtO$5XWZ', 1, '2018-09-05 19:22:24'),
(39, NULL, 'lolak', '$2y$10$nNhCywwvGJsNhyC.2eBNBerjtp/hOWnfiOGKvAoiLbQdHTMmfNVA6', 'augustin.rhylee@lcelandic.com', 'Lola', 'Kuzura', 'qy6IXE)gf7raZUQn2(e/', 1, '2018-09-05 19:29:35'),
(40, NULL, 'klara', '$2y$10$o3X6kqsYF43G70q4JO/zyOSzJPdx2GrsjpEvjD8MdXSc.mQOnBB4a', 'imanuel.amar@lcelandic.com', 'Klara', 'Zepter', 'TuOnXIlh0Je*K5VvA3)t', 1, '2018-09-05 19:33:56'),
(41, NULL, 'kirkg', '$2y$10$/ZoRBlQ/U5f6V0TGBRuCrOckcQRmQK/O2HjnkctbI3PUZEEq12wmK', 'lyzander.ziggy@lcelandic.com', 'Kirk', 'Green', '1m$72ldn4LcTr8)jY/ea', 1, '2018-09-05 19:40:34'),
(42, NULL, 'johns', '$2y$10$XA1zLd/nNa9jRJ3NW0RF3O8P8MgpPwUd2kOdlHwc4JJo.YUrtbFWa', 'menno.charleston@lcelandic.com', 'John', 'Shildenberg', 'fTqaULF0rsW71K!vbAI$', 1, '2018-09-05 19:44:10'),
(43, NULL, 'crystal', '$2y$10$F9sad8jU5s7Qo.0c0dNLO.P7FOnM2SyEPf9jK5hnK938suJTs37uO', 'brannon.zen@lcelandic.com', 'Crystal', 'Reed', 'HWNMSBca!8yGZjTgko0K', 1, '2018-09-05 19:48:54'),
(44, NULL, 'brandon', '$2y$10$odboXz5UFmitiR8FJGrj6OFk4ApcF6xQwgLboN/v/f/HyNG8q6pWq', 'thai.knight@lcelandic.com', 'Brandon', 'Butkovsky', 'pfK7g(t3AOSDU1kndiXj', 1, '2018-09-05 19:52:22');

-- --------------------------------------------------------

--
-- Структура таблицы `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `whoView` int(20) NOT NULL,
  `target` int(20) NOT NULL,
  `whenView` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `views`
--

INSERT INTO `views` (`id`, `whoView`, `target`, `whenView`) VALUES
(54, 31, 32, '2018-09-04 16:11:00'),
(55, 33, 32, '2018-09-05 18:07:28'),
(56, 36, 34, '2018-09-05 18:49:54'),
(57, 38, 33, '2018-09-05 19:18:09'),
(58, 38, 31, '2018-09-05 19:22:05'),
(59, 38, 28, '2018-09-05 19:22:11'),
(60, 41, 34, '2018-09-05 19:39:43'),
(61, 44, 43, '2018-09-05 19:52:19'),
(62, 44, 27, '2018-09-05 19:52:22'),
(63, 26, 33, '2018-09-05 20:49:45'),
(64, 26, 41, '2018-09-05 20:50:34'),
(65, 26, 28, '2018-09-05 20:58:35'),
(66, 26, 31, '2018-09-05 20:59:31'),
(67, 26, 27, '2018-09-05 21:00:08'),
(68, 26, 43, '2018-09-05 21:00:15'),
(69, 26, 32, '2018-09-05 21:00:25'),
(70, 26, 40, '2018-09-05 21:00:39');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `scammers`
--
ALTER TABLE `scammers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Индексы таблицы `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT для таблицы `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `scammers`
--
ALTER TABLE `scammers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT для таблицы `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
