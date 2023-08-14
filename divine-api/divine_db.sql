DROP TABLE IF EXISTS `cmt`;
CREATE TABLE `cmt` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `cmt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `cmt_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
);


DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `item_id` varchar(50) NOT NULL primary key,
  `item_name` varchar(500) NOT NULL,
  `image` varchar(300) NOT NULL,
  `price` float NOT NULL,
  `priceBeforeDiscount` float NULL,
  `quantity` int NOT NULL,
  `sold` int default 0,
  `description` text null,
  `category` enum('entertainment', 'work', 'learn', 'game_steam', 'ea_games', 'window_office', 'google_drive', 'steam_wallet', 'google_play_itune') NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
);


DROP TABLE IF EXISTS `itemInOrder`;
CREATE TABLE `itemInOrder` (
  `order_id` varchar(50) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  `quantity` int not null,
  PRIMARY KEY (`order_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `iteminorder_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `iteminorder_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
);


DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` varchar(50) not null primary key,
  `status` enum('waiting_confirm','success','cancel') default 'waiting_confirm',
  `total` float NOT NULL,
  `discount` double default 0,
  `note` varchar(500) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);


DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `access_token` varchar(500) NOT NULL,
  `refresh_token` varchar(500) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(50) not null primary key,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `point` int DEFAULT 0,
  `role` enum('admin','user') DEFAULT 'user',
  `isActive` tinyint(1) DEFAULT '1',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL
);