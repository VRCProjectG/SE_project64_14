-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2022 at 08:52 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `se`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` varchar(11) NOT NULL,
  `Admin_pass` varchar(10) NOT NULL,
  `A_Name` varchar(20) NOT NULL,
  `A_Posittion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `Admin_pass`, `A_Name`, `A_Posittion`) VALUES
('1111', '1111', 'Name 1111', 'เจ้าหน้าที่'),
('111222', '111222', 'Name 111222', 'เจ้าหน้าที่'),
('1122', '1122', 'Name 1122', 'อาจารย์'),
('112233', '112233', 'Name 112233', 'อาจารย์'),
('4321', '4321', 'Name 4321', 'อาจารย์'),
('555', '555', 'Name 555', 'เจ้าหน้าที่'),
('7568', '12341234', 'โอม', 'เจ้าหน้าที่'),
('9846', '123456', 'นัน', 'อาจารย์');

-- --------------------------------------------------------

--
-- Table structure for table `final_intern`
--

CREATE TABLE `final_intern` (
  `Final_ID` int(11) NOT NULL,
  `nisit_ID` varchar(11) NOT NULL,
  `F_Status` varchar(30) NOT NULL DEFAULT 'นิสิตยังไม่ส่งเอกสารการฝึกงาน',
  `F_Descrip` varchar(30) NOT NULL DEFAULT '',
  `Up_Report` varchar(100) NOT NULL,
  `Up_Report2` varchar(100) NOT NULL,
  `Date_Report` date DEFAULT NULL,
  `Assist_Form` varchar(100) NOT NULL,
  `Remit_Form` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `final_intern`
--

INSERT INTO `final_intern` (`Final_ID`, `nisit_ID`, `F_Status`, `F_Descrip`, `Up_Report`, `Up_Report2`, `Date_Report`, `Assist_Form`, `Remit_Form`) VALUES
(15, '6220502167', 'ผ่าน', '', 'http://127.0.0.1:3001/file/6220504666-ธนพัฒน์-วงษ์ตั้งเจริญสุข.pdf', 'http://127.0.0.1:3001/file/New_Microsoft_Word_Document.pdf', '2022-03-25', 'http://127.0.0.1:3001/file/6220504666-ธนพัฒน์-วงษ์ตั้งเจริญสุข.pdf', 'http://127.0.0.1:3001/file/pdf-test.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `locationiternship`
--

CREATE TABLE `locationiternship` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `JobTitle` varchar(50) NOT NULL,
  `Amount` int(11) NOT NULL,
  `JobDescrip` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `locationiternship`
--

INSERT INTO `locationiternship` (`Id`, `Name`, `JobTitle`, `Amount`, `JobDescrip`) VALUES
(1, 'Drone Academy Thailand', 'Computer Programmer,Flying Robot, Internet of Thin', 5, 'Internet of Thing, Hardware, Electronic,Flying Robot, Drone , RaspberryPi, Nvidia Jetson TX'),
(2, 'บริษัท แวนเนส พลัส คอนซัลติ้ง จํากัด', 'Web Application and Mobile Application Developer T', 3, 'พัฒนา application สําหรับหน่วยงานโดยเริ่มต้นจากการออกแบบระบบ พัฒนาฐานข้อมูลเขียน application และทําการทดสอบระบบภายใต้งานฝ่ายบุคคล'),
(3, 'ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ', 'ผู้ช่วยปฏิบัติงานวิจัย', 6, 'พัฒนาโปรแกรมคอมพิวเตอร์และทดสอบ'),
(4, 'ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ', 'ผู้ช่วยวิจัย', 2, '- กํากับข้อมูลโรคข้าว - ทดสอบ Model Deep Learning'),
(5, 'บริษัท Chai - Aek Development System co. ltd', 'นักพัฒนาระบบ, นักวิเคราะห์ระบบ, นักทดสอบระบบ', 4, 'นักพัฒนาระบบ, นักวิเคราะห์ระบบ, นักทดสอบระบบ (รายละเอียดจะส่งเพิ่มเติมภายหลัง)'),
(6, 'International Computing And Networking Co.,Ltd', 'Network Engineering /Programmer', 2, 'Support team ในเรื่องการเขียน program อื่นๆที่ได้รับมอบหมาย'),
(7, 'กรมโยธาธิการและผังเมือง', 'Programmer/พัฒนาระบบฯ', 2, 'เขียนโปรแกรมระบบงานที่ได้รับมอบหมาย'),
(8, 'บริษัท Hyper Solution Co.,Ltd', 'programmer/network', 3, 'ช่วยเหลือหัวหน้างานในการแก้ไขปัญหา'),
(9, 'บริษัท โกไฟว์ จํากัด', 'Developer,System Analyst', 6, 'เขียนโปรแกรม ศึกษางานตามโปรเจคที่ได้รับมอบหมาย'),
(10, 'บริษัท คิว คิว (ประเทศไทย) จํากัด', 'Programmer', 3, 'coding/.net application/.net API ฯลฯ'),
(11, 'บริษัท จีโอทาเลนท์ จํากัด', 'Programmer', 1, 'เรียนรู้การทํางานของโปรแกรมเมอร์และฝึกเขียนโปรแกรม'),
(12, 'บริษัท ทีโอที จํากัด (มหาชน)', '-', 1, 'ติดตั้งสาย LAN, CONFIG ROUTER, CONFIG WIFI, ระบบ Network, งาน Solution'),
(13, 'บริษัท ทีโอที เอาท์ซอร์สซิ่ง เซอร์วิส จํากัด', 'นักคอมพิวเตอร์', 2, 'เขียนเว็บสมัครงาน,พัฒนาเว็บแอพของบริษัท'),
(14, 'บริษัท เทรคอน (เว็บไซต์) จํากัด', 'นักพัฒนาโปรแกรม | นักออกแบบระบบ', 3, 'พัฒนาโปรแกรมหรือออกแบบระบบ การวิเคราะห์ระบบและการจัดทําเอกสารวิเคราะห์หรือออกแบบระบบ'),
(16, 'บริษัท บิท โซลูชั่น จํากัด', 'Network Engineer', 3, 'ช่วยงานฝ่าย Engineer'),
(17, 'บริษัท มอสกี้ คอร์ปอเรชั่น จํากัด', 'Smart Farm, Programmer,Mobile Application', 5, 'เขียนโปรแกรมตามโปรเจคที่ได้รับมอบหมาย'),
(18, 'บริษัท กสิกร บิซิเนส-เทคโนโลยี กรุ๊ป เซเครเทเรียต ', 'Data Engineer', 2, '-'),
(19, 'บริษัท บางกอก แอสเซท อินเตอร์ กรุ๊ป จํากัด', 'นักศึกษาฝึกงานฝ่าย IT', 2, '-'),
(20, 'บริษัท ไอแอนด์ไอ กรุ๊ป จํากัด(มหาชน) สํานักงานใหญ่', 'QA (Software Tester)', 1, 'Test case, Software tester and other assign by superviso'),
(21, 'บริษัท จัสมิน อินเตอร์เนชั่นแนล จํากัด (มหาชน)', 'Front-End Developer', 4, '-'),
(22, 'บริษัท อินเทลเล็คท์ เน็ตเวิร์ค เว็บ จํากัด', 'Full Stack Developer', 2, '-'),
(23, 'บริษัท ลีดเดอร์แพลนเนท จํากัด', 'Power Platform Officer', 3, '-'),
(24, 'บริษัท เอ็ม ดี ซอฟต์ จํากัด', 'ผู้ช่วยโปรแกรมเมอร์', 1, '-'),
(25, 'บริษัท ซินเน็ค (ประเทศไทย) จํากัด(มหาชน)', 'Programmer,Engineer/Presale, Product Manger/Produc', 6, 'นักศึกษาฝึกงานประจําฝ่ายต่างๆ'),
(26, 'ธนาคารอาคารสงเคราะห์', 'พนักงานคอมพิวเตอร์', 1, 'ด้านเทคโนโลยีสารสนเทศ'),
(27, 'บริษัท โทรคมนาคมแห่งชาติ จํากัด(มหาชน)', 'วิศวกรรมคอมพิวเตอร์ / อิเล็กทรอนิกส์ และ IT', 5, 'แล้วแต่ผู้ควบคุมฝึกงานจะมอบหมายให้'),
(28, 'บริษัท อินทิเกรชัน มีชัวร์เม้นท์ โซลูชัน จํากัด', 'Web Develop', 1, 'Testing Web'),
(29, 'บริษัท แมงโก้ เทคโนโลยี จํากัด', 'โปรแกรมเมอร์ Support', 1, 'อัพเดจระบบของบริษัท'),
(30, 'บริษัท เดอเบล จํากัด', 'IT Support', 1, 'Installing and configuring computer hardware and application (Macbook & Windows PC/Laptop , Tablet , Mobile )'),
(31, 'บริษัท เมืองทองอุตสาหกรรมอาลูมีเนียม จํากัด', 'วิศวกรรมคอมพิวเตอร์', 2, 'ผู้ช่วยวิศวกร'),
(32, 'บริษัท อสมท จํากัด (มหาชน)', 'เทคโนโลยีสารสนเทศ', 5, 'Programming it support'),
(33, 'บริษัท อินโนเวทีฟ ซอฟต์แวร์ คอนซัลติ้ง จํากัด', '1. Software Engineer 2.Software Analyst', 5, 'บริษัทจะมีโครงงานจําลองให้นิสิตได้ฝึกเขียนโปรแกรมและออกแบบระบบตามความสามารถของนิสิตแต่ละคน'),
(34, 'ฝ่ายระบบโครงสร้างพื้นฐาน การไฟฟ้านครหลวง', 'วิศวกรคอมพิวเตอร์ / วิศวกรสื่อสาร / นักประมวลผลข้อ', 2, 'ระบบเครือข่าย / อุปกรณ์คอมพิวเตอร์ / ระบบความปลอดภัยและสื่ออิเล็กทรอนิกส์'),
(35, 'Leaderplanet Co., Ltd', 'ผู้พัฒนาระบบ (Programmer),ผู้ออกแบบระบบ (System An', 3, 'พัฒนาระบบงานร่วมกับพนักงานประจําของบริษัทโดยใช้ Technology ของ Microsoft, K2 workflow, AZURE, Logic APP and AZURE, Power Platformโดยเรียนรู้การทํางานของ Project ซึ่งบริษัทใช้ Methodology คือ ASAP โดย '),
(36, 'บมจ.ทรู คอร์ปอเรชั่น (สํานักงานภาคตะวันออก)', 'วิศวกรไฟฟ้า ,สื่อสาร', 2, 'ปฏิบัติการโครงข่าย'),
(37, 'Advanced Information Technology PCL', 'Network Engineer', 3, 'ศึกษาความรู้และโครงสร้างด้าน Network ที่เกี่ยวข้องกับแผนก / เข้าหน้างานเพื่อช่วยติดตั้งหรือบํารุงรักษาหรือแก้ไขปัญหาทางด้าน ระบบ Network ที่เกี่ยวข้องกับแผนก'),
(38, 'บริษัท Hyper Solution Co.,Ltd', 'programmer / network', 3, 'ช่วยเหลือหัวหน้างานในการแก้ไขปัญหา'),
(39, 'สํานักงานบริการลูกค้า กสท เกาะสมุย', 'ตําแหน่งวิศวกรงานด้านสื่อสารข้อมูลและดิจิตอล ระบบ ', 2, 'วิศวกรงานด้านสื่อสารข้อมูลและดิจิตอล ระบบ Network Layer1-7 ด้าน Network และโครงข่าย / งานด้านการเขียนโปรแกรม และงานนอกเหนือที่ได้รับมอบหมาย'),
(40, 'บริษัท บางกอกเว็บ โซลูชั่น', 'Programmer', 1, 'เขียนเว็บและงานที่ได้รับมอบหมายในแต่ละโปรเจ็ค'),
(41, 'บริษัท ศูนย์วิจัยทางการแพทย์อาชีวเวชศาสตร์ไทย จําก', 'Programmer', 2, 'การพัฒนาระบบให้แก่องค์กรณ์'),
(42, 'บริษัท 911 เอ็ดดูเคชั่น (ประเทศไทย) จํากัด', 'App developer', 1, 'พัฒนาโปรแกรม'),
(43, 'บริษัทฮ้อปคาร์ จํากัด', 'นักศึกษาฝึกงานฝ่ายเทคโนโลยี', 1, 'เขียนโปรแกรม mobile application โดยใช้ flutter, เขียนโปรแกรม c#. NET framework'),
(44, 'บริษัทซันร้อยแปดจํากัด', 'วิศวกร', 2, 'ออกแบบ PCB เขียนโปรแกรม controller'),
(45, 'บจก.บิสซิเนสอะไลฟ์', 'Full Stack Developer', 4, 'Research New Technology and Implement to Company Product');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `News_id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Content` varchar(300) NOT NULL,
  `Date_News` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`News_id`, `Title`, `Content`, `Date_News`) VALUES
(1, 'ประกาศวันส่งเอกสารฝึกงาน', 'ส่งเอกสารฝึกงานภายในวันที่ 1มี.ค.2565 - 25มี.ค.2565', '2022-03-23'),
(18, 'ทดสอบ', 'ทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบทดสอบ', '2022-03-24'),
(19, 'โดเนทให้ผมหน่อย', 'หกฟหฟกหฟกฟหก', '2022-03-25'),
(20, 'ทำโปรเจคก็ต้องมีโต้รุ่งกันบ้าง', 'T T', '2022-03-25');

-- --------------------------------------------------------

--
-- Table structure for table `nisit`
--

CREATE TABLE `nisit` (
  `Nisit_ID` varchar(11) NOT NULL,
  `NAME` varchar(20) NOT NULL,
  `Nisit_pass` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `nisit`
--

INSERT INTO `nisit` (`Nisit_ID`, `NAME`, `Nisit_pass`) VALUES
('1150', 'Name 1150', '1150'),
('123456', 'Name 123456', '123456'),
('191', 'Name 191', '191'),
('6220502167', 'พงศธร คำเล็ก', '12345678'),
('6220504704', 'ปณชัย แสงศิริ', '789456');

-- --------------------------------------------------------

--
-- Table structure for table `request1`
--

CREATE TABLE `request1` (
  `ID_Re` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Date_Re` date NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Facebook` varchar(50) NOT NULL,
  `LocationShip_ID` varchar(100) NOT NULL,
  `Position_ID` varchar(30) NOT NULL,
  `Location_ID` varchar(100) NOT NULL,
  `Name_LoShip` varchar(30) NOT NULL,
  `Posittion_LoShip` varchar(30) NOT NULL,
  `Collaborator_Name` varchar(30) NOT NULL,
  `Phone_Collab` varchar(30) NOT NULL,
  `Email_Collab` varchar(30) NOT NULL,
  `Date_Start` date NOT NULL,
  `Date_End` date NOT NULL,
  `Add_File` varchar(100) DEFAULT NULL,
  `Status_re` varchar(20) NOT NULL DEFAULT 'รอการอนุมัติ',
  `Descript` varchar(30) NOT NULL,
  `InternType` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `request1`
--

INSERT INTO `request1` (`ID_Re`, `Name`, `Date_Re`, `Phone`, `Facebook`, `LocationShip_ID`, `Position_ID`, `Location_ID`, `Name_LoShip`, `Posittion_LoShip`, `Collaborator_Name`, `Phone_Collab`, `Email_Collab`, `Date_Start`, `Date_End`, `Add_File`, `Status_re`, `Descript`, `InternType`) VALUES
(39, '6220502167', '2022-03-25', 'sdadsads', 'asdsadsad', 'sadsadas', 'sdadsa', 'adsdsad', 'asdasd', 'asddsad', 'sadsadasd', 'asddsadad', 'asddsadsad', '2022-03-28', '2022-03-21', 'http://127.0.0.1:3001/file/dummy.pdf', 'อนุมัติ', '', 'ฝึกงาน'),
(41, '6220504704', '2022-03-25', '', '', 'บริษัท บางกอก แอสเซท อินเตอร์ กรุ๊ป จํากัด', '', '', '', '', '', '', '', '2022-03-25', '2022-03-25', 'http://127.0.0.1:3001/file/', 'รอการอนุมัติ', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `upfile`
--

CREATE TABLE `upfile` (
  `IdUpFile` int(11) NOT NULL,
  `NameUpFile` varchar(50) NOT NULL,
  `LinkUpFile` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620;

--
-- Dumping data for table `upfile`
--

INSERT INTO `upfile` (`IdUpFile`, `NameUpFile`, `LinkUpFile`) VALUES
(7, 'Hello_world.pdf', 'http://127.0.0.1:3001/file/Hello_world.pdf'),
(8, 'Get_Started_With_Smallpdf.pdf', 'http://127.0.0.1:3001/file/Get_Started_With_Smallpdf.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`);

--
-- Indexes for table `final_intern`
--
ALTER TABLE `final_intern`
  ADD PRIMARY KEY (`Final_ID`),
  ADD KEY `nisit_ID` (`nisit_ID`);

--
-- Indexes for table `locationiternship`
--
ALTER TABLE `locationiternship`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`News_id`);

--
-- Indexes for table `nisit`
--
ALTER TABLE `nisit`
  ADD PRIMARY KEY (`Nisit_ID`);

--
-- Indexes for table `request1`
--
ALTER TABLE `request1`
  ADD PRIMARY KEY (`ID_Re`),
  ADD KEY `Name` (`Name`);

--
-- Indexes for table `upfile`
--
ALTER TABLE `upfile`
  ADD PRIMARY KEY (`IdUpFile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `final_intern`
--
ALTER TABLE `final_intern`
  MODIFY `Final_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `locationiternship`
--
ALTER TABLE `locationiternship`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `News_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `request1`
--
ALTER TABLE `request1`
  MODIFY `ID_Re` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `upfile`
--
ALTER TABLE `upfile`
  MODIFY `IdUpFile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `final_intern`
--
ALTER TABLE `final_intern`
  ADD CONSTRAINT `final_intern_ibfk_1` FOREIGN KEY (`nisit_ID`) REFERENCES `nisit` (`Nisit_ID`);

--
-- Constraints for table `request1`
--
ALTER TABLE `request1`
  ADD CONSTRAINT `request1_ibfk_1` FOREIGN KEY (`Name`) REFERENCES `nisit` (`Nisit_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
