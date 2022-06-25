-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: rms
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `username` varchar(200) NOT NULL,
  `passwordHash` varchar(500) NOT NULL,
  `id` int NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES ('aasim@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',55,'HoD-SSH'),('abrol@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',81,'prof'),('aman@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',40,'prof'),('amarjeet@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',4,'prof'),('anand@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',22,'prof'),('anands@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',17,'Head-Center for AI'),('angshul@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',11,'prof'),('anubha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',18,'prof'),('anuj@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',57,'ADIRD'),('anuradha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',25,'Chair-Academic Affairs Committee'),('arani@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',80,'prof'),('arjun@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',62,'prof'),('arunb@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',32,'Head-Center of Technology in Policing'),('ashish.pandey@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',49,'prof'),('bagler@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',24,'Assoc. Dean-Communication and Alumni Affairs'),('bapi@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',88,'prof'),('bose@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',53,'DoFA'),('dbera@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',5,'prof'),('debarka@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',34,'prof'),('debika@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',70,'prof'),('donghoon@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',9,'prof'),('gaurav.ahuja@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',63,'prof'),('gaurav@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',35,'prof'),('gayatri@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',74,'prof'),('gourab.ghatak@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',60,'prof'),('grace@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',61,'prof'),('jainendra@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',56,'Center Head - CDNM'),('jalote@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1,'prof'),('jaspreet@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',82,'prof'),('kanjilal@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',52,'prof'),('kaushik@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',44,'prof'),('koteswar@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',78,'prof'),('manohar.kumar@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',47,'prof'),('monika@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',51,'prof'),('mrinmoy@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',75,'prof'),('mshashmi@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',7,'Chair-PG Affairs'),('mukesh@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',66,'DIRD'),('mukulika@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',29,'prof'),('nishad@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',76,'prof'),('ojaswa@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',20,'prof'),('paro.mishra@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',59,'prof'),('parth@gmail.com','$2a$10$GGZwctIy7TUeiDT1dXK4Q.8Tw5L6tSe.wmCMuBaBpP/m3YwhObl62',11,'reviewer'),('parth20admin','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1005,'admin'),('parth20hod','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1003,'hod'),('parth20prof','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1001,'prof'),('parth20rev','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1,'reviewer'),('parthchhabra@gmail.com','$2a$10$IwO1jcbrYE9iyIMEaAsS8euYuPn7j8og7YmgwxHjgPoLFlFzc6dA2',9,'reviewer'),('parthchhabra20@gmail.com','$2a$10$37vNu8GmyoREEUnSJK8IN.owqnSTkOS4FkwsKeoZBZA3AkwB02Czm',6,'reviewer'),('parthchhabra200@gmail.com','$2a$10$zB6hBPassi1LFZOier1K6uKUoUBcBpd2PVzGJrb9qMO30nqLV1Bja',8,'reviewer'),('piyus@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',46,'prof'),('praveen@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',71,'prof'),('praveshb@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',19,'prof'),('psingh@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',3,'DoAA'),('purandare@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',16,'prof'),('raghava.mutharaju@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',54,'prof'),('raghava@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',36,'HoD-CB; Head-CCB'),('rajiv@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',12,'prof'),('rajivratn@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',28,'HoD-HCD'),('rakesh@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',41,'prof'),('ranjitha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',68,'prof'),('ratan.suri@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',37,'prof'),('richa.gupta@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',85,'prof'),('rinku@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',87,'prof'),('rkghosh@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',84,'prof'),('sambuddho@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',21,'prof'),('samrith@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',39,'prof'),('samuraisam01rev','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',2,'reviewer'),('samy.jain01@gmail.com','$2a$10$.2uh9wJ/83cJnkdh0sNRyuMER/vRawGuA9om0UJmOm6AhIpbl2TBS',18,'reviewer'),('samyak01doaa','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1004,'doaa'),('samyak01dofa','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1002,'dofa'),('samyakjain@gmail.com','$2a$10$.2fCrqy62L4HUYqZlbI4OeHXcS61VRQPvbfTT1MrTtSM4d.ha.nmC',10,'reviewer'),('sanat@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',42,'prof'),('sankha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',43,'HoD-Maths'),('sarthak01prof','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',1006,'prof'),('sarthakjohari01@gmail.com','$2a$10$hMs6LG75O6yasFaKgoqDv.BSbcMZLlinfkVHI0Nde0E5dU4.J468O',19,'reviewer'),('sarthok@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',33,'prof'),('satish@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',86,'prof'),('sayak@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',67,'prof'),('sayan@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',58,'prof'),('sdeb@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',10,'ADoSA'),('shad.akhtar@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',77,'prof'),('shilpak@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',50,'prof'),('shireen@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',72,'prof'),('shobha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',13,'HoD-ECE'),('sjohari08@gmail.com','$2a$10$JUwTW9r3m2S7znQLoawVJOl.wwT7AAj01mJiwTVUqZeIBByN0OIoG',20,'reviewer'),('skkaul@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',6,'ADoFA'),('smriti@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',73,'prof'),('sneh@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',26,'prof'),('sneha@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',48,'prof'),('sonia@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',64,'prof'),('souvik@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',69,'prof'),('sriramk@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',8,'prof'),('subhabrata@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',65,'prof'),('subhashree@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',79,'prof'),('subramanyam@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',14,'prof'),('sumit@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',23,'Chair-UG Affairs'),('syamantak@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',45,'prof'),('tammam@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',83,'prof'),('tanmoy@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',38,'prof'),('tavpriteshsethi@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',27,'prof'),('vibhor@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',31,'prof'),('vikram@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',2,'HoD-CSE'),('vivek.b@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',15,'prof'),('vivekk@iiitd.ac.in','$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2',30,'prof');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `middleName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `gender` varchar(20) NOT NULL,
  `doj` date NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `primaryDepartment` varchar(100) NOT NULL,
  `secondaryDepartment` varchar(100) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `researchAreas` varchar(300) DEFAULT NULL,
  `empId` varchar(10) DEFAULT NULL,
  `phd` varchar(100) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `leaveStartDate` date DEFAULT NULL,
  `leaveEndDate` date DEFAULT NULL,
  `natureOfLeave` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `facultyStatusCheck` CHECK ((`status` in (_utf8mb4'Active',_utf8mb4'Inactive',_utf8mb4'On Leave',_utf8mb4'On Sabbatical')))
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Pankaj','','Jalote','M','2008-08-29','jalote@iiitd.ac.in','','Distinguished Professor','CSE','undefined','undefined','Software Engineering, Fault Tolerance, Distributed Systems.','undefined','(PhD 1985),University of Illinois at Urbana Champaign, USA','On Sabbatical','2021-10-02','2021-10-24','Holiday'),(2,'Vikram','','Goyal','M','2009-04-24','vikram@iiitd.ac.in','','Professor','CSE','','HoD-CSE','Databases, Data Privacy and Security','2','(PhD 2009),IIT-Delhi','Active',NULL,NULL,NULL),(3,'Pushpendra','','Singh','M','2009-10-30','psingh@iiitd.ac.in','','Professor','CSE','undefined','undefined','Mobile Systems and Applications, Middleware, ICT for Development','undefined','(PhD 2004),Inria-Rennes, University de Rennes 1, France','On Sabbatical',NULL,NULL,NULL),(4,'Amarjeet','','Singh','M','2009-12-07','amarjeet@iiitd.ac.in','','Assistant Professor','CSE','undefined','undefined','Mobile Sensing, Approximation Algorithms, Environmental Monitoring, Low Cost Technologies.','undefined','(PhD 2009),University of California, Los Angeles, USA','On Sabbatical','2021-11-27','2022-02-26','Research'),(5,'Debajyoti','','Bera','M','2010-01-22','dbera@iiitd.ac.in','','Assistant Professor','CSE','undefined','undefined','computational complexity theory, quantum computing, randomized algorithms algorithms in computational biology, networking & data-mining, theoretical aspects of security & privacy','undefined','(PhD 2010),Boston University, USA','Active',NULL,NULL,NULL),(6,'Sanjit','Krishnan','Kaul','M','2011-10-27','skkaul@iiitd.ac.in','','Associate Professor','ECE','','ADoFA','Optimization of Wireless Networks, Enterprise 802.11 (WiFi) networks, Vehicular Networks, Anomalous activity detection using mobile phones.','23','(PhD 2011),Rutgers University, USA','Active',NULL,NULL,NULL),(7,'Mohammad','Shabi','Hashmi','M','2012-02-21','mshashmi@iiitd.ac.in','','Professor','ECE','','Chair-PG Affairs','Multi-band RF Circuits & Systems, PA Design and Linearization, Advanced RF Instrumentation, SI/PI and EMC Analysis','25','(PhD 2009),Cardiff University, UK','Active',NULL,NULL,NULL),(8,'Sriram','','K','M','2012-03-05','sriramk@iiitd.ac.in','','Associate Professor','CB','','','Systems biology, Cell division cycle, Circadian rhythms, Computational cognitive neuroscience.','26','(PhD 2004),Indian Institute of Technology- Madras','On Leave',NULL,NULL,NULL),(9,'Donghoon','','Chang','M','2012-06-15','donghoon@iiitd.ac.in','','Associate Professor','CSE','Math','','Cryptography, Cryptanalysis, Cyber Security, Information Theory','27','(PhD 2008),Information Management and Security, Korea University, Korea','Active',NULL,NULL,NULL),(10,'Sujay','','Deb','M','2012-06-25','sdeb@iiitd.ac.in','','Associate Professor','ECE','','ADoSA','Research Interests span the area of \"design of novel interconnect architectures for multi-core chips\". Specifically, it comprises analysis of Network-on-Chip(NoC) communication fabrics in presence of long range millimeter (mm)-wave wireless links','28','(PhD 2012),Washington State University','Active',NULL,NULL,NULL),(11,'Angshul','','Majumdar','M','2012-10-01','angshul@iiitd.ac.in','','Associate Professor','ECE','CSE','','Sparse Recovery, Low-rank matrix completion, Medical Imaging, Biomedical Signal Processing, Hyper-spectral Imaging, Collaborative Filtering.','31','(PhD 2012), University of British Columbia','Active',NULL,NULL,NULL),(12,'Rajiv','','Raman','M','2013-01-03','rajiv@iiitd.ac.in','','Associate Professor','CSE','Math','','Algorithms, Combinatorial Optimization, Graph Theory, discrete and computational geometry','33','(PhD 2007),Computer Science, University of Iowa, USA','Active',NULL,NULL,NULL),(13,'Shobha','Sundar','Ram','F','2013-01-18','shobha@iiitd.ac.in','','Associate Professor','ECE','','HoD-ECE','Conceptualize, model, design and test electromagnetic sensors for following applications 1. Through-wall radar sensing of humans 2. EMI based sensing of energy consumption in buildings 3. On-chip wireless interconnects','34','(PhD 2009),University of Texas at Austin','Active',NULL,NULL,NULL),(14,'Subramanyam','Ayalasomayajula','Venkata','M','2013-06-10','subramanyam@iiitd.ac.in','','Associate Professor','ECE','CSE','','Information Forensics and Security, Multimedia Signal Processing, Visual Surveillance and Deep Learning.','43','(PhD 2012),Nanyang Technological University, Singapore','Active',NULL,NULL,NULL),(15,'Vivek','Ashok','Bohara','M','2013-07-16','vivek.b@iiitd.ac.in','','Associate Professor','ECE','undefined','undefined','Cognitive Radio, Cooperative wireless communication and Digital Predistortion Techniques.','undefined','(PhD 2011),Nanyang Technological University (NTU), Singapore','Active',NULL,NULL,NULL),(16,'Rahul','','Purandare','M','2013-07-30','purandare@iiitd.ac.in','','Associate Professor','CSE','undefined','undefined','Software Engineering, Program Analysis, Runtime Verification, Specification Mining, Automatic Program Repair','undefined','(PhD 2011),University of Nebraska - Lincoln, USA','On Leave','2021-11-11','2021-11-20','Personal Reasons'),(17,'Saket','','Anand','M','2013-09-02','anands@iiitd.ac.in','','Associate Professor','ECE','','Head-Center for AI','Geometric Computer Vision, Semi-supervised learning, Robust methods, Scene understanding','40','(PhD 2013),Rutgers University, NJ, USA','Active',NULL,NULL,NULL),(18,'Anubha','','Gupta','F','2013-12-11','anubha@iiitd.ac.in','','Professor','ECE','','','Applications of Wavelet Transforms, Machine (Deep) Learning, and Compressed Sensing, Sparse Reconstruction, fMRI/EEG/MRI/DTI Signal and Image Processing, Genomics Signal Processing, Signal Processing for Communication Engineering,and RF Energy Harvesting','42','(PhD 2006),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(19,'Pravesh','','Biyani','M','2014-05-01','praveshb@iiitd.ac.in','','Associate Professor','ECE','','','Optimisation for signal processing and communications, machine learning, and transportation.','44','(PhD 2012),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(20,'Ojaswa','','Sharma','M','2014-06-02','ojaswa@iiitd.ac.in','','Associate Professor','CSE','undefined','undefined','Computer graphics, volume rendering, 3D reconstruction, High performance computing','undefined','(PhD 2010),Technical University of Denmark, Denmark','Inactive',NULL,NULL,NULL),(21,'Sambuddho','','Chakravarty','M','2014-06-02','sambuddho@iiitd.ac.in','','Assistant Professor','CSE','','','Network Anonymity and Privacy, Network Surveillance and Anti-Censorship and Network and Distributed Systems Security','46','(PhD 2014),Columbia University, USA','Active',NULL,NULL,NULL),(22,'Anand','','Srivastava','M','2014-11-24','anand@iiitd.ac.in','','Professor','ECE','','','Digital Communications, Wireless and Optical communications, Optical Networks','0119','(PhD 2009), University of California, Los Angeles, USA','Active',NULL,NULL,NULL),(23,'Sumit','Jagdish','Darak','M','2015-01-05','sumit@iiitd.ac.in','','Associate Professor','ECE','','Chair-UG Affairs','Intelligent, Reconfigurable and Self-sustainable wireless radio, Machine learning for wireless networks, Algorithms to architectures','50','(PhD 2013),Nanyang Technological University (NTU), Singapore','Active',NULL,NULL,NULL),(24,'Ganesh','Bhimmana','Bagler','M','2016-05-16','bagler@iiitd.ac.in','','Associate Professor','CB','','Assoc. Dean-Communication and Alumni Affairs','Complex Systems, Computational Biology, Complex Networks, Bioinformatics, Modeling and analysis of biological data','55','(PhD 2007),CSIR-Centre for Cellular and Molecular Biology','Active',NULL,NULL,NULL),(25,'Anuradha','','Sharma','F','2016-06-01','anuradha@iiitd.ac.in','','Professor','Math','','Chair-Academic Affairs Committee','Algebraic Coding Theory, Number Theory and Algebra.','56','PhD (2006), Panjab University, Chandigarh, India','Active',NULL,NULL,NULL),(26,'Sneh','','Saurabh','M','2016-06-15','sneh@iiitd.ac.in','','Associate Professor','ECE','','','Nanoelectronics, Exploratory Electronic Devices, Energy-Efficient Systems, VLSI Design and Verification and CAD for VLSI','58','(PhD 2012),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(27,'Tavpritesh','','Sethi','M','2016-08-01','tavpriteshsethi@iiitd.ac.in','','Associate Professor','CB','','','Big-data for clinical decision support, machine learning for critical care and community medicine, human physiology and Teaching Interests are Statistical, complex networks and machine learning modelling for medicine and biology, human physiology.','59','(PhD 2014),Institute of Genomics and Integrative Biology, Delhi','Active',NULL,NULL,NULL),(28,'Rajiv','Ratn','Shah','M','2016-11-30','rajivratn@iiitd.ac.in','','Assistant Professor','CSE','HCD','HoD-HCD','Multimedia, Natural Language Processing, Computer Vision, Machine Learning','66','(PhD 2016),National University of Singapore, Singapore','Active',NULL,NULL,NULL),(29,'Mukulika','','Maity','F','2016-11-30','mukulika@iiitd.ac.in','','Assistant Professor','CSE','','','wireless networks and mobile computing','60','(PhD 2016),IIT Bombay','Active',NULL,NULL,NULL),(30,'Vivek','','Kumar','M','2016-12-13','vivekk@iiitd.ac.in','','Assistant Professor','CSE','','','Parallel programming models and runtime systems, High performance computing','61','(PhD 2014),Research School of Computer Science, Australian National University','Active',NULL,NULL,NULL),(31,'Vibhor','','Kumar','M','2016-12-19','vibhor@iiitd.ac.in','','Associate Professor','CB','','','Genomics, Computational Biology and Statistical Signal Processing','63','(PhD 2007),Helsinki University of Technology (now Aalto), Finland','Active',NULL,NULL,NULL),(32,'Arun','Balaji','Buduru','M','2016-12-19','arunb@iiitd.ac.in','','Assistant Professor','CSE','','Head-Center of Technology in Policing','Cyber Security, Reinforcement Learning and IoT','62','(PhD 2016),Arizona State University, USA','Active',NULL,NULL,NULL),(33,'Sarthok','','Sircar','M','2017-01-04','sarthok@iiitd.ac.in','','Associate Professor','Math','','','Multiscale models and robust numerical algorithms for complex systems','64','(PhD 2009), University of South Carolina.','Active',NULL,NULL,NULL),(34,'Debarka','','Sengupta','M','2017-01-16','debarka@iiitd.ac.in','','Associate Professor','CB','CSE','','Computational genomics, Machine Learning','65','(PhD 2013),Jadavpur University','Active',NULL,NULL,NULL),(35,'Gaurav','','Arora','M','2017-01-19','gaurav@iiitd.ac.in','','Assistant Professor','SSH','','','Natural Resource & Agricultural Economics, Ecological Economics, Applied Econometrics, Industrial Organization, Applied Game Theory, Spatial Analyses, Remote Sensing','67','(PhD 2017),Iowa State University','Active',NULL,NULL,NULL),(36,'Gajendra Pal','Singh','Raghava','M','2017-02-01','raghava@iiitd.ac.in','','Professor','CB','','HoD-CB; Head-CCB','Bioinformatics Application on Protein Modelling/ Engineering, Genomics and Informatics Solutions for integrating Biology (GENESIS), Integrative approach for designing biomolecules for cancer therapy, Application of bioinformatics in System Biology','68','(PhD 1995),Institute of Microbial Technology, Chandigarh','Active',NULL,NULL,NULL),(37,'Venkata','Ratnadeep','Suri','M','2017-04-20','ratan.suri@iiitd.ac.in','','Assistant Professor','SSH','','','ICTs and Society, Information Literacy, Data Literacy, E-Health, M-health, Social media for Health','69','(PhD 2013),Indiana University, Bloomington, Indiana','Active',NULL,NULL,NULL),(38,'Tanmoy','','Chakraborty','M','2017-05-17','tanmoy@iiitd.ac.in','','Assistant Professor','CSE','','','Network Science, Data Mining and Data-driven Cybersecurity, Natural Language Processing','70','(PhD 2015),IIT Kharagpur','Active',NULL,NULL,NULL),(39,'Samrith','','Ram','M','2017-05-22','samrith@iiitd.ac.in','','Associate Professor','Math','','','Finite Fields and Combinatorics','71','(PhD 2012), IIT Bombay','Active',NULL,NULL,NULL),(40,'Aman','','Parnami','M','2017-06-05','aman@iiitd.ac.in','','Assistant Professor','HCD','','','Wearable Computing, Design Research, Education Technology','72','(PhD 2017),Georgia Institute of Technology, Atlanta','Active',NULL,NULL,NULL),(41,'Rakesh','','Chaturvedi','M','2017-06-30','rakesh@iiitd.ac.in','','Assistant Professor','SSH','','','Communication and Cooperation in Games, Political Economy and Market Design','74','(PhD 2015),Economics from Pennsylvania State University','Active',NULL,NULL,NULL),(42,'Sanat','Kumar','Biswas','M','2017-08-30','sanat@iiitd.ac.in','','Assistant Professor','ECE','','','Space vehicle guidance, navigation and control, orbit determination, GNSS-based navigation, non-linear dynamics and estimation algorithms','76','(PhD 2017),The University of New South Wales','Active',NULL,NULL,NULL),(43,'Sankha','Subhra','Basu','M','2017-09-20','sankha@iiitd.ac.in','','Assistant Professor','Math','','HoD-Maths','Mathematical Logic - intuitionistic logic and paraconsistent logics','77','(PhD 2013), The Pennsylvania State University','Active',NULL,NULL,NULL),(44,'Kaushik','','Kalyanaraman','M','2017-10-25','kaushik@iiitd.ac.in','','Assistant Professor','Math','','','Applied and Computational Analysis, Geometry and Topology','79','(PhD 2015), University of Illinois at Urbana-Champaign','Active',NULL,NULL,NULL),(45,'Syamantak','','Das','M','2018-01-01','syamantak@iiitd.ac.in','','Assistant Professor','CSE','','','Theoretical computer science and discrete optimization','80','(PhD 2015),IIT-Delhi','Active',NULL,NULL,NULL),(46,'Piyus','','Kedia','M','2018-03-01','piyus@iiitd.ac.in','','Assistant Professor','CSE','','','System security, safe languages, virtualization and dynamic/static techniques to build systems, Compilers and Operating Systems','81','(PhD 2018),IIT-Delhi','Active',NULL,NULL,NULL),(47,'Manohar','','Kumar','M','2018-03-19','manohar.kumar@iiitd.ac.in','','Assistant Professor','SSH','','','Ethics of digital dissent, digital citizenship, whistle blowing, civil disobedience, secrecy, and epistemic injustice.','82','(PhD 2013),Political Theory from LUISS University, Rome','Active',NULL,NULL,NULL),(48,'Sneha','','Chaubey','F','2018-05-01','sneha@iiitd.ac.in','','Assistant Professor','Math','','','Number theory, in particular analytic number theory, L-functions, distribution of sequences modulo one','83','(PhD 2017), University of Illinois at Urbana-Champaign (UIUC)','Active',NULL,NULL,NULL),(49,'Ashish','Kumar','Pandey','M','2018-05-01','ashish.pandey@iiitd.ac.in','','Assistant Professor','Math','','','Partial Differential Equations','84','(PhD 2018), The University of Illinois at Urbana-Champaign, USA.','Active',NULL,NULL,NULL),(50,'Shilpak','','Banerjee','M','2018-07-03','shilpak@iiitd.ac.in','','Assistant Professor','Math','','','Dynamical systems and ergodic theory','85','(PhD 2017), Pennsylvania State University','Active',NULL,NULL,NULL),(51,'Monika','','Arora','F','2018-07-10','monika@iiitd.ac.in','','Assistant Professor','Math','','','Count data and statistical modeling','86','(PhD 2018), Old Dominion University, Virginia, USA','Active',NULL,NULL,NULL),(52,'Kiriti','','Kanjilal','M','2018-07-16','kanjilal@iiitd.ac.in','','Assistant Professor','SSH','','','Microeconomics, game theory, industrial organization, environmental economics and behavioral economics','87','(PhD 2018),Economics at Washington State University','Active',NULL,NULL,NULL),(53,'Ranjan','','Bose','M','2018-08-29','bose@iiitd.ac.in','','Director and Professor','ECE','','DoFA','Secure communications, coding theory, 5G security, wireless security, physical layer security and broadband wireless access','89','(PhD 1995),University of Pennsylvania, Philadelphia, USA','Active',NULL,NULL,NULL),(54,'Vijaya','Raghava','Mutharaju','M','2018-09-10','raghava.mutharaju@iiitd.ac.in','','Assistant Professor','CSE','','','Knowledge Graphs/Semantic Web, Ontology modeling and reasoning, Linked Data, Big Data','90','(PhD 2016),Wright State University, Dayton, OH, USA','Active',NULL,NULL,NULL),(55,'Aasim','','Khan','M','2018-10-01','aasim@iiitd.ac.in','','Assistant Professor','SSH','','HoD-SSH','Digital Politics, Social Movements and Media, Public Policy','98','(PhD 2018),King\'s College, London','Active',NULL,NULL,NULL),(56,'Jainendra','','Shukla','M','2019-01-14','jainendra@iiitd.ac.in','','Assistant Professor','CSE','HCD','Center Head - CDNM','Human-Robot Interaction, Affective Computing and Machine Learning','91','(PhD 2018),Universitat Rovira i Virgili (URV), Spain','Active',NULL,NULL,NULL),(57,'Anuj','','Grover','M','2019-02-05','anuj@iiitd.ac.in','','Associate Professor','ECE','','ADIRD','Ultra Low Power In-Memory Compute for edge computing and machine learning applications; safety and security in hardware; and Error resilient energy efficient systems','92','(PhD 2015),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(58,'Sayan','Basu','Roy','M','2019-03-15','sayan@iiitd.ac.in','','Assistant Professor','ECE','','','Adaptive control for uncertain switched systems, online approximate optimal control using reinforcement learning based solutions, adaptive backstepping control','93','(PhD 2019),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(59,'Paro','','Mishra','F','2019-04-01','paro.mishra@iiitd.ac.in','','Assistant Professor','SSH','','','Demographic Anthropology, Family and Kinship, Transnationalism, Gender and Technology and Media Representation','94','(PhD 2017),Indian Institute of Technology-Delhi','Active',NULL,NULL,NULL),(60,'Gourab','','Ghatak','M','2019-04-02','gourab.ghatak@iiitd.ac.in','','Assistant Professor','ECE','','','Stochastic geometry, millimeter-wave communications, 5G network planning, and signal processing for 5G waveforms','95','(PhD 2019),CEA-LETI and Telecom ParisTech, France','Active',NULL,NULL,NULL),(61,'Grace','','Eden','F','2019-06-21','grace@iiitd.ac.in','','Assistant Professor','HCD','','','Human-Centred Robotics and Artificial Intelligence, Design Methodology, and Participatory Innovation of Emerging Technologies','96','(PhD 2012),University of Oxford','Active',NULL,NULL,NULL),(62,'Arjun','','Ray','M','2019-07-01','arjun@iiitd.ac.in','','Assistant Professor','CB','','','Deciphering the mechanism of CRISPR-Cas9, Elucidating molecular interactions in the reverse cholesterol pathway, Structural genomic problems','97','(PhD 2018), CSIR-IGIB','Active',NULL,NULL,NULL),(63,'Gaurav','','Ahuja','M','2019-07-25','gaurav.ahuja@iiitd.ac.in','','Assistant Professor','CB','','','Identification, deorphanization and characterization of ectopically expressed GPCRS','99','(PhD 2015), University of Cologne, Germany','Active',NULL,NULL,NULL),(64,'Sonia','Baloni','Ray','F','2019-07-31','sonia@iiitd.ac.in','','Assistant Professor','SSH','','','Role of attention in visual processing, studying mechanisms of emotion and motion perception','100','(PhD 2012), Georg August University, Goettingen, Germany','Active',NULL,NULL,NULL),(65,'Subhabrata','','Samajder','M','2019-08-05','subhabrata@iiitd.ac.in','','Assistant Professor','CSE','','','Symmetric-key Cryptanalysis, lattice-based cryptography, blockchains and random graphs','1001','(PhD 2017), Indian Statistical Institute, Kolkata','Active',NULL,NULL,NULL),(66,'Mukesh','','Mohania','M','2019-11-19','mukesh@iiitd.ac.in','','Professor','CSE','','DIRD','Information integration, Master data management, AI based entity analytics, big data analytics and applications, and blockchain data management','1002','(PhD 1995), Indian Institute of Technology - Bombay','Active',NULL,NULL,NULL),(67,'Sayak','','Bhattacharya','M','2019-12-02','sayak@iiitd.ac.in','','Assistant Professor','ECE','','','Ultra-thin and high-efficiency photovoltaics, Strong light-matter interaction in photonic crystals','1003','(PhD 2016), IIT Delhi','Active',NULL,NULL,NULL),(68,'Ranjitha','','Prasad','M','2019-12-02','ranjitha@iiitd.ac.in','','Assistant Professor','ECE','','','Causal Inference, Survival analysis, and sparsity in Bayesian neural networks','1004','(PhD 2015), Indian Institute of Science, Bangalore','Active',NULL,NULL,NULL),(69,'Souvik','','Dutta','M','2019-12-02','souvik@iiitd.ac.in','','Assistant Professor','SSH','','','Political economy, microfinance and economics of digital marketing','1005','(PhD 2014), Pennsylvania State University','Active',NULL,NULL,NULL),(70,'Debika','','Banerjee','F','2019-12-16','debika@iiitd.ac.in','','Assistant Professor','Math','','','Analytic and Probabilistic Number Theory','1006','(PhD 2017), Harish-Chandra Research Institute, Allahabad','Active',NULL,NULL,NULL),(71,'Praveen','','Priyadarshi','M','2019-12-16','praveen@iiitd.ac.in','','Assistant Professor','SSH','','','Distinctiveness of everyday political practices in new urban spaces','1007','(PhD 2018), London School of Economics and Political Science, London','Active',NULL,NULL,NULL),(72,'Shireen','','Mirza','F','2019-12-16','shireen@iiitd.ac.in','','Assistant Professor','SSH','','','Waste, Anthropocene; Climate Change; Sociology of Risk, Science, Technology & Society; Stigma and Contamination; Labour and Ritual Practices','1008','(PhD 2011), SOAS University of London, London','Active',NULL,NULL,NULL),(73,'Smriti','','Singh','F','2019-12-16','smriti@iiitd.ac.in','','Assistant Professor','SSH','','','Social Media, IT and Urban Middle Class, Virtual Community and Solidarity, Privacy, Surveillance and IT','1009','(PhD 2017), Jawaharlal Nehru University, New Delhi','Active',NULL,NULL,NULL),(74,'Gayatri','','Nair','F','2019-12-20','gayatri@iiitd.ac.in','','Assistant Professor','SSH','','','Urban informal labour and livelihood patterns with an emphasis on the question of technology, caste and gender','1010','(PhD 2016), Jawaharlal Nehru University, New Delhi','Active',NULL,NULL,NULL),(75,'Mrinmoy','','Chakrabarty','M','2019-12-20','mrinmoy@iiitd.ac.in','','Assistant Professor','SSH','','','Affective Cognitive Neuroscience, Visual-Spatial Cognition, Autism Spectrum Disorders, Learning-Memory','1011','(PhD 2017), Osaka University, Japan','Active',NULL,NULL,NULL),(76,'Nishad','','Patnaik','M','2019-12-23','nishad@iiitd.ac.in','','Assistant Professor','SSH','','','Kantian transcendental Idealism, Husserlian phenomenology, Social and Political Philosophy','1012','(PhD 2013), NSSR, New York, USA','Active',NULL,NULL,NULL),(77,'Md. Shad','','Akhtar','M','2020-01-03','shad.akhtar@iiitd.ac.in','','Assistant Professor','CSE','','','Sentiment and Emotion Analysis in the Natural Language Processing domain, Dialog Management and Multimodal Analysis.','1014','(PhD 2019), IIT Patna','Active',NULL,NULL,NULL),(78,'Koteswar','Rao','Jerripothula','M','2020-02-05','koteswar@iiitd.ac.in','','Assistant Professor','CSE','','','Joint image/video processing and applied AI','1015','(PhD 2017), Nanyang Technological University, Singapore','Active',NULL,NULL,NULL),(79,'Subhashree','','Mohapatra','F','2020-07-15','subhashree@iiitd.ac.in','','Assistant Professor','Math','','','High order schemes for numerical solution of partial differential equations, Optimal control theory, Parallel implementation of computational fluid dynamics related','1016','(PhD 2013), IIT Kanpur','Active',NULL,NULL,NULL),(80,'Arani','','Bhattacharya','M','2020-08-10','arani@iiitd.ac.in','','Assistant Professor','CSE','','','Low latency compute and machine learning services, video streaming and physical layer of wireless networks.','1018','(PhD 2019), Stony Brook University','Active',NULL,NULL,NULL),(81,'Vinayak','','Abrol','M','2021-01-01','abrol@iiitd.ac.in','','Assistant Professor','CSE','','','Modelling and coding, voice biometrics, pathological speech and audio categorization','1020','PhD (2018), IIT Mandi','Active',NULL,NULL,NULL),(82,'Jaspreet','Kaur','Dhanjal','F','2021-01-11','jaspreet@iiitd.ac.in','','Assistant Professor','CB','','','Cancer genomics, personalized medicine, drug design and discovery','1021','PhD (2019), IIT Delhi','Active',NULL,NULL,NULL),(83,'Tammam','','Tillo','M','2021-01-18','tammam@iiitd.ac.in','','Professor','ECE','','','Convolutional Neural Networks for some image processing tasks','1022','PhD (2005), Politecnico di Torino, Italy','Active',NULL,NULL,NULL),(84,'Ram','Krishna','Ghosh','M','2021-07-15','rkghosh@iiitd.ac.in','','Assistant Professor','ECE','','','Computational nanoelectronics, spintronics, quantum transport simulation, device modeling, materials modeling, and multiscale modeling','1023','PhD (2013), Indian Institute of Science, Bangalore','Active',NULL,NULL,NULL),(85,'Richa','','Gupta','F','2021-07-15','richa.gupta@iiitd.ac.in','','Assistant Professor','HCD','','','Perceptual foundations of Design, Inclusive Design and Accessibility, Product Design & Modern Prototyping','1024','PhD (2020), IIT Delhi','Active',NULL,NULL,NULL),(86,'Satish','Kumar','Pandey','M','2021-07-15','satish@iiitd.ac.in','','Assistant Professor','Math','','','Functional Analysis, Operator Theory, Operator Algebras','1025','PhD (2018), University of Waterloo, Canada','Active',NULL,NULL,NULL),(87,'Rinku','Mahendrakumar','Shah','F','2021-07-15','rinku@iiitd.ac.in','','Assistant Professor','CSE','','','Software-Defined Networking, Data plane programming, 4G/5G mobile networks','1026','PhD (2021), IIT Bombay','Active',NULL,NULL,NULL),(88,'Bapi','','Chatterjee','M','2021-08-02','bapi@iiitd.ac.in','','Assistant Professor','CSE','','','Distributed Machine Learning, Concurrent Data Structures, Neural Architecture Search, and Learned Index Structures.','1027','PhD (2018), Chalmers University of Technology, Gothenburg, Sweden','Active',NULL,NULL,NULL),(1001,'Parth_prof','','Chhabra','Male','2001-08-14','parth19069@iiitd.ac.in','9999988888','Assistant Professor','CSE','ECE','prof','Quantum physics',NULL,NULL,'Active',NULL,NULL,NULL),(1002,'Samyak_dofa','Kumar','Jain','Male','2001-06-28','samyak19098@iiitd.ac.in','0987654321','Professor','C','D','dofa','',NULL,NULL,'Active',NULL,NULL,NULL),(1003,'Parth_hod','','Chhabra','Male','2001-01-14','parth19069@iiitd.ac.in','1234567890','Professor','CSE','D','HoD-CSE','',NULL,NULL,'Active',NULL,NULL,NULL),(1004,'Samyak_doaa','Kumar','Jain','Male','2001-06-28','samyak19098@iiitd.ac.in','0987654321','Professor','CSE','ECE','doaa','ML','undefined','IIT Delhi','On Leave','2021-11-06','2021-11-12','On leave'),(1005,'Parth_admin','','Chhabra','Male','2001-08-14','parth19069@iiitd.ac.in','1234567890','Professor','CSE','ECE','admin','null','undefined','null','On Sabbatical','2021-11-18','2021-11-30','Sick'),(1006,'Sarthak_prof','Pratap','Johari','Male','2001-05-08','sarthak19099@iiitd.ac.in','1212121212','Professor','MTH','ECE','prof','null','undefined','null','Active',NULL,NULL,NULL);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultyGrade`
--

DROP TABLE IF EXISTS `facultyGrade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultyGrade` (
  `facultyId` int NOT NULL,
  `year` int NOT NULL,
  `grade` json DEFAULT NULL,
  PRIMARY KEY (`facultyId`,`year`),
  CONSTRAINT `facultyGrade_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultyGrade`
--

LOCK TABLES `facultyGrade` WRITE;
/*!40000 ALTER TABLE `facultyGrade` DISABLE KEYS */;
INSERT INTO `facultyGrade` VALUES (1001,2021,'{\"remark\": \"Nicely done\", \"research\": \"5\", \"services\": \"3\", \"teaching\": \"4\", \"facultyId\": 1001, \"yearOfReport\": 2021}'),(1003,2021,'{\"remark\": \"Well done\", \"research\": \"1\", \"services\": \"3\", \"teaching\": \"2\", \"facultyId\": 1003, \"yearOfReport\": 2021}'),(1006,2021,'{\"remark\": \"Awesome\", \"research\": \"1\", \"services\": \"3\", \"teaching\": \"2\", \"facultyId\": 1006, \"yearOfReport\": \"2021\"}');
/*!40000 ALTER TABLE `facultyGrade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internalReviews`
--

DROP TABLE IF EXISTS `internalReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internalReviews` (
  `reportId` int NOT NULL,
  `reviewerId` int NOT NULL,
  `reviewDate` date DEFAULT NULL,
  `reviewStatus` varchar(20) NOT NULL,
  `reviewData` json DEFAULT NULL,
  PRIMARY KEY (`reportId`,`reviewerId`),
  KEY `reviewerId` (`reviewerId`),
  CONSTRAINT `internalReviews_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`),
  CONSTRAINT `internalReviews_ibfk_2` FOREIGN KEY (`reviewerId`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internalReviews`
--

LOCK TABLES `internalReviews` WRITE;
/*!40000 ALTER TABLE `internalReviews` DISABLE KEYS */;
INSERT INTO `internalReviews` VALUES (1,2,NULL,'Pending',NULL),(1,13,NULL,'Pending',NULL),(1,1001,NULL,'pending',NULL),(1,1003,NULL,'reviewed','{\"services\": \"5\", \"teaching\": \"1\", \"finalGrade\": \"3\", \"servicesRemark\": \"Very good services\", \"teachingRemark\": \"Very bad prof\", \"finalInternalRemark\": \"You can definitely do better. Good luck for future endeavours\"}'),(2,2,NULL,'Pending',NULL),(2,1003,NULL,'Pending',NULL),(3,2,NULL,'Pending',NULL),(3,1004,NULL,'reviewed','{\"services\": \"1\", \"teaching\": \"1\", \"finalGrade\": \"3\", \"servicesRemark\": \"Very Poor\", \"teachingRemark\": \"Poor\", \"finalInternalRemark\": \"Terrible\"}'),(5,2,NULL,'Pending',NULL),(6,2,NULL,'Pending',NULL),(7,2,NULL,'Pending',NULL),(8,2,NULL,'Pending',NULL),(9,3,NULL,'Pending',NULL),(9,1004,NULL,'reviewed','{\"teaching\": \"1\", \"dofaRemark\": \"Well done!\", \"instituteService\": \"1\", \"professionalService\": \"5\"}'),(10,3,NULL,'Pending',NULL),(10,1004,NULL,'Pending',NULL);
/*!40000 ALTER TABLE `internalReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facultyId` int NOT NULL,
  `submissionDate` varchar(4) NOT NULL,
  `generatedFileName` varchar(200) NOT NULL,
  `fileName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`facultyId`,`submissionDate`),
  UNIQUE KEY `fileName` (`generatedFileName`),
  UNIQUE KEY `generatedFileName` (`generatedFileName`),
  KEY `facultyId` (`facultyId`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,1001,'2021','report5SHY30f3e230d02eaecb4df5f071979fb4628c4eaa1cb38d552401f9.pdf','report5.pdf'),(2,1006,'2021','Sarthak_ReportSHYbcaf4da4e2c10244bf24f39fdaea9279e2f50c61f00d1d0d8c1d.pdf','Sarthak_Report.pdf'),(3,1003,'2021','Parth_HOD_ReportSHY04cf9b270855b7760fae1b5d9c0b004690d10cf875ba3f210af9.pdf','Parth_HOD_Report.pdf'),(4,1001,'2020','report6SHYe22115acc2e03a295714f5c8f0b12d4012ed1d55a50c1fe2d911.pdf','report6.pdf'),(6,1006,'2020','report6SHY4dfa47d9f17597fbbe42200e5070a8a12b39d69175632afe7ad1.pdf','report6.pdf');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewer`
--

DROP TABLE IF EXISTS `reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `middleName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `primaryDepartment` varchar(100) DEFAULT NULL,
  `researchAreas` varchar(300) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `organization` varchar(200) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `leaveStartDate` date DEFAULT NULL,
  `leaveEndDate` date DEFAULT NULL,
  `natureOfLeave` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `status` CHECK ((`status` in (_utf8mb4'Active',_utf8mb4'Inactive',_utf8mb4'On Leave',_utf8mb4'On Sabbatical')))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewer`
--

LOCK TABLES `reviewer` WRITE;
/*!40000 ALTER TABLE `reviewer` DISABLE KEYS */;
INSERT INTO `reviewer` VALUES (1,'Parth_rev','','','M','parth20rev','8700300000','CSE','ML','Assistant Professor','Harvard','Active','2021-11-15','2022-05-21','Personal'),(2,'Samyak_rev','Kumar','Jain','M','samuraisam01rev','1234567890','CSE','CN','Professor','Stanford','Active',NULL,NULL,NULL),(3,'Sarthak_rev','null','Johari','M','sarthak19099@iiitd.ac.in','9582919388','CSE','null','HOD','IIIT Delhi','On Sabbatical',NULL,NULL,NULL),(4,'Aryan_rev','Singh',NULL,'F','aryans@bits.com','9191512345','ECE',NULL,'Distinguished Prof','BITS','Active',NULL,NULL,NULL),(5,'Moksh_rev',NULL,NULL,'M','moksh@nitk.ac.in','1234567890','Civil',NULL,'Professor','IIT Bombay','Active',NULL,NULL,NULL),(6,'Prakash_rev','null','null','null','parthchhabra20@gmail.com','null','null','null','null','IIT Delhi','Inactive','2021-11-01','2021-11-11','KO'),(7,'Prakhar_rev','null','null','null','parthchhabra20@gmail.com','null','null','null','null','IIT Delhi','On Sabbatical',NULL,NULL,NULL),(8,'Pranay_rev',NULL,NULL,NULL,'parthchhabra200@gmail.com',NULL,NULL,NULL,NULL,'IIT Delhi','Active',NULL,NULL,NULL),(9,'Prachi_rev',NULL,NULL,NULL,'parthchhabra@gmail.com',NULL,NULL,NULL,NULL,'IIT Delhi','Active',NULL,NULL,NULL),(10,'Samyak_rev','null','null','null','samyakjain@gmail.com','null','null','null','null','IIT Delhi','On Leave','2021-11-12','2021-12-25','trial again'),(11,'Pragya_rev',NULL,NULL,NULL,'parth@gmail.com',NULL,NULL,NULL,NULL,'IIT Delhi','Active',NULL,NULL,NULL),(17,'ParthCh_rev',NULL,NULL,NULL,'parthchhabra20@gmail.com',NULL,NULL,NULL,NULL,'IIT Delhi',NULL,NULL,NULL,NULL),(18,'Samy_rev',NULL,NULL,NULL,'samy.jain01@gmail.com',NULL,NULL,NULL,NULL,'IIT Delhi',NULL,NULL,NULL,NULL),(19,'Sarthak',NULL,NULL,NULL,'sarthakjohari01@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'Sarthak',NULL,NULL,NULL,'sjohari08@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Sanjit',NULL,NULL,NULL,'skkaul@iiitd.ac.in',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `reviewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reportId` int NOT NULL,
  `reviewerId` int NOT NULL,
  `reviewDate` date DEFAULT NULL,
  `reviewStatus` varchar(20) NOT NULL,
  `reviewData` json DEFAULT NULL,
  PRIMARY KEY (`reportId`,`reviewerId`),
  KEY `reviewerId` (`reviewerId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewerId`) REFERENCES `reviewer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,1,NULL,'reviewed','{\"funding\": \"1\", \"patents\": \"5\", \"publication\": \"3\", \"fundingRemark\": \"Excellent\", \"patentsREmark\": \"\", \"patentsRemark\": \"Bad\", \"entrepreneurship\": \"1\", \"publicationRemark\": \"Good\", \"finalReviewerRemark\": \"Nice\", \"entrepreneurshipRemark\": \"Wow\"}');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-03 21:24:24
