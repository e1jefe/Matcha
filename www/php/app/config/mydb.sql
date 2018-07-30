-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Июл 30 2018 г., 02:18
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
(2, 9, 11, '2018-07-29 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `matches`
--

CREATE TABLE `matches` (
  `user-id-liked` int(11) NOT NULL,
  `user-id-who-like` int(11) NOT NULL,
  `if-match` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userNbr` int(11) NOT NULL,
  `src` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `photos`
--

INSERT INTO `photos` (`id`, `userNbr`, `src`) VALUES
(1, 11, 'https://images.unsplash.com/photo-1532784590681-d2eda7bc5db0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a5cad74fd6283d696a85c49dc98e5877&auto=format&fit=crop&w=1268&q=80'),
(2, 11, 'https://images.unsplash.com/photo-1532800621406-0280a106eaa6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a3fc2aa5291da59535d6e10b6c1c7b3b&auto=format&fit=crop&w=3537&q=80');

-- --------------------------------------------------------

--
-- Структура таблицы `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `age` date DEFAULT NULL,
  `sex` text,
  `sexPref` text,
  `bio` text,
  `tags` text,
  `fameRate` int(11) DEFAULT '1',
  `GPS` int(11) DEFAULT NULL,
  `profilePic` text,
  `isFull` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `profiles`
--

INSERT INTO `profiles` (`id`, `user`, `age`, `sex`, `sexPref`, `bio`, `tags`, `fameRate`, `GPS`, `profilePic`, `isFull`) VALUES
(1, 11, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 0),
(2, 11, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 0),
(3, 1, '2014-01-01', 'female', 'homo', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', 'architecto nesciunt dolorem', 1, NULL, 'https://images.unsplash.com/photo-1532800393221-f7c187ad204a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=80c13d1cde4aed58b84aa30bceee5620&auto=format&fit=crop&w=1534&q=80', 1),
(4, 9, '2018-07-01', 'male', 'hetero', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', 'quia ratione', 1, NULL, 'https://images.unsplash.com/photo-1532789207428-eb0c63ae912a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce22579721a595f7a5daeb3bc522d7d5&auto=format&fit=crop&w=3150&q=80', 1);

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
  `last_seen` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userId`, `login`, `password`, `email`, `fname`, `lname`, `token`, `isEmailConfirmed`, `last_seen`) VALUES
(1, 'ira', '$2y$10$.vGA1O9wmRjrwAVXD98HNOgsNpDczlqm3Jq7KnEd1rVAGv3Fykk1a', 'qwer@qwe.com', 'Toto', 'McKenzi', '333', 1, '2018-07-28 17:19:26'),
(9, 'bertafly', '$2y$10$g4aIGgewa8JdApbjt2ZCSeHojM5Cd03QsDpQybUE.TW8hZI.8gQeK', 'isht@gmail.com', 'Irusya', 'Novikova', 'ElySICncgbR9ao14)x38', 1, '2018-07-27 12:22:42'),
(10, 'qwerq', '$2y$10$LJfzLH6HtD7htrlVB.Y1TO0F5F4X.WaCeDkwN34Yq9WYzGo4FjfN6', 'qq@qq.com', 'Irisha', 'Novikova', '2Bb/i)tQ8Ff(JNCkn7cR', 0, '2018-07-27 14:13:55'),
(11, 'ira92', '$2y$10$5VmqaSAHg4dlVobJ9h9s0ehGdJWTZKF97HtfNuziJH/kqnF2mkq8m', 'ishtar929@gmail.com', 'Irochka', 'Novikova', '$ViJQ6Wc5aDUZkqKXLvN', 1, '2018-07-28 16:58:19');

--
-- Индексы сохранённых таблиц
--

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
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
