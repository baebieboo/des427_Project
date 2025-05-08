-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 08, 2025 at 06:25 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_media`
--

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`follower_id`, `following_id`) VALUES
(3, 2),
(5, 2),
(6, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `image_url` text,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `user_id`, `image_url`, `uploaded_at`) VALUES
(1, 2, 'http://172.20.10.2:3000/uploads/1746657019456-photo.jpg', '2025-05-07 22:30:19'),
(2, 2, 'http://172.20.10.2:3000/uploads/1746657266545-photo.jpg', '2025-05-07 22:34:26'),
(3, 2, 'http://172.20.10.2:3000/uploads/1746657496594-photo.jpg', '2025-05-07 22:38:16'),
(4, 2, 'http://172.20.10.2:3000/uploads/1746657901879-photo.jpg', '2025-05-07 22:45:01'),
(5, 2, 'http://172.20.10.2:3000/uploads/1746658223318-photo.jpg', '2025-05-07 22:50:23'),
(6, 2, 'http://172.20.10.2:3000/uploads/1746658255432-photo.jpg', '2025-05-07 22:50:55'),
(7, 3, 'http://172.20.10.2:3000/uploads/1746659534151-photo.jpg', '2025-05-07 23:12:14'),
(8, 3, 'http://172.20.10.2:3000/uploads/1746659603442-photo.jpg', '2025-05-07 23:13:23'),
(9, 3, 'http://172.20.10.2:3000/uploads/1746659664677-photo.jpg', '2025-05-07 23:14:24'),
(10, 2, 'http://172.20.10.2:3000/uploads/1746662066927-photo.jpg', '2025-05-07 23:54:26'),
(11, 2, 'http://172.20.10.2:3000/uploads/1746662278292-photo.jpg', '2025-05-07 23:57:58'),
(12, 4, 'http://172.20.10.2:3000/uploads/1746663643369-photo.jpg', '2025-05-08 00:20:43'),
(13, 4, 'http://172.20.10.2:3000/uploads/1746663656585-photo.jpg', '2025-05-08 00:20:56'),
(14, 4, 'http://172.20.10.2:3000/uploads/1746663682072-photo.jpg', '2025-05-08 00:21:22'),
(15, 4, 'http://172.20.10.2:3000/uploads/1746663767775-photo.jpg', '2025-05-08 00:22:47'),
(16, 4, 'http://172.20.10.2:3000/uploads/1746663813754-photo.jpg', '2025-05-08 00:23:33'),
(17, 3, 'http://172.20.10.2:3000/uploads/1746664773422-photo.jpg', '2025-05-08 00:39:33'),
(18, 4, 'http://172.20.10.2:3000/uploads/1746666478559-photo.jpg', '2025-05-08 01:07:58'),
(19, 2, 'http://172.20.10.2:3000/uploads/1746668958226-photo.jpg', '2025-05-08 01:49:18'),
(20, 2, 'http://172.20.10.2:3000/uploads/1746668990392-photo.jpg', '2025-05-08 01:49:50'),
(21, 2, 'http://172.20.10.2:3000/uploads/1746671608906-photo.jpg', '2025-05-08 02:33:28'),
(22, 2, 'http://172.20.10.2:3000/uploads/1746672448902-photo.jpg', '2025-05-08 02:47:28'),
(23, 5, 'http://172.20.10.2:3000/uploads/1746676680858-photo.jpg', '2025-05-08 03:58:00'),
(24, 5, 'http://172.20.10.2:3000/uploads/1746676694023-photo.jpg', '2025-05-08 03:58:14'),
(25, 5, 'http://172.20.10.2:3000/uploads/1746676704947-photo.jpg', '2025-05-08 03:58:24'),
(26, 5, 'http://172.20.10.2:3000/uploads/1746676723747-photo.jpg', '2025-05-08 03:58:43'),
(27, 5, 'http://172.20.10.2:3000/uploads/1746677162735-photo.jpg', '2025-05-08 04:06:02'),
(28, 6, 'http://172.20.10.2:3000/uploads/1746684633926-photo.jpg', '2025-05-08 06:10:33'),
(29, 6, 'http://172.20.10.2:3000/uploads/1746684649090-photo.jpg', '2025-05-08 06:10:49'),
(30, 6, 'http://172.20.10.2:3000/uploads/1746684669129-photo.jpg', '2025-05-08 06:11:09'),
(31, 7, 'http://172.20.10.2:3000/uploads/1746685288489-photo.jpg', '2025-05-08 06:21:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `handle` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `handle`, `created_at`) VALUES
(2, 'bonus@gmail.com', '$2b$10$6XdO6dVsSZSKxLj/rc5CiOJEbZUcis/zlsWFpGJvXr3ia9VcclN4C', 'boo', '2025-05-07 20:40:51'),
(3, 'luktal.b@gmail.com', '$2b$10$abREyJfOUT8zMXZZskIgSegWgIbQ8IrmalYJeUfHDpdiR8IXVacYi', 'LT', '2025-05-07 23:11:19'),
(4, 'porlnwza@gmail.com', '$2b$10$luk0ufSIvF5G6dCssMT30e7rJ3Ask7ol/TezVgNSs1kLDii8HzfHK', 'porpor', '2025-05-08 00:19:23'),
(5, 'brina@gmail.com', '$2b$10$jQKmmP0Uk9FbREA4fF3TdeAqUrjNZB5SJ1Xd/I/HM34dz6f9bbCmK', 'brina', '2025-05-08 03:51:59'),
(6, 'bonusa@gmail.com', '$2b$10$UG/XISydCZ8kAMTF94qOSedj2DzfwEGx40emgRLVuuBgP.irnGxRO', 'boq', '2025-05-08 06:09:21'),
(7, 'bonusac@gmail.com', '$2b$10$/I052QK6wlnRd1V4/PWH3.JD0lLJYYY9zL5H7Ly8VwVkVRT7lBCJ2', 'bon', '2025-05-08 06:19:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follower_id`,`following_id`),
  ADD KEY `following_id` (`following_id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `handle` (`handle`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
