const { PrismaClient, Prisma } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
const axios = require("axios");

const entertamain = [
  {
    item_name:
      "Tài Khoản Netflix Premium 1 tháng - Xem phim chất lượng 4k và Full HD",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-thang-23298.jpg?hash=1658829694",
    price: "89.000đ",
    priceBeforeDiscount: "260.000đ",
  },
  {
    item_name: "Gói gia hạn Spotify Premium 01 năm",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Spotify/Divine-Shop-Goi-Gia-Han-Spotify-1-Nam-40567.jpg?hash=1658742748",
    price: "299.000đ",
    priceBeforeDiscount: "590.000đ",
  },
  {
    item_name: "Gia hạn YouTube Premium + YouTube Music (6 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/YOUTUBE NO ADS 6 THANG.png?hash=1623646577",
    price: "259.000đ",
    priceBeforeDiscount: "3.360.000đ",
  },
  {
    item_name: "Tài khoản Netflix Premium for 1 User (6 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-6-Thang-86374.jpg?hash=1658743297",
    price: "509.000đ",
    priceBeforeDiscount: "1.560.000đ",
  },
  {
    item_name: "Tài khoản Netflix Premium for 1 User (1 Tuần)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-Tuan-69361-50093.jpg?hash=1683164358",
    price: "29.000đ",
    priceBeforeDiscount: "65.000đ",
  },
  {
    item_name: "Kích hoạt Youtube Premium trên TV  (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/YoutubeTV 12 thang-59767.jpg?hash=1672460434",
    price: "119.000đ",
    priceBeforeDiscount: "479.000đ",
  },
  {
    item_name: "Kích hoạt Youtube Premium trên TV  (6 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/YoutubeTV 6 thang-97844.jpg?hash=1672460446",
    price: "49.000đ",
    priceBeforeDiscount: "239.000đ",
  },
  {
    item_name: "Tài khoản Calm Premium (3 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Calm Premium 3 months-20865.jpg?hash=1680830478",
    price: "49.000đ",
    priceBeforeDiscount: "2.350.000đ",
  },
  {
    item_name: "Tài khoản Calm Premium (Vĩnh viễn)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Calm Premium tài khoản-59689.jpg?hash=1690016145",
    price: "690.000đ",
    priceBeforeDiscount: "4.600.000đ",
  },
  {
    item_name: "Gói gia hạn Spotify Premium 6 tháng (Tặng 6 tháng Free)",
    image:
      "https://divineshop.vn/catalog/Anh/Banner 14 thang 11/Gói gia hạn 6 tháng.png",
    price: "159.000đ",
    priceBeforeDiscount: "590.000đ",
  },
  {
    item_name: "Tài khoản nghe nhạc Spotify Premium  (1 tháng)",
    image:
      "https://divineshop.vn/catalog/Anh/Banner 14 thang 11/Tài khoản nghe nhạc 1 tháng.png",
    price: "25.000đ",
    priceBeforeDiscount: "59.000đ",
  },
  {
    item_name: "Gia hạn YouTube Premium + YouTube Music (1 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/YOUTUBE NO ADS 1 THANG.png?hash=1623646532",
    price: "35.000đ",
    priceBeforeDiscount: "280.000đ",
  },
  {
    item_name: "Gia hạn Youtube Premium (2 Tháng)",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/youtube-pre.png",
    price: "75.000đ",
    priceBeforeDiscount: "560.000đ",
  },
  {
    item_name: "Tài khoản Youtube Premium tạo sẵn (4 tháng)",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/youtube-pre.png",
    price: "99.000đ",
    priceBeforeDiscount: "1.100.000đ",
  },
  {
    item_name: "Tài khoản nghe nhạc Spotify Premium (4 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Spotify 4 thang-22647.png?hash=1633517415",
    price: "79.000đ",
    priceBeforeDiscount: "236.000đ",
  },
  {
    item_name: "Tài khoản nghe nhạc Deezer HiFi (1 Tháng)",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/8.9/deezer Hifi.jpg",
    price: "19.000đ",
    priceBeforeDiscount: "288.000đ",
  },
  {
    item_name: "Tài khoản nghe nhạc Tidal HiFi Plus (1 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/Tidal HiFi1406.png?hash=1623645407",
    price: "19.000đ",
    priceBeforeDiscount: "550.000đ",
  },
  {
    item_name: "Tài khoản Netflix Premium for 1 User (1 Ngày)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-Ngay-25533.jpg?hash=1658743234",
    price: "9.000đ",
    priceBeforeDiscount: "15.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "entertainment",
  };
});

const work = [
  {
    item_name: "Windows 10 Professional CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Zoom/Divine-Shop-Nang-cap-Zoom-Pro-1-thang-80331.jpg?hash=1658975559",
    price: "290.000đ",
    priceBeforeDiscount: "400.000đ",
  },
  {
    item_name: "Discord Nitro 3 tháng (Đăng kí lần đầu)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Discord Nitro 3 thang-71170.jpg?hash=1672370038",
    price: "165.000đ",
    priceBeforeDiscount: "690.000đ",
  },
  {
    item_name: "Tài khoản Canva 1 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Canvas 1 thang-21944.png?hash=1648182315",
    price: "25.000đ",
    priceBeforeDiscount: "150.000đ",
  },
  {
    item_name: "Tài khoản OpenAI - ChatGPT (Có sẵn 5$)",
    image:
      "https://cdn.divineshop.vn/image/catalog/OpenAI - ChatGPT-37620.jpg?hash=1672200973",
    price: "99.000đ",
    priceBeforeDiscount: "200.000đ",
  },
  {
    item_name: "Tài khoản Doodly  Standard vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-Doodly-Standard-Vinh-Vien-47767.jpg?hash=1658741969",
    price: "599.000đ",
    priceBeforeDiscount: "4.800.000đ",
  },
  {
    item_name: "Key bản quyền diệt virus Malwarebytes vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-Malwarebytes-Vinh-Vien-51870.jpg?hash=1658743003",
    price: "599.000đ",
    priceBeforeDiscount: "1.500.000đ",
  },
  {
    item_name: "Tài khoản Doodly  Enterprise vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/Doodly Enterprise.png?hash=1623645349",
    price: "990.000đ",
    priceBeforeDiscount: "6.800.000đ",
  },
  {
    item_name: "Tài khoản Doodly  Rainbow + Enterprise vĩnh viễn",
    image:
      "https://divineshop.vn/catalog/Anh/Banner/8618c1d70d9f396837ddd503ceed004f.jpg",
    price: "1.790.000đ",
    priceBeforeDiscount: "8.800.000đ",
  },
  {
    item_name: "Gói nâng cấp tài khoản LastPass Premium ( 1 năm )",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-Do-LastPass-Premium-1-Nam-22011.jpg?hash=1658742956",
    price: "399.000đ",
    priceBeforeDiscount: "799.000đ",
  },
  {
    item_name: "Microsoft Office 2021 Professional Plus for Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Office2021-49955.jpg?hash=1677051637",
    price: "690.000đ",
    priceBeforeDiscount: "11.500.000đ",
  },
  {
    item_name: "Gói nâng cấp Turnitin (1 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 1 tháng-97360.png?hash=1657644418",
    price: "249.000đ",
    priceBeforeDiscount: "399.000đ",
  },
  {
    item_name: "Gói nâng cấp Turnitin (6 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 6 tháng-31152.png?hash=1657644418",
    price: "629.000đ",
    priceBeforeDiscount: "839.000đ",
  },
  {
    item_name: "Gói nâng cấp Turnitin (12 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 12 tháng-77817.png?hash=1657644421",
    price: "799.000đ",
    priceBeforeDiscount: "1.190.000đ",
  },
  {
    item_name: "Gói nâng cấp Turnitin (3 Tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Turnitin 3 tháng-97801.png?hash=1657644418",
    price: "419.000đ",
    priceBeforeDiscount: "599.000đ",
  },
  {
    item_name: "Windows 10 Education CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Education-64566.png?hash=1653303175",
    price: "250.000đ",
    priceBeforeDiscount: "600.000đ",
  },
  {
    item_name: "Tài khoản Premium Freepik 6 tháng (1 Thiết bị)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Freepik 1 thiết bị-28732.jpg?hash=1670468529",
    price: "300.000đ",
    priceBeforeDiscount: "900.000đ",
  },
  {
    item_name: "Tài khoản Hotspot Shield VPN (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Hotspot Shield VPN-66817.jpg?hash=1663982198",
    price: "249.000đ",
    priceBeforeDiscount: "2.200.000đ",
  },
  {
    item_name: "360 Total Security Premium (1 năm / 3 PC)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoSecurity Premium-752012-18143.jpg?hash=1689736122",
    price: "249.000đ",
    priceBeforeDiscount: "532.000đ",
  },
  {
    item_name: "Tài khoản Notion Pro vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Notion Pro-96609-24916-25370.jpg?hash=1687925337",
    price: "190.000đ",
    priceBeforeDiscount: "1.280.000đ",
  },
  {
    item_name:
      "Tài khoản Wondershare Filmora 12 (vĩnh viễn) - Hệ điều hành Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Filmora win 12-74182.jpg?hash=1674012209",
    price: "490.000đ",
    priceBeforeDiscount: "1.900.000đ",
  },
  {
    item_name: "Code gia hạn XSplit Premium 12 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/XSplit Premium 12 tháng-91315.png?hash=1647941712",
    price: "399.000đ",
    priceBeforeDiscount: "1.720.000đ",
  },
  {
    item_name: "Nâng cấp LinkedIn Premium Business (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoLinkedin Premium 1 year-23390.jpg?hash=1673497172",
    price: "1.390.000đ",
    priceBeforeDiscount: "16.000.000đ",
  },
  {
    item_name: "Windows 10 Home DSP OEI DVD (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Home-41796.png?hash=1654096664",
    price: "2.100.000đ",
    priceBeforeDiscount: "4.000.000đ",
  },
  {
    item_name: "Key McAfee Livesafe (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/MCAFEE LIVESAFE Unlimited-86734.jpg?hash=1666941282",
    price: "499.000đ",
    priceBeforeDiscount: "1.000.000đ",
  },
  {
    item_name:
      "Tài khoản Wondershare Filmora 12 (1 năm) - Hệ điều hành Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Filmora 12 win-1nam-83016.jpg?hash=1672115168",
    price: "199.000đ",
    priceBeforeDiscount: "900.000đ",
  },
  {
    item_name: "Nâng cấp LinkedIn Premium Career (6 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Linkedin Premium Career-18813.jpg?hash=1682473435",
    price: "690.000đ",
    priceBeforeDiscount: "4.200.000đ",
  },
  {
    item_name: "Gói gia hạn Dropbox Plus 2TB  - 5 thành viên (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 2tb-75243.jpg?hash=1677770783",
    price: "790.000đ",
    priceBeforeDiscount: "4.500.000đ",
  },
  {
    item_name: "Gói gia hạn Dropbox Professional 3TB (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 3tb-44296.jpg?hash=1677770755",
    price: "890.000đ",
    priceBeforeDiscount: "4.500.000đ",
  },
  {
    item_name:
      "Tài khoản Wondershare Filmora 12 (vĩnh viễn) - Hệ điều hành MacOS",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Filmora12vv-97558.jpg?hash=1674011366",
    price: "490.000đ",
    priceBeforeDiscount: "1.900.000đ",
  },
  {
    item_name: "Tài khoản Wondershare Filmora 12 (1 năm) - Hệ điều hành Mac",
    image:
      "https://cdn.divineshop.vn/image/catalog/Filmora 12 mac-1nam-61924.jpg?hash=1672115158",
    price: "199.000đ",
    priceBeforeDiscount: "900.000đ",
  },
  {
    item_name: "Tài khoản Blinkist Premium (1 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Blinkist 1 thang-96348.jpg?hash=1673404091",
    price: "109.000đ",
    priceBeforeDiscount: "350.000đ",
  },
  {
    item_name: "Nâng cấp 1Password 1 năm",
    image:
      "https://cdn.divineshop.vn/image/catalog/1Password-62076.jpg?hash=1665114403",
    price: "390.000đ",
    priceBeforeDiscount: "860.000đ",
  },
  {
    item_name: "Tài khoản GoHighLevel Agency Unlimited (1 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/GoHighLevel-94156.jpg?hash=1682050306",
    price: "99.000đ",
    priceBeforeDiscount: "12.500.000đ",
  },
  {
    item_name: "Nâng cấp Parallels Desktop Pro Edition (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Parallels Desktop 18 pro-52998.jpg?hash=1684548563",
    price: "990.000đ",
    priceBeforeDiscount: "2.700.000đ",
  },
  {
    item_name: "Nâng cấp Parallels Desktop 18 Standard Edition (Vĩnh Viễn)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Parallels Desktop 18-52300.jpg?hash=1684548596",
    price: "990.000đ",
    priceBeforeDiscount: "2.400.000đ",
  },
  {
    item_name:
      "Combo Đĩa Windows 11 Pro + Đĩa Office Home & Business 2019 (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 2-68403.jpg?hash=1689071040",
    price: "5.990.000đ",
    priceBeforeDiscount: "10.700.000đ",
  },
  {
    item_name:
      "Combo Đĩa Windows 10 Pro + Đĩa Office Home & Business 2019 (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 1-48449.jpg?hash=1689071030",
    price: "5.990.000đ",
    priceBeforeDiscount: "10.700.000đ",
  },
  {
    item_name: "Discord Nitro 1 Tháng",
    image: "https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitro.png",
    price: "89.000đ",
    priceBeforeDiscount: "250.000đ",
  },
  {
    item_name: "Discord Nitro 1 Tháng (Classic)",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitroclassic.png",
    price: "56.000đ",
    priceBeforeDiscount: "125.000đ",
  },
  {
    item_name: "Gói gia hạn Canva 1 năm",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Divine-Shop-DoDivine-Shop-Canva-1-Nam-44514.jpg?hash=1658741770",
    price: "300.000đ",
    priceBeforeDiscount: "1.500.000đ",
  },
  {
    item_name: "Nâng cấp Tài khoản Zoom Pro 2 tháng",
    image: "https://divineshop.vn/catalog/Anh-SP-New/Garena/zoom-2-thang.png",
    price: "360.000đ",
    priceBeforeDiscount: "700.000đ",
  },
  {
    item_name: "Nâng cấp Tài khoản Zoom Pro 1 tháng (300 thành viên)",
    image: "https://divineshop.vn/catalog/Anh/1 tháng.png",
    price: "320.000đ",
    priceBeforeDiscount: "400.000đ",
  },
  {
    item_name: "Discord Nitro 1 Năm",
    image: "https://divineshop.vn/catalog/Anh-SP-New/Tien/discordnitro.png",
    price: "690.000đ",
    priceBeforeDiscount: "3.000.000đ",
  },
  {
    item_name: "Tài khoản Pngtree Premium (Vĩnh viễn)",
    image: "https://divineshop.vn/catalog/Hung2021/Pngtree vĩnh viễn.png",
    price: "4.560.000đ",
    priceBeforeDiscount: "5.230.000đ",
  },
  {
    item_name: "Tài khoản Premium Freepik 1 năm",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/8.9/freepik-1-nam-ver2.png",
    price: "850.000đ",
    priceBeforeDiscount: "1.500.000đ",
  },
  {
    item_name: "Tài khoản Envato Elements 1 tháng",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/photo_2020-05-23_11-39-35.jpg",
    price: "190.000đ",
    priceBeforeDiscount: "380.000đ",
  },
  {
    item_name: "Tài khoản Pngtree Premium (1 năm)",
    image: "https://divineshop.vn/catalog/Hung2021/Pngtree 1 năm.png",
    price: "390.000đ",
    priceBeforeDiscount: "4.120.000đ",
  },
  {
    item_name: "Tài khoản Evernote Premium (6 tháng)",
    image: "https://divineshop.vn/catalog/Sỹ Hải/Evernote.png",
    price: "290.000đ",
    priceBeforeDiscount: "1.990.000đ",
  },
  {
    item_name: "Discord Nitro 1 Năm (Basic)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Discord Nitro 1 nam classic-70787.jpg?hash=1672370019",
    price: "320.000đ",
    priceBeforeDiscount: "1.400.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "work",
  };
});

const learn = [
  {
    item_name: "Tài khoản OpenAI - ChatGPT (Có sẵn 5$)",
    image:
      "https://cdn.divineshop.vn/image/catalog/OpenAI - ChatGPT-37620.jpg?hash=1672200973",
    price: "99.000đ",
    priceBeforeDiscount: "200.000đ",
  },
  {
    item_name: "Tài khoản Grammarly Premium 7 ngày",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/Grammarly Premium 7 ngay.png?hash=1623645470",
    price: "15.000đ",
    priceBeforeDiscount: "30.000đ",
  },
  {
    item_name: "Tài khoản Grammarly Premium 15 ngày",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/Grammarly Premium 15 ngay.png?hash=1623645514",
    price: "29.000đ",
    priceBeforeDiscount: "40.000đ",
  },
  {
    item_name: "Tài khoản học ngoại ngữ Busuu Premium Plus 1 năm",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Busuu Premium Plus.png?hash=1623641387",
    price: "490.000đ",
    priceBeforeDiscount: "2.190.000đ",
  },
  {
    item_name: "Tài khoản Lynda Premium vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Lynda (LinkedIn Learning).png?hash=1623640222",
    price: "290.000đ",
    priceBeforeDiscount: "1.500.000đ",
  },
  {
    item_name: "Tài khoản Hello Chinese Premium 1 năm",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Hello Chinese Premium-48788.jpg?hash=1678413000",
    price: "550.000đ",
    priceBeforeDiscount: "1.280.000đ",
  },
  {
    item_name: "Tài khoản Datacamp Premium 3 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Datacamp-52631.jpg?hash=1673317992",
    price: "199.000đ",
    priceBeforeDiscount: "750.000đ",
  },
  {
    item_name:
      "Nâng cấp ứng dụng lập trình JetBrains All Products Pack (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/JetBrains1-81956.jpg?hash=1671761607",
    price: "490.000đ",
    priceBeforeDiscount: "6.900.000đ",
  },
  {
    item_name: "Tài khoản Mate Translate vĩnh viễn",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Mate Translate-60991.jpg?hash=1674890917",
    price: "99.000đ",
    priceBeforeDiscount: "1.500.000đ",
  },
  {
    item_name: "Gói gia hạn Duolingo 1 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Duolingo gia han-23597.jpg?hash=1678671180",
    price: "29.000đ",
    priceBeforeDiscount: "150.000đ",
  },
  {
    item_name: "Nâng cấp Super Chinese (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Super Chinese Nâng cấp-69084.jpg?hash=1682071132",
    price: "790.000đ",
    priceBeforeDiscount: "1.350.000đ",
  },
  {
    item_name: "Tài khoản Treehouse Courses Plus (6 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Treehouse Courses Plus-81504.jpg?hash=1676079049",
    price: "190.000đ",
    priceBeforeDiscount: "1.200.000đ",
  },
  {
    item_name: "Tài khoản Blinkist Premium (1 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Blinkist 1 thang-96348.jpg?hash=1673404091",
    price: "109.000đ",
    priceBeforeDiscount: "350.000đ",
  },
  {
    item_name: "Tài khoản Ginger Premium (6 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Ginger Premium-57276.jpg?hash=1675133293",
    price: "390.000đ",
    priceBeforeDiscount: "2.000.000đ",
  },
  {
    item_name: "Tài khoản Duolingo 1 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Duolingo tai khoan 1m-90573.jpg?hash=1680491435",
    price: "19.000đ",
    priceBeforeDiscount: "150.000đ",
  },
  {
    item_name: "Gói gia hạn Duolingo 2 tháng",
    image:
      "https://cdn.divineshop.vn/image/catalog/Duolingo gia hạn 2 tháng-26499.jpg?hash=1684220480",
    price: "49.000đ",
    priceBeforeDiscount: "400.000đ",
  },
  {
    item_name: "Tài khoản Ginger Premium (1 tháng)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Ginger Premium 1m-65848.jpg?hash=1689133157",
    price: "59.000đ",
    priceBeforeDiscount: "600.000đ",
  },
  {
    item_name: "Tài khoản học Ngoại Ngữ Cambly ( 25 phút )",
    image:
      "https://cdn.divineshop.vn/image/catalog/Cambly 25-22900.jpg?hash=1689758775",
    price: "39.000đ",
    priceBeforeDiscount: "200.000đ",
  },
  {
    item_name: "Tài khoản học Ngoại Ngữ Cambly ( 70 phút )",
    image:
      "https://cdn.divineshop.vn/image/catalog/Cambly 70-15808.jpg?hash=1689758817",
    price: "99.000đ",
    priceBeforeDiscount: "500.000đ",
  },
  {
    item_name: "Tài khoản học ngoại ngữ Duolingo 1 năm",
    image:
      "https://divineshop.vn/catalog/Anh-SP-New/Tien/Anh SP/26.3/duolingo.png",
    price: "190.000đ",
    priceBeforeDiscount: "300.000đ",
  },
  {
    item_name: "Tài khoản học Ngoại Ngữ Cambly ( 30 phút )",
    image:
      "https://cdn.divineshop.vn/image/catalog/Cambly 30-51509.jpg?hash=1689758799",
    price: "49.000đ",
    priceBeforeDiscount: "125.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "learn",
  };
});
const game_steam = [
  {
    item_name: "Random Code Steam",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Banner/Random Code Steam.png?hash=1623754090",
    price: "9.000đ",
    priceBeforeDiscount: "20.000đ",
  },
  {
    item_name: "Elden Ring (CD Key Steam)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-Elden-Ring-82335.jpg?hash=1658742026",
    price: "790.000đ",
    priceBeforeDiscount: "800.000đ",
  },
  {
    item_name: "Code Roblox Raven Hunter Hood - Tower Defense Simulator",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New…tower-defense-simulator-44997.png?hash=1668952190",
    price: "12.000đ",
    priceBeforeDiscount: "99.000đ",
  },
  {
    item_name: "Tài khoản Grand Theft Auto V: Premium Edition (GTA 5)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Divine-Shop-GTA-V19-92008.jpg?hash=1658822638",
    price: "250.000đ",
    priceBeforeDiscount: "459.000đ",
  },
  {
    item_name: "Random Code Steam Legendary",
    image:
      "https://cdn.divineshop.vn/image/catalog/Random Code Steam Legendary-78055.png?hash=1650017306",
    price: "60.000đ",
    priceBeforeDiscount: "150.000đ",
  },
  {
    item_name: "Tài khoản Battlefield 4 (EA)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Tien/Anh SP/7.7/tài khoản BF4.png?hash=1626925143",
    price: "79.000đ",
    priceBeforeDiscount: "500.000đ",
  },
  {
    item_name: "Assassin's Creed® Origins - Gold Edition",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/582160/header.jpg",
    price: "1.485.000đ",
    priceBeforeDiscount: "1.405.000đ",
  },
  {
    item_name: "Pacify",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/967050/header.jpg",
    price: "49.000đ",
    priceBeforeDiscount: "70.000đ",
  },
  {
    item_name: "Fly Simulator",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/655790/header.jpg",
    price: "9.000đ",
    priceBeforeDiscount: "30.000đ",
  },
  {
    item_name: "Conan Exiles (CD KEY)",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/440900/header.jpg",
    price: "299.000đ",
    priceBeforeDiscount: "319.000đ",
  },
  {
    item_name: "BioShock: The Collection ",
    image: "https://steamcdn-a.akamaihd.net/steam/subs/127633/header.jpg",
    price: "1.000.000đ",
    priceBeforeDiscount: "946.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "game_steam",
  };
});
const ea_games = [
  {
    item_name: "Battlefield 1",
    image: "https://divineshop.vn/catalog/Anh-SP-New/bf1.png",
    price: "519.000đ",
    priceBeforeDiscount: "1.200.000đ",
  },
  {
    item_name: "Battlefield 1 Revolution (EA)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/bf1 revo.png?hash=1604888770",
    price: "590.000đ",
    priceBeforeDiscount: "1.000.000đ",
  },
  {
    item_name: "Titanfall™ 2 (EA)",
    image:
      "https://cdn.divineshop.vn/image/catalog/origin/t-460x215.jpg?hash=1604888771",
    price: "540.000đ",
    priceBeforeDiscount: "1.250.000đ",
  },
  {
    item_name: "Battlefield 4 Premium Edition",
    image: "https://divineshop.vn/catalog/wallet/maxresdefault-1-4-460x215.jpg",
    price: "890.000đ",
    priceBeforeDiscount: "1.110.000đ",
  },
  {
    item_name: "Dragon Age™: Inquisition",
    image:
      "https://divineshop.vn/catalog/thẻ điện thoại/dfsdfwefwefsdvsdvsdfewf-460x215.jpg",
    price: "520.000đ",
    priceBeforeDiscount: "470.000đ",
  },
  {
    item_name: "Anthem Legion of Dawn Edition",
    image: "https://divineshop.vn/catalog/Anh-san-pham/candy/Image 972.png",
    price: "1.750.000đ",
    priceBeforeDiscount: "2.300.000đ",
  },
  {
    item_name: "Battlefield 3 Premium Edition",
    image: "https://divineshop.vn/catalog/origin/b3pe_hero-460x215.jpg",
    price: "1.050.000đ",
    priceBeforeDiscount: "800.000đ",
  },
  {
    item_name: "Titanfall™ 2 Ultimate Edition",
    image: "https://divineshop.vn/catalog/Anh-san-pham/t-460x215.jpg",
    price: "759.000đ",
    priceBeforeDiscount: "700.000đ",
  },
  {
    item_name: "Tài Khoản Battlefield 1 (EA)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/bf1.png?hash=1604888770",
    price: "79.000đ",
    priceBeforeDiscount: "570.000đ",
  },
  {
    item_name: "It Takes Two (Origin)",
    image: "https://divineshop.vn/catalog/Hung2021/ittaketwo.jpeg",
    price: "750.000đ",
    priceBeforeDiscount: "1.200.000đ",
  },
  {
    item_name: "The Sims™ 4 EVERYDAY SIMS BUNDLE (EA)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh/Image 3199.png?hash=1604888769",
    price: "779.000đ",
    priceBeforeDiscount: "980.000đ",
  },
  {
    item_name: "Apex Legends  - 1000 Apex Coins",
    image: "https://divineshop.vn/catalog/Anh-san-pham/candy/1000.png",
    price: "270.000đ",
    priceBeforeDiscount: "360.000đ",
  },
  {
    item_name: "Apex Legends  - 2000 (+150 Bonus) Apex Coins",
    image: "https://divineshop.vn/catalog/Anh-san-pham/candy/2000.png",
    price: "529.000đ",
    priceBeforeDiscount: "700.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "ea_games",
  };
});
const window_office = [
  {
    item_name: "Windows 10 Professional CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-shop-windows-10-pro-55555.jpg?hash=1658743921",
    price: "290.000đ",
    priceBeforeDiscount: "400.000đ",
  },
  {
    item_name: "Windows 11 Professional CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-11-Pro-222-15362.jpg?hash=1678241365",
    price: "290.000đ",
    priceBeforeDiscount: "400.000đ",
  },
  {
    item_name: "Microsoft Office 2021 Professional Plus for Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Khác/Office2021-49955.jpg?hash=1677051637",
    price: "690.000đ",
    priceBeforeDiscount: "11.500.000đ",
  },
  {
    item_name: "Microsoft Office 2019 Professional Plus for Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2019-Professional-Plus-For-Windows-45649.jpg?hash=1658743103",
    price: "590.000đ",
    priceBeforeDiscount: "9.500.000đ",
  },
  {
    item_name: "Gói nâng cấp Office 365 1 năm (1TB)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Goi-Nang-Cap-Office-365-1-Nam-84521.jpg?hash=1658742827",
    price: "249.000đ",
    priceBeforeDiscount: "1.299.000đ",
  },
  {
    item_name: "Windows 10 Professional DSP OEI DVD (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-10-Professional-Full-VAT-24044.jpg?hash=1658743951",
    price: "2.490.000đ",
    priceBeforeDiscount: "4.000.000đ",
  },
  {
    item_name: "Office Home & Business 2019 English APAC EM (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Office-Home-20682.jpg?hash=1658743343",
    price: "3.900.000đ",
    priceBeforeDiscount: "6.699.000đ",
  },
  {
    item_name: "Microsoft Office 2021 Home & Business for MAC",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2021-Professional-Plus-For-Mac-59098.jpg?hash=1658743145",
    price: "790.000đ",
    priceBeforeDiscount: "11.500.000đ",
  },
  {
    item_name: "Microsoft Office 2019 Home & Business for MAC",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Office/Divine-Shop-Microsoft-Office-2019-Professional-Plus-For-Mac-31336.jpg?hash=1658743080",
    price: "790.000đ",
    priceBeforeDiscount: "9.500.000đ",
  },
  {
    item_name: "Windows 10 Education CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Education-64566.png?hash=1653303175",
    price: "250.000đ",
    priceBeforeDiscount: "600.000đ",
  },
  {
    item_name: "Windows 11 Education CD Key",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Windows 11 Education-79694.png?hash=1653577714",
    price: "250.000đ",
    priceBeforeDiscount: "600.000đ",
  },
  {
    item_name: "Windows 11 Professional DSP OEI DVD (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP/Windows/Divine-Shop-Windows-11-Professional-Full-VAT-63622.jpg?hash=1658744020",
    price: "2.490.000đ",
    priceBeforeDiscount: "4.000.000đ",
  },
  {
    item_name: "Windows 10 Home DSP OEI DVD (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/Windows 10 Home-41796.png?hash=1654096664",
    price: "2.100.000đ",
    priceBeforeDiscount: "4.000.000đ",
  },
  {
    item_name: "Microsoft Office 2016 Home & Business for MAC",
    image:
      "https://cdn.divineshop.vn/image/catalog/Divine-Shop-Microsoft-Office-2016-Professional-Plus-For-Mac-59098-35016.jpg?hash=1673603466",
    price: "649.000đ",
    priceBeforeDiscount: "11.500.000đ",
  },
  {
    item_name: "Microsoft Office 2016 Professional Plus for Windows",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Tien/window/Divine-Shop-Microsoft-Office-2016-Professional-Plus-For-Windows-45649-21195.jpg?hash=1673606784",
    price: "390.000đ",
    priceBeforeDiscount: "9.500.000đ",
  },
  {
    item_name:
      "Combo Đĩa Windows 11 Pro + Đĩa Office Home & Business 2019 (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 2-68403.jpg?hash=1689071040",
    price: "5.990.000đ",
    priceBeforeDiscount: "10.700.000đ",
  },
  {
    item_name:
      "Combo Đĩa Windows 10 Pro + Đĩa Office Home & Business 2019 (Full VAT)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/Combo 1-48449.jpg?hash=1689071030",
    price: "5.990.000đ",
    priceBeforeDiscount: "10.700.000đ",
  },
  {
    item_name: "Gói nâng cấp Office 365  4 năm (1TB) ",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Office 365 4 năm-70143.jpg?hash=1677397342",
    price: "890.000đ",
    priceBeforeDiscount: "5.199.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "window_office",
  };
});
const google_drive = [
  {
    item_name: "Tài khoản Google Drive 500GB (Vĩnh viễn)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Google Drive 500gb-29699.png?hash=1658458874",
    price: "359.000đ",
    priceBeforeDiscount: "3.450.000đ",
  },
  {
    item_name: "Tài khoản Google Drive 200GB (Vĩnh viễn)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Google Drive 200gb-76400.png?hash=1658458725",
    price: "169.000đ",
    priceBeforeDiscount: "1.380.000đ",
  },
  {
    item_name: "Gói gia hạn Google One 400GB (1 năm) - 1 thành viên",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 400gb-33548.png?hash=1658822521",
    price: "390.000đ",
    priceBeforeDiscount: "1.380.000đ",
  },
  {
    item_name: "Gói gia hạn Google One 100GB (1 năm) - 5 thành viên",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 100gb-28238.png?hash=1658822520",
    price: "229.000đ",
    priceBeforeDiscount: "450.000đ",
  },
  {
    item_name: "Tài khoản Google Drive 100GB (Vĩnh viễn)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Google Drive 100gb-15361.png?hash=1658458775",
    price: "99.000đ",
    priceBeforeDiscount: "900.000đ",
  },
  {
    item_name: "Gói gia hạn Google One 2TB (1 năm) - 5 thành viên",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-san-pham/Google One 2tb-33536.png?hash=1658823087",
    price: "1.190.000đ",
    priceBeforeDiscount: "2.250.000đ",
  },
  {
    item_name: "Gói gia hạn Dropbox Plus 2TB  - 5 thành viên (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 2tb-75243.jpg?hash=1677770783",
    price: "790.000đ",
    priceBeforeDiscount: "4.500.000đ",
  },
  {
    item_name: "Gói gia hạn Dropbox Professional 3TB (1 năm)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/hung/new/Dropbox 3tb-44296.jpg?hash=1677770755",
    price: "890.000đ",
    priceBeforeDiscount: "4.500.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "google_drive",
  };
});
const steam_wallet = [
  {
    item_name: "Steam Wallet Code 200 TWD (~149.600 VNĐ)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/STEAM 200 TWD.png?hash=1622879197",
    price: "164.000đ",
    priceBeforeDiscount: "170.000đ",
  },
  {
    item_name: "Gói nạp Steam Wallet 20$ ( Nạp chậm ) (~475.340 VNĐ)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 20us.png?hash=1622879501",
    price: "470.000đ",
    priceBeforeDiscount: "500.000đ",
  },
  {
    item_name: "Gói nạp Steam Wallet 50$ ( Nạp chậm ) (~1.188.700 VNĐ)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 50usd.png?hash=1622879000",
    price: "1.175.000đ",
    priceBeforeDiscount: "1.300.000đ",
  },
  {
    item_name: "Gói nạp Steam Wallet 100$ ( Nạp chậm ) (~2.376.700 VNĐ)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh-SP-New/Steam wallet new/GOI NAP STEAM 100.png?hash=1622878183",
    price: "2.350.000đ",
    priceBeforeDiscount: "2.500.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "steam_wallet",
  };
});
const google_play_itune = [
  {
    item_name: "XBox - Microsoft Gift Card 15$ (US)",
    image: "https://divineshop.vn/Anh-SP-New/Tien/Anh SP/8.9/$15.png",
    price: "375.000đ",
    priceBeforeDiscount: "390.000đ",
  },
  {
    item_name: "iTunes Gift Card 2 USD (US)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Anh 1406/New/iTunes 2.png?hash=1624934987",
    price: "60.000đ",
    priceBeforeDiscount: "70.000đ",
  },
  {
    item_name: "Google Play Gift Card 5 USD (US)",
    image: "https://divineshop.vn/Anh/Image 3203.png",
    price: "145.000đ",
    priceBeforeDiscount: "130.000đ",
  },
  {
    item_name: "iTunes Gift Card 30 USD (US)",
    image:
      "https://cdn.divineshop.vn/image/catalog/Phi/iTunes 30-45299.png?hash=1689153709",
    price: "810.000đ",
    priceBeforeDiscount: "850.000đ",
  },
].map((e) => {
  return {
    ...e,
    category: "google_play_itune",
  };
});
async function convert() {
  const result = await Promise.all(
    [
      ...entertamain,
      ...work,
      ...learn,
      ...game_steam,
      ...ea_games,
      ...window_office,
      ...google_drive,
      ...steam_wallet,
      ...google_play_itune,
    ].map(async (e) => {
      try {
        const quantity = Math.floor(Math.random() * 200);
        await axios.get(e.image);
        return {
          ...e,
          item_id: uuidv4(),
          price: Number(e.price.replaceAll("đ", "").replaceAll(".", "")),
          priceBeforeDiscount: Number(
            e.priceBeforeDiscount.replaceAll("đ", "").replaceAll(".", "")
          ),
          quantity,
          sold: Math.floor(Math.random() * quantity),
        };
      } catch (error) {}
    })
  );
  await prisma.item.createMany({
    data: result,
  });
}
// console.log(convert());

async function deleteSession() {
  await prisma.session.deleteMany();
}

deleteSession();
