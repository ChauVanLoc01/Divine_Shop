-- Adminer 4.8.1 MySQL 8.1.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `cmt`;
CREATE TABLE `cmt` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `cmt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `cmt_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(500) NOT NULL,
  `image` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` float NOT NULL,
  `priceBeforeDiscount` float DEFAULT NULL,
  `quantity` int NOT NULL,
  `sold` int NOT NULL DEFAULT '0',
  `description` text,
  `category` enum('entertainment','work','learn','game-steam','ea-games','window-office','google-drive','steam-wallet','google-play-itune') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `item` (`item_id`, `item_name`, `image`, `price`, `priceBeforeDiscount`, `quantity`, `sold`, `description`, `category`, `created`, `updated`) VALUES
(446,	'Tài Khoản Netflix Premium 1 tháng - Xem phim chất lượng 4k và Full HD',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-thang-23298.jpg?hash=1658829694',	89000,	260000,	102,	8,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(447,	'Gói gia hạn Spotify Premium 01 năm',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Spotify/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg?hash=1658742748',	299000,	590000,	182,	165,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(448,	'Gia hạn YouTube Premium + YouTube Music (6 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/YOUTUBE NO ADS 6 THANG.png?hash=1623646577',	259000,	3360000,	121,	31,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(449,	'Tài khoản Netflix Premium for 1 User (6 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-6-Thang-86374.jpg?hash=1658743297',	509000,	1560000,	31,	0,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(450,	'Tài khoản Netflix Premium for 1 User (1 Tuần)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-Tuan-69361-50093.jpg?hash=1683164358',	29000,	65000,	88,	32,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(451,	'Kích hoạt Youtube Premium trên TV  (1 năm)',	'https://cdn.divineshop.vn/image/catalog/YoutubeTV 12 thang-59767.jpg?hash=1672460434',	119000,	479000,	166,	163,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(452,	'Kích hoạt Youtube Premium trên TV  (6 tháng)',	'https://cdn.divineshop.vn/image/catalog/YoutubeTV 6 thang-97844.jpg?hash=1672460446',	49000,	239000,	179,	64,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(453,	'Tài khoản Calm Premium (3 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Calm Premium 3 months-20865.jpg?hash=1680830478',	49000,	2350000,	100,	4,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(454,	'Tài khoản Calm Premium (Vĩnh viễn)',	'https://cdn.divineshop.vn/image/catalog/Calm Premium tài khoản-59689.jpg?hash=1690016145',	690000,	4600000,	9,	8,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(455,	'Gói gia hạn Spotify Premium 6 tháng (Tặng 6 tháng Free)',	'https://divineshop.vn/catalog/Anh/Banner 14 thang 11/Gói gia hạn 6 tháng.png',	159000,	590000,	172,	160,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(456,	'Tài khoản nghe nhạc Spotify Premium  (1 tháng)',	'https://divineshop.vn/catalog/Anh/Banner 14 thang 11/Tài khoản nghe nhạc 1 tháng.png',	25000,	59000,	51,	46,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(457,	'Gia hạn YouTube Premium + YouTube Music (1 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/YOUTUBE NO ADS 1 THANG.png?hash=1623646532',	35000,	280000,	36,	8,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(458,	'Gia hạn Youtube Premium (2 Tháng)',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/youtube-pre.png',	75000,	560000,	146,	62,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(459,	'Tài khoản Youtube Premium tạo sẵn (4 tháng)',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/youtube-pre.png',	99000,	1100000,	48,	29,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(460,	'Tài khoản nghe nhạc Spotify Premium (4 tháng)',	'https://cdn.divineshop.vn/image/catalog/Spotify 4 thang-22647.png?hash=1633517415',	79000,	236000,	76,	46,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(461,	'Tài khoản nghe nhạc Deezer HiFi (1 Tháng)',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/8.9/deezer Hifi.jpg',	19000,	288000,	35,	30,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(462,	'Tài khoản nghe nhạc Tidal HiFi Plus (1 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/Tidal HiFi1406.png?hash=1623645407',	19000,	550000,	68,	9,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(463,	'Tài khoản Netflix Premium for 1 User (1 Ngày)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-Ngay-25533.jpg?hash=1658743234',	9000,	15000,	162,	23,	NULL,	'entertainment',	'2023-08-08 16:25:09',	NULL),
(464,	'Windows 10 Professional CD Key',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Zoom/Divine-Shop-Nang-cap-Zoom-Pro-1-thang-80331.jpg?hash=1658975559',	290000,	400000,	7,	2,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(465,	'Discord Nitro 3 tháng (Đăng kí lần đầu)',	'https://cdn.divineshop.vn/image/catalog/Discord Nitro 3 thang-71170.jpg?hash=1672370038',	165000,	690000,	56,	17,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(466,	'Tài khoản Canva 1 tháng',	'https://cdn.divineshop.vn/image/catalog/Canvas 1 thang-21944.png?hash=1648182315',	25000,	150000,	71,	4,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(467,	'Tài khoản OpenAI - ChatGPT (Có sẵn 5$)',	'https://cdn.divineshop.vn/image/catalog/OpenAI - ChatGPT-37620.jpg?hash=1672200973',	99000,	200000,	88,	24,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(468,	'Tài khoản Doodly  Standard vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-Doodly-Standard-Vinh-Vien-47767.jpg?hash=1658741969',	599000,	4800000,	91,	54,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(469,	'Key bản quyền diệt virus Malwarebytes vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-Malwarebytes-Vinh-Vien-51870.jpg?hash=1658743003',	599000,	1500000,	129,	94,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(470,	'Tài khoản Doodly  Enterprise vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/Doodly Enterprise.png?hash=1623645349',	990000,	6800000,	58,	47,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(471,	'Tài khoản Doodly  Rainbow + Enterprise vĩnh viễn',	'https://divineshop.vn/catalog/Anh/Banner/8618c1d70d9f396837ddd503ceed004f.jpg',	1790000,	8800000,	28,	21,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(472,	'Gói nâng cấp tài khoản LastPass Premium ( 1 năm )',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-Do-LastPass-Premium-1-Nam-22011.jpg?hash=1658742956',	399000,	799000,	38,	20,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(473,	'Microsoft Office 2021 Professional Plus for Windows',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Office2021-49955.jpg?hash=1677051637',	690000,	11500000,	118,	44,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(474,	'Gói nâng cấp Turnitin (1 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 1 tháng-97360.png?hash=1657644418',	249000,	399000,	113,	46,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(475,	'Gói nâng cấp Turnitin (6 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 6 tháng-31152.png?hash=1657644418',	629000,	839000,	174,	10,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(476,	'Gói nâng cấp Turnitin (12 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 12 tháng-77817.png?hash=1657644421',	799000,	1190000,	132,	110,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(477,	'Gói nâng cấp Turnitin (3 Tháng)',	'https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 3 tháng-97801.png?hash=1657644418',	419000,	599000,	60,	25,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(478,	'Windows 10 Education CD Key',	'https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Education-64566.png?hash=1653303175',	250000,	600000,	5,	2,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(479,	'Tài khoản Premium Freepik 6 tháng (1 Thiết bị)',	'https://cdn.divineshop.vn/image/catalog/Freepik 1 thiết bị-28732.jpg?hash=1670468529',	300000,	900000,	198,	179,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(480,	'Tài khoản Hotspot Shield VPN (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Hotspot Shield VPN-66817.jpg?hash=1663982198',	249000,	2200000,	198,	134,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(481,	'360 Total Security Premium (1 năm / 3 PC)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoSecurity Premium-752012-18143.jpg?hash=1689736122',	249000,	532000,	191,	141,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(482,	'Tài khoản Notion Pro vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Notion Pro-96609-24916-25370.jpg?hash=1687925337',	190000,	1280000,	93,	14,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(483,	'Tài khoản Wondershare Filmora 12 (vĩnh viễn) - Hệ điều hành Windows',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Filmora win 12-74182.jpg?hash=1674012209',	490000,	1900000,	110,	86,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(484,	'Code gia hạn XSplit Premium 12 tháng',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/XSplit Premium 12 tháng-91315.png?hash=1647941712',	399000,	1720000,	198,	83,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(485,	'Nâng cấp LinkedIn Premium Business (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoLinkedin Premium 1 year-23390.jpg?hash=1673497172',	1390000,	16000000,	45,	28,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(486,	'Windows 10 Home DSP OEI DVD (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Home-41796.png?hash=1654096664',	2100000,	4000000,	40,	37,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(487,	'Key McAfee Livesafe (1 năm)',	'https://cdn.divineshop.vn/image/catalog/MCAFEE LIVESAFE Unlimited-86734.jpg?hash=1666941282',	499000,	1000000,	95,	78,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(488,	'Tài khoản Wondershare Filmora 12 (1 năm) - Hệ điều hành Windows',	'https://cdn.divineshop.vn/image/catalog/Filmora 12 win-1nam-83016.jpg?hash=1672115168',	199000,	900000,	154,	57,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(489,	'Nâng cấp LinkedIn Premium Career (6 tháng)',	'https://cdn.divineshop.vn/image/catalog/Linkedin Premium Career-18813.jpg?hash=1682473435',	690000,	4200000,	122,	67,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(490,	'Gói gia hạn Dropbox Plus 2TB  - 5 thành viên (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 2tb-75243.jpg?hash=1677770783',	790000,	4500000,	133,	7,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(491,	'Gói gia hạn Dropbox Professional 3TB (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 3tb-44296.jpg?hash=1677770755',	890000,	4500000,	14,	9,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(492,	'Tài khoản Wondershare Filmora 12 (vĩnh viễn) - Hệ điều hành MacOS',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Filmora12vv-97558.jpg?hash=1674011366',	490000,	1900000,	196,	89,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(493,	'Tài khoản Wondershare Filmora 12 (1 năm) - Hệ điều hành Mac',	'https://cdn.divineshop.vn/image/catalog/Filmora 12 mac-1nam-61924.jpg?hash=1672115158',	199000,	900000,	102,	27,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(494,	'Tài khoản Blinkist Premium (1 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Blinkist 1 thang-96348.jpg?hash=1673404091',	109000,	350000,	36,	27,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(495,	'Nâng cấp 1Password 1 năm',	'https://cdn.divineshop.vn/image/catalog/1Password-62076.jpg?hash=1665114403',	390000,	860000,	37,	27,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(496,	'Tài khoản GoHighLevel Agency Unlimited (1 tháng)',	'https://cdn.divineshop.vn/image/catalog/GoHighLevel-94156.jpg?hash=1682050306',	99000,	12500000,	23,	1,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(497,	'Nâng cấp Parallels Desktop Pro Edition (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Parallels Desktop 18 pro-52998.jpg?hash=1684548563',	990000,	2700000,	87,	68,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(498,	'Nâng cấp Parallels Desktop 18 Standard Edition (Vĩnh Viễn)',	'https://cdn.divineshop.vn/image/catalog/Parallels Desktop 18-52300.jpg?hash=1684548596',	990000,	2400000,	148,	104,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(499,	'Combo Đĩa Windows 11 Pro + Đĩa Office Home & Business 2019 (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 2-68403.jpg?hash=1689071040',	5990000,	10700000,	1,	0,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(500,	'Combo Đĩa Windows 10 Pro + Đĩa Office Home & Business 2019 (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 1-48449.jpg?hash=1689071030',	5990000,	10700000,	58,	46,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(501,	'Discord Nitro 1 Tháng',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitro.png',	89000,	250000,	81,	77,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(502,	'Discord Nitro 1 Tháng (Classic)',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitroclassic.png',	56000,	125000,	143,	99,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(503,	'Gói gia hạn Canva 1 năm',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoDivine-Shop-Canva-1-Nam-44514.jpg?hash=1658741770',	300000,	1500000,	86,	63,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(504,	'Nâng cấp Tài khoản Zoom Pro 2 tháng',	'https://divineshop.vn/catalog/Anh-SP-New/Garena/zoom-2-thang.png',	360000,	700000,	167,	28,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(505,	'Nâng cấp Tài khoản Zoom Pro 1 tháng (300 thành viên)',	'https://divineshop.vn/catalog/Anh/1 tháng.png',	320000,	400000,	35,	21,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(506,	'Discord Nitro 1 Năm',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitro.png',	690000,	3000000,	120,	55,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(507,	'Tài khoản Pngtree Premium (Vĩnh viễn)',	'https://divineshop.vn/catalog/Hung2021/Pngtree vĩnh viễn.png',	4560000,	5230000,	178,	79,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(508,	'Tài khoản Premium Freepik 1 năm',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/8.9/freepik-1-nam-ver2.png',	850000,	1500000,	61,	44,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(509,	'Tài khoản Envato Elements 1 tháng',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/photo_2020-05-23_11-39-35.jpg',	190000,	380000,	24,	21,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(510,	'Tài khoản Pngtree Premium (1 năm)',	'https://divineshop.vn/catalog/Hung2021/Pngtree 1 năm.png',	390000,	4120000,	183,	75,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(511,	'Tài khoản Evernote Premium (6 tháng)',	'https://divineshop.vn/catalog/Sỹ Hải/Evernote.png',	290000,	1990000,	81,	58,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(512,	'Discord Nitro 1 Năm (Basic)',	'https://cdn.divineshop.vn/image/catalog/Discord Nitro 1 nam classic-70787.jpg?hash=1672370019',	320000,	1400000,	25,	2,	NULL,	'work',	'2023-08-08 16:25:09',	NULL),
(513,	'Tài khoản OpenAI - ChatGPT (Có sẵn 5$)',	'https://cdn.divineshop.vn/image/catalog/OpenAI - ChatGPT-37620.jpg?hash=1672200973',	99000,	200000,	151,	137,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(514,	'Tài khoản Grammarly Premium 7 ngày',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/Grammarly Premium 7 ngay.png?hash=1623645470',	15000,	30000,	199,	17,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(515,	'Tài khoản Grammarly Premium 15 ngày',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/Grammarly Premium 15 ngay.png?hash=1623645514',	29000,	40000,	16,	1,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(516,	'Tài khoản học ngoại ngữ Busuu Premium Plus 1 năm',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Busuu Premium Plus.png?hash=1623641387',	490000,	2190000,	57,	45,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(517,	'Tài khoản Lynda Premium vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Lynda (LinkedIn Learning).png?hash=1623640222',	290000,	1500000,	82,	38,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(518,	'Tài khoản Hello Chinese Premium 1 năm',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Hello Chinese Premium-48788.jpg?hash=1678413000',	550000,	1280000,	184,	86,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(519,	'Tài khoản Datacamp Premium 3 tháng',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Datacamp-52631.jpg?hash=1673317992',	199000,	750000,	113,	8,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(520,	'Nâng cấp ứng dụng lập trình JetBrains All Products Pack (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/JetBrains1-81956.jpg?hash=1671761607',	490000,	6900000,	51,	31,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(521,	'Tài khoản Mate Translate vĩnh viễn',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Mate Translate-60991.jpg?hash=1674890917',	99000,	1500000,	82,	44,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(522,	'Gói gia hạn Duolingo 1 tháng',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Duolingo gia han-23597.jpg?hash=1678671180',	29000,	150000,	116,	8,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(523,	'Nâng cấp Super Chinese (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Super Chinese Nâng cấp-69084.jpg?hash=1682071132',	790000,	1350000,	198,	48,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(524,	'Tài khoản Treehouse Courses Plus (6 tháng)',	'https://cdn.divineshop.vn/image/catalog/Treehouse Courses Plus-81504.jpg?hash=1676079049',	190000,	1200000,	16,	15,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(525,	'Tài khoản Blinkist Premium (1 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Blinkist 1 thang-96348.jpg?hash=1673404091',	109000,	350000,	159,	140,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(526,	'Tài khoản Ginger Premium (6 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Ginger Premium-57276.jpg?hash=1675133293',	390000,	2000000,	172,	168,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(527,	'Tài khoản Duolingo 1 tháng',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Duolingo tai khoan 1m-90573.jpg?hash=1680491435',	19000,	150000,	37,	13,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(528,	'Gói gia hạn Duolingo 2 tháng',	'https://cdn.divineshop.vn/image/catalog/Duolingo gia hạn 2 tháng-26499.jpg?hash=1684220480',	49000,	400000,	41,	40,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(529,	'Tài khoản Ginger Premium (1 tháng)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Ginger Premium 1m-65848.jpg?hash=1689133157',	59000,	600000,	171,	56,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(530,	'Tài khoản học Ngoại Ngữ Cambly ( 25 phút )',	'https://cdn.divineshop.vn/image/catalog/Cambly 25-22900.jpg?hash=1689758775',	39000,	200000,	13,	4,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(531,	'Tài khoản học Ngoại Ngữ Cambly ( 70 phút )',	'https://cdn.divineshop.vn/image/catalog/Cambly 70-15808.jpg?hash=1689758817',	99000,	500000,	80,	76,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(532,	'Tài khoản học ngoại ngữ Duolingo 1 năm',	'https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/duolingo.png',	190000,	300000,	54,	42,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(533,	'Tài khoản học Ngoại Ngữ Cambly ( 30 phút )',	'https://cdn.divineshop.vn/image/catalog/Cambly 30-51509.jpg?hash=1689758799',	49000,	125000,	117,	49,	NULL,	'learn',	'2023-08-08 16:25:09',	NULL),
(534,	'Random Code Steam',	'https://cdn.divineshop.vn/image/catalog/Anh/Banner/Random Code Steam.png?hash=1623754090',	9000,	20000,	20,	12,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(535,	'Elden Ring (CD Key Steam)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-Elden-Ring-82335.jpg?hash=1658742026',	790000,	800000,	111,	25,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(536,	'Code Roblox Raven Hunter Hood - Tower Defense Simulator',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New…tower-defense-simulator-44997.png?hash=1668952190',	12000,	99000,	164,	16,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(537,	'Tài khoản Grand Theft Auto V: Premium Edition (GTA 5)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-GTA-V19-92008.jpg?hash=1658822638',	250000,	459000,	109,	8,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(538,	'Random Code Steam Legendary',	'https://cdn.divineshop.vn/image/catalog/Random Code Steam Legendary-78055.png?hash=1650017306',	60000,	150000,	83,	37,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(539,	'Tài khoản Battlefield 4 (EA)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Tien/Anh SP/7.7/tài khoản BF4.png?hash=1626925143',	79000,	500000,	3,	2,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(540,	'Assassin\'s Creed® Origins - Gold Edition',	'https://steamcdn-a.akamaihd.net/steam/apps/582160/header.jpg',	1485000,	1405000,	4,	2,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(541,	'Pacify',	'https://steamcdn-a.akamaihd.net/steam/apps/967050/header.jpg',	49000,	70000,	139,	108,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(542,	'Fly Simulator',	'https://steamcdn-a.akamaihd.net/steam/apps/655790/header.jpg',	9000,	30000,	151,	73,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(543,	'Conan Exiles (CD KEY)',	'https://steamcdn-a.akamaihd.net/steam/apps/440900/header.jpg',	299000,	319000,	137,	101,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(544,	'BioShock: The Collection ',	'https://steamcdn-a.akamaihd.net/steam/subs/127633/header.jpg',	1000000,	946000,	151,	86,	NULL,	'game-steam',	'2023-08-08 16:25:09',	NULL),
(545,	'Battlefield 1',	'https://divineshop.vn/catalog/Anh-SP-New/bf1.png',	519000,	1200000,	129,	31,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(546,	'Battlefield 1 Revolution (EA)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/bf1 revo.png?hash=1604888770',	590000,	1000000,	94,	49,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(547,	'Titanfall™ 2 (EA)',	'https://cdn.divineshop.vn/image/catalog/origin/t-460x215.jpg?hash=1604888771',	540000,	1250000,	174,	64,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(548,	'Battlefield 4 Premium Edition',	'https://divineshop.vn/catalog/wallet/maxresdefault-1-4-460x215.jpg',	890000,	1110000,	108,	89,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(549,	'Dragon Age™: Inquisition',	'https://divineshop.vn/catalog/thẻ điện thoại/dfsdfwefwefsdvsdvsdfewf-460x215.jpg',	520000,	470000,	167,	163,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(550,	'Anthem Legion of Dawn Edition',	'https://divineshop.vn/catalog/Anh-san-pham/candy/Image 972.png',	1750000,	2300000,	12,	8,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(551,	'Battlefield 3 Premium Edition',	'https://divineshop.vn/catalog/origin/b3pe_hero-460x215.jpg',	1050000,	800000,	189,	43,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(552,	'Titanfall™ 2 Ultimate Edition',	'https://divineshop.vn/catalog/Anh-san-pham/t-460x215.jpg',	759000,	700000,	66,	8,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(553,	'Tài Khoản Battlefield 1 (EA)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/bf1.png?hash=1604888770',	79000,	570000,	149,	134,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(554,	'It Takes Two (Origin)',	'https://divineshop.vn/catalog/Hung2021/ittaketwo.jpeg',	750000,	1200000,	144,	32,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(555,	'The Sims™ 4 EVERYDAY SIMS BUNDLE (EA)',	'https://cdn.divineshop.vn/image/catalog/Anh/Image 3199.png?hash=1604888769',	779000,	980000,	149,	146,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(556,	'Apex Legends  - 1000 Apex Coins',	'https://divineshop.vn/catalog/Anh-san-pham/candy/1000.png',	270000,	360000,	123,	100,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(557,	'Apex Legends  - 2000 (+150 Bonus) Apex Coins',	'https://divineshop.vn/catalog/Anh-san-pham/candy/2000.png',	529000,	700000,	8,	1,	NULL,	'ea-games',	'2023-08-08 16:25:09',	NULL),
(558,	'Windows 10 Professional CD Key',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-shop-windows-10-pro-55555.jpg?hash=1658743921',	290000,	400000,	7,	2,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(559,	'Windows 11 Professional CD Key',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-11-Pro-222-15362.jpg?hash=1678241365',	290000,	400000,	71,	67,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(560,	'Microsoft Office 2021 Professional Plus for Windows',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Office2021-49955.jpg?hash=1677051637',	690000,	11500000,	1,	0,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(561,	'Microsoft Office 2019 Professional Plus for Windows',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2019-Professional-Plus-For-Windows-45649.jpg?hash=1658743103',	590000,	9500000,	138,	82,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(562,	'Gói nâng cấp Office 365 1 năm (1TB)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Goi-Nang-Cap-Office-365-1-Nam-84521.jpg?hash=1658742827',	249000,	1299000,	69,	36,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(563,	'Windows 10 Professional DSP OEI DVD (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-10-Professional-Full-VAT-24044.jpg?hash=1658743951',	2490000,	4000000,	31,	8,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(564,	'Office Home & Business 2019 English APAC EM (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Office-Home-20682.jpg?hash=1658743343',	3900000,	6699000,	136,	17,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(565,	'Microsoft Office 2021 Home & Business for MAC',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2021-Professional-Plus-For-Mac-59098.jpg?hash=1658743145',	790000,	11500000,	93,	85,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(566,	'Microsoft Office 2019 Home & Business for MAC',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2019-Professional-Plus-For-Mac-31336.jpg?hash=1658743080',	790000,	9500000,	68,	61,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(567,	'Windows 10 Education CD Key',	'https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Education-64566.png?hash=1653303175',	250000,	600000,	53,	12,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(568,	'Windows 11 Education CD Key',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Windows 11 Education-79694.png?hash=1653577714',	250000,	600000,	197,	20,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(569,	'Windows 11 Professional DSP OEI DVD (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-11-Professional-Full-VAT-63622.jpg?hash=1658744020',	2490000,	4000000,	189,	83,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(570,	'Windows 10 Home DSP OEI DVD (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Home-41796.png?hash=1654096664',	2100000,	4000000,	85,	81,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(571,	'Microsoft Office 2016 Home & Business for MAC',	'https://cdn.divineshop.vn/image/catalog/Divine-Shop-Microsoft-Office-2016-Professional-Plus-For-Mac-59098-35016.jpg?hash=1673603466',	649000,	11500000,	109,	29,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(572,	'Microsoft Office 2016 Professional Plus for Windows',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Tien/window/Divine-Shop-Microsoft-Office-2016-Professional-Plus-For-Windows-45649-21195.jpg?hash=1673606784',	390000,	9500000,	67,	55,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(573,	'Combo Đĩa Windows 11 Pro + Đĩa Office Home & Business 2019 (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 2-68403.jpg?hash=1689071040',	5990000,	10700000,	164,	154,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(574,	'Combo Đĩa Windows 10 Pro + Đĩa Office Home & Business 2019 (Full VAT)',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 1-48449.jpg?hash=1689071030',	5990000,	10700000,	127,	82,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(575,	'Gói nâng cấp Office 365  4 năm (1TB) ',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Office 365 4 năm-70143.jpg?hash=1677397342',	890000,	5199000,	8,	1,	NULL,	'window-office',	'2023-08-08 16:25:09',	NULL),
(576,	'Tài khoản Google Drive 500GB (Vĩnh viễn)',	'https://cdn.divineshop.vn/image/catalog/Google Drive 500gb-29699.png?hash=1658458874',	359000,	3450000,	107,	73,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(577,	'Tài khoản Google Drive 200GB (Vĩnh viễn)',	'https://cdn.divineshop.vn/image/catalog/Google Drive 200gb-76400.png?hash=1658458725',	169000,	1380000,	111,	65,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(578,	'Gói gia hạn Google One 400GB (1 năm) - 1 thành viên',	'https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 400gb-33548.png?hash=1658822521',	390000,	1380000,	30,	3,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(579,	'Gói gia hạn Google One 100GB (1 năm) - 5 thành viên',	'https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 100gb-28238.png?hash=1658822520',	229000,	450000,	97,	76,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(580,	'Tài khoản Google Drive 100GB (Vĩnh viễn)',	'https://cdn.divineshop.vn/image/catalog/Google Drive 100gb-15361.png?hash=1658458775',	99000,	900000,	104,	68,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(581,	'Gói gia hạn Google One 2TB (1 năm) - 5 thành viên',	'https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 2tb-33536.png?hash=1658823087',	1190000,	2250000,	87,	8,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(582,	'Gói gia hạn Dropbox Plus 2TB  - 5 thành viên (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 2tb-75243.jpg?hash=1677770783',	790000,	4500000,	128,	80,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(583,	'Gói gia hạn Dropbox Professional 3TB (1 năm)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 3tb-44296.jpg?hash=1677770755',	890000,	4500000,	100,	35,	NULL,	'google-drive',	'2023-08-08 16:25:09',	NULL),
(584,	'Steam Wallet Code 200 TWD (~149.600 VNĐ)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/STEAM 200 TWD.png?hash=1622879197',	164000,	170000,	113,	35,	NULL,	'steam-wallet',	'2023-08-08 16:25:09',	NULL),
(585,	'Gói nạp Steam Wallet 20$ ( Nạp chậm ) (~475.340 VNĐ)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 20us.png?hash=1622879501',	470000,	500000,	38,	1,	NULL,	'steam-wallet',	'2023-08-08 16:25:09',	NULL),
(586,	'Gói nạp Steam Wallet 50$ ( Nạp chậm ) (~1.188.700 VNĐ)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 50usd.png?hash=1622879000',	1175000,	1300000,	122,	109,	NULL,	'steam-wallet',	'2023-08-08 16:25:09',	NULL),
(587,	'Gói nạp Steam Wallet 100$ ( Nạp chậm ) (~2.376.700 VNĐ)',	'https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 100.png?hash=1622878183',	2350000,	2500000,	181,	33,	NULL,	'steam-wallet',	'2023-08-08 16:25:09',	NULL),
(588,	'XBox - Microsoft Gift Card 15$ (US)',	'https://divineshop.vn/Anh-SP-New/Tien/Anh SP/8.9/$15.png',	375000,	390000,	160,	48,	NULL,	'google-play-itune',	'2023-08-08 16:25:09',	NULL),
(589,	'iTunes Gift Card 2 USD (US)',	'https://cdn.divineshop.vn/image/catalog/Anh 1406/New/iTunes 2.png?hash=1624934987',	60000,	70000,	193,	83,	NULL,	'google-play-itune',	'2023-08-08 16:25:09',	NULL),
(590,	'Google Play Gift Card 5 USD (US)',	'https://divineshop.vn/Anh/Image 3203.png',	145000,	130000,	18,	5,	NULL,	'google-play-itune',	'2023-08-08 16:25:09',	NULL),
(591,	'iTunes Gift Card 30 USD (US)',	'https://cdn.divineshop.vn/image/catalog/Phi/iTunes 30-45299.png?hash=1689153709',	810000,	850000,	96,	29,	NULL,	'google-play-itune',	'2023-08-08 16:25:09',	NULL),
(593,	'Test',	'localhost:1234/file.filename',	20000,	NULL,	123,	0,	NULL,	'work',	'2023-08-11 14:21:16',	NULL),
(594,	'Test',	'localhost:1234/file.filename',	20000,	NULL,	123,	0,	NULL,	'work',	'2023-08-11 14:58:56',	NULL),
(595,	'Test',	'localhost:1234/1691766009109-104022430.jpg',	20000,	NULL,	123,	0,	NULL,	'work',	'2023-08-11 15:00:09',	NULL);

DROP TABLE IF EXISTS `itemInOrder`;
CREATE TABLE `itemInOrder` (
  `order_id` int NOT NULL,
  `item_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `iteminorder_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `iteminorder_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `status` enum('waiting-confirm','success','cancel') DEFAULT (_latin1'waiting-confirm'),
  `total` float NOT NULL,
  `discount` double NOT NULL,
  `note` varchar(500) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `access_token` varchar(500) NOT NULL,
  `refresh_token` varchar(500) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `session` (`session_id`, `user_id`, `access_token`, `refresh_token`, `created`, `updated`) VALUES
(5,	8,	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjgsImlhdCI6MTY5MTU4MzM5MiwiZXhwIjoxNjkxNjEyMTkyfQ.kFgOBaQUpqMQuV3tFmbpMXBSvdGVW0qEYJwO3LJdFVs',	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjgsImlhdCI6MTY5MTU4MzM5MiwiZXhwIjoxNjkyMTg4MTkyfQ.lDlpAMQrZ7BbQR2weI2FiRkTrdHEk0DmtbIpcjWVgAg',	'2023-08-09 12:16:33',	NULL),
(6,	9,	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjksImlhdCI6MTY5MTU5NDIwNCwiZXhwIjoxNjkxNjIzMDA0fQ.uZBooalfLG_CpVx8NlvmrCPP7Eoxdb87kAzr9vKG6eY',	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjksImlhdCI6MTY5MTU5NDIwNCwiZXhwIjoxNjkyMTk5MDA0fQ.QJ6JulBaUJFIEFfz2NOucyDUhCzKDvmHHOxXXiH3IzQ',	'2023-08-09 15:16:45',	NULL),
(7,	10,	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjEwLCJpYXQiOjE2OTE3NDQwNzcsImV4cCI6MTY5MTc3Mjg3N30.TuawLLWtgiT-KtNGOir0S4DrWKKadzIZPWkqFuKdAc0',	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInVzZXJfaWQiOjEwLCJpYXQiOjE2OTE3NDQwNzcsImV4cCI6MTY5MjM0ODg3N30.xLmO-fqKhxF2w7lt0_u8D-gqV44d8STd9ca1qZdv9pc',	'2023-08-11 08:54:37',	NULL),
(8,	10,	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkxNzQ0MjYxLCJleHAiOjE2OTE3NzMwNjF9.7iKRZjCYBGyyT8-6dLibNDupIxqU6U3zqJMy-m9gtpI',	'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkxNzQ0MjYxLCJleHAiOjE2OTIzNDkwNjF9.3q7M15D_NBmth-kYSs7NB2V5RgRkmmcVkVHR26RU7gA',	'2023-08-11 08:57:42',	NULL);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `point` int DEFAULT '0',
  `role` enum('admin','user') DEFAULT (_latin1'user'),
  `isActive` tinyint(1) DEFAULT '1',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `avatar`, `point`, `role`, `isActive`, `created`, `updated`) VALUES
(8,	'Chau Van Loc',	'19130121@st.hcmuaf.edu.vn',	'$2a$10$SzK4ZV8FyQvRh5ywqIqDueDQpntSAT2N3.td1PEMoHtpa7aH/Wz86',	NULL,	0,	'user',	1,	'2023-08-09 12:16:33',	NULL),
(9,	'Chau Van Loc',	'chauvanloc.tg@gmail.com',	'$2a$10$cyAoidarL.UtOhEt2FyldeCb//yt9AoEBncfH3caIEOAtMuRy4082',	NULL,	0,	'user',	1,	'2023-08-09 15:16:45',	NULL),
(10,	'Chau Van Loc',	'locchau.220401@gmail.com',	'$2a$10$8V9c2Q3hYRDzNiFp3.zd.uZdtmRQGv.MpEkZ3o/dVetrJ7uA2y8S2',	NULL,	0,	'admin',	1,	'2023-08-11 08:54:37',	NULL);

-- 2023-08-12 06:37:22
