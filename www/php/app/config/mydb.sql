-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Авг 15 2018 г., 05:37
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
  `whoBlock` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `whenBlock` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `who` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `whenLike` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`id`, `who`, `target`, `whenLike`) VALUES
(1, 1, 11, '2018-07-29 00:00:00'),
(2, 9, 11, '2018-07-29 00:00:00'),
(4, 23, 9, '2018-08-02 00:00:00'),
(5, 66, 9, '2018-08-03 00:00:00'),
(6, 87, 9, '2018-08-04 00:00:00'),
(7, 65, 9, '2018-08-05 14:15:00'),
(8, 12, 9, '2018-08-05 16:23:00'),
(9, 13, 9, '2018-08-07 19:00:00'),
(10, 14, 9, '2018-08-08 03:00:00'),
(35, 11, 13, '2018-08-13 18:07:07'),
(36, 16, 11, '2018-08-15 10:00:00'),
(38, 11, 16, '2018-08-15 12:14:48'),
(47, 11, 17, '2018-08-15 14:57:50'),
(51, 17, 11, '2018-08-15 15:27:48');

-- --------------------------------------------------------

--
-- Структура таблицы `matches`
--

CREATE TABLE `matches` (
  `partner1` int(11) NOT NULL,
  `partner2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `matches`
--

INSERT INTO `matches` (`partner1`, `partner2`) VALUES
(9, 11),
(11, 16),
(17, 11);

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userNbr` int(11) NOT NULL,
  `src` text CHARACTER SET utf8 NOT NULL,
  `whenAdd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `photos`
--

INSERT INTO `photos` (`id`, `userNbr`, `src`, `whenAdd`) VALUES
(95, 11, 'http://localhost:8080/userPhoto/qRIK7wns02.png', '2018-07-31 12:46:51'),
(96, 11, 'http://localhost:8080/userPhoto/9icw1yUCDL.png', '2018-07-31 13:08:31'),
(97, 11, 'http://localhost:8080/userPhoto/3sE6rPcwZO.png', '2018-08-01 08:36:45'),
(98, 11, 'http://localhost:8080/userPhoto/I3oHg0sv9F.png', '2018-08-03 13:17:03'),
(99, 11, 'http://localhost:8080/userPhoto/NbM2kRAJpQ.png', '2018-08-03 13:17:09'),
(100, 9, 'https://images.unsplash.com/photo-1521744561956-a97f0ec722ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b913518a15c37e35378cf5c7ed3ad1d&auto=format&fit=crop&w=1534&q=80', '2018-08-10 13:59:51'),
(101, 9, 'https://images.unsplash.com/photo-1519936492597-74c503a7b35f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d6aa6aeca6f83ecbc768ec9de1ee526a&auto=format&fit=crop&w=3150&q=80', '2018-08-10 13:59:51');

-- --------------------------------------------------------

--
-- Структура таблицы `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
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
(1, 11, 26, 'female', 'hetero', '', '', 50, 1, 30.468692779541, 50.466328225547, 0, 'http://localhost:8080/userPhoto/3sE6rPcwZO.png', 1, 1),
(3, 1, 30, 'female', 'homo', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', 'architecto nesciunt dolorem', 1, 1, NULL, NULL, 0, 'https://images.unsplash.com/photo-1532800393221-f7c187ad204a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=80c13d1cde4aed58b84aa30bceee5620&auto=format&fit=crop&w=1534&q=80', 1, 0),
(4, 9, 22, 'male', 'hetero', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', 'quia ratione', 19, 2.5, 30.5167, 50.4333, 0, 'https://images.unsplash.com/photo-1532789207428-eb0c63ae912a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce22579721a595f7a5daeb3bc522d7d5&auto=format&fit=crop&w=3150&q=80', 1, 0),
(5, 12, 33, 'male', 'hetero', 'Born to be wild', 'sex drugs rock-n-roll', 80, 1, 50.1234567, 30.1234567, 1, 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a723711f2c79ac1dc3c8718d82850f30&auto=format&fit=crop&w=3131&q=80', 1, 1),
(6, 13, 28, 'male', 'bi', 'Grateful my mom and dad', 'lolly cicling', 100, 1, 50.45678, 31.6789, 1, 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d8c8122a812b65e9729aee583ef9c2ec&auto=format&fit=crop&w=1575&q=80', 1, 1),
(7, 16, 45, 'male', 'hetero', 'In god we trust', 'jazz dansing', 10, 1, 12.3455, 45.12345, 1, 'https://images.unsplash.com/photo-1491743715344-d5eed2a9c5bd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39f2860d4712e5cfdceeaea7b6dcb338&auto=format&fit=crop&w=1534&q=80', 1, 1),
(8, 17, 30, 'male', 'hetero', 'Lol kek cheburek', 'tango foxtrot', 10, 1, 50.12345, 31.11223, 1, 'https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c90ef12b4dc22a4a4c277dd056dd0b7e&auto=format&fit=crop&w=3150&q=80', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `scammers`
--

CREATE TABLE `scammers` (
  `id` int(11) NOT NULL,
  `whoReported` int(11) NOT NULL,
  `target` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `scammers`
--

INSERT INTO `scammers` (`id`, `whoReported`, `target`) VALUES
(3, 11, 12);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `token` text NOT NULL,
  `isEmailConfirmed` tinyint(11) NOT NULL,
  `last_seen` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userId`, `login`, `password`, `email`, `fname`, `lname`, `token`, `isEmailConfirmed`, `last_seen`) VALUES
(1, 'ira', '$2y$10$.vGA1O9wmRjrwAVXD98HNOgsNpDczlqm3Jq7KnEd1rVAGv3Fykk1a', 'qwer@qwe.com', 'Toto', 'McKenzi', '333', 1, '2018-07-28'),
(9, 'bertafly', '$2y$10$g4aIGgewa8JdApbjt2ZCSeHojM5Cd03QsDpQybUE.TW8hZI.8gQeK', 'isht@gmail.com', 'Irusya', 'Novikova', 'ElySICncgbR9ao14)x38', 1, '2018-07-27'),
(10, 'qwerq', '$2y$10$LJfzLH6HtD7htrlVB.Y1TO0F5F4X.WaCeDkwN34Yq9WYzGo4FjfN6', 'qq@qq.com', 'Irisha', 'Novikova', '2Bb/i)tQ8Ff(JNCkn7cR', 0, '2018-07-27'),
(11, 'ira92', '$2y$10$XR01F1qRQ62daLpeSnsjO.2C5grLgwv0SoZLPk0S95htckAvCn.oK', 'ishtar929@gmail.com', 'Plotva', 'Druzzz', '$ViJQ6Wc5aDUZkqKXLvN', 1, '2018-08-07'),
(12, 'roJer', '1111111', '111@gmail.con', 'Jorje', 'Rodrigez', '111111ssw@3f', 1, '2018-08-01'),
(13, 'uniCicle2', '111111', '222@dma.com', 'William', 'Woles', '123qwe!@#$', 1, '2018-08-06'),
(16, 'Neddle1', '12345678Q', 'lol@lol.com', 'John', 'Carter', '12qwer$%&', 1, '2018-08-13'),
(17, 'Roock92', '11111111Q', 'qwe@lol.com', 'Li', 'Chen', '1234adfg$%^*', 1, '2018-08-15');

-- --------------------------------------------------------

--
-- Структура таблицы `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `whoView` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `whenView` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `views`
--

INSERT INTO `views` (`id`, `whoView`, `target`, `whenView`) VALUES
(1, 9, 11, '2018-08-06 00:00:00'),
(2, 1, 11, '2018-08-05 00:00:00'),
(3, 12, 11, '2018-08-08 00:00:00'),
(4, 13, 11, '2018-08-04 00:00:00'),
(33, 11, 9, '2018-08-10 16:25:11'),
(34, 16, 11, '2018-08-08 18:00:00'),
(35, 11, 16, '2018-08-15 12:07:54'),
(36, 11, 17, '2018-08-15 14:21:42');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blocks`
--
ALTER TABLE `blocks`
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
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT для таблицы `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `scammers`
--
ALTER TABLE `scammers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
