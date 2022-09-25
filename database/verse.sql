CREATE DATABASE IF NOT EXISTS `verse` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci
GRANT ALL ON `verse`.* TO 'root'@'%';

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `nickname` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Pictures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `stored_name` varchar(255) NOT NULL DEFAULT '',
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `company` varchar(255) NOT NULL DEFAULT '',
  `message` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Type_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` int DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `image_foreign_idx` (`image`),
  CONSTRAINT `image_foreign_idx` FOREIGN KEY (`image`) REFERENCES `Pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Type_videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_id` varchar(255) NOT NULL DEFAULT '',
  `poster` int DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `poster_foreign_idx` (`poster`),
  CONSTRAINT `poster_foreign_idx` FOREIGN KEY (`poster`) REFERENCES `Pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `Type_articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cover` int DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `overview` longtext NOT NULL,
  `content` json NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cover_foreign_idx` (`cover`),
  CONSTRAINT `cover_foreign_idx` FOREIGN KEY (`cover`) REFERENCES `Pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL DEFAULT 'image',
  `thumbnail` int DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `image_content` int DEFAULT NULL,
  `video_content` int DEFAULT NULL,
  `article_content` int DEFAULT NULL,
  `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'private',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `thumbnail_foreign_idx` (`thumbnail`),
  KEY `image_content_foreign_idx` (`image_content`),
  KEY `video_content_foreign_idx` (`video_content`),
  KEY `article_content_foreign_idx` (`article_content`),
  CONSTRAINT `thumbnail_foreign_idx` FOREIGN KEY (`thumbnail`) REFERENCES `Pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `image_content_foreign_idx` FOREIGN KEY (`image_content`) REFERENCES `Type_images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `video_content_foreign_idx` FOREIGN KEY (`video_content`) REFERENCES `Type_videos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `article_content_foreign_idx` FOREIGN KEY (`article_content`) REFERENCES `Type_articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

----------

CREATE TABLE `City` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL DEFAULT ''
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Posts_City` (
  `posts_id` int NOT NULL,
  `city_id` int NOT NULL
  PRIMARY KEY (`posts_id`, 'city_id'),
  KEY `posts_id_foreign_idx` (`posts_id`),
  KEY `city_id_foreign_idx` (`city_id`),
  CONSTRAINT `posts_id_foreign_idx` FOREIGN KEY (`posts_id`) REFERENCES `Posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `city_id_foreign_idx` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL DEFAULT 'image',
  `thumbnail` int DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `city` int DEFAULT NULL,
  `image_content` int DEFAULT NULL,
  `video_content` int DEFAULT NULL,
  `article_content` int DEFAULT NULL,
  `published_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'private',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `thumbnail_foreign_idx` (`thumbnail`),
  KEY `image_content_foreign_idx` (`image_content`),
  KEY `video_content_foreign_idx` (`video_content`),
  KEY `article_content_foreign_idx` (`article_content`),
  CONSTRAINT `thumbnail_foreign_idx` FOREIGN KEY (`thumbnail`) REFERENCES `Pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `image_content_foreign_idx` FOREIGN KEY (`image_content`) REFERENCES `Type_images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `video_content_foreign_idx` FOREIGN KEY (`video_content`) REFERENCES `Type_videos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `article_content_foreign_idx` FOREIGN KEY (`article_content`) REFERENCES `Type_articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
