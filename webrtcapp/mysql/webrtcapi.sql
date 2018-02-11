-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: localhost    Database: webrtcapi
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `webrtcapi`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `webrtcapi` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `webrtcapi`;

--
-- Table structure for table `relation`
--

DROP TABLE IF EXISTS `relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usr1_id` int(11) unsigned NOT NULL,
  `usr2_id` int(11) unsigned NOT NULL,
  `status1` int(2) unsigned NOT NULL,
  `status2` int(2) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation`
--

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` VALUES (1,17,12,2,2),(2,16,17,0,3),(3,18,17,2,2),(4,16,18,0,1),(5,16,12,2,2),(12,17,28,0,1);
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `login` varchar(30) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'name','$2a$10$xhYKagL52p5/2FteBDBNSuKmOVE1c5sZCz0c3QduhY6gdUOFJE5fa','login','ROLE_USER'),(16,'qwe','$2a$10$O5u3.N03HgPNUM43g8l0a.e1rHgx2aDIfMS/QU9fqPsHZf8lUTgdS','qwe','ROLE_USER'),(17,'asd','$2a$10$q2Yl9n1QZvCYlCp9XwhwPuX3/LI0f69J.oJTO8RmQm4VVBTym3YTe','asd','ROLE_USER'),(18,'zxc','$2a$10$Cc.p2TEbXf9F4BwFMXOg9u5nvLo7Vcg/1KyhELxH23JMTCro7DXGi','zxc','ROLE_USER'),(26,'dd','$2a$10$S5a1ylqdtstHQ41HOFr9TOVB3FwyCjVKmbjjauVJp7Difo6ctqePi','dd','ROLE_USER'),(28,'qaz','$2a$10$OG.rqABO1vHiEUgS.XxeDOFZWrPCcaoB9fvlel9rJ.bhIK5ACsi2W','qaz','ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-26 15:24:53
