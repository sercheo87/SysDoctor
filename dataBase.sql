-- MySQL dump 10.13  Distrib 5.5.38, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dbsysdoctor
-- ------------------------------------------------------
-- Server version	5.5.38-0ubuntu0.14.04.1

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
-- Table structure for table `tbcity`
--

DROP TABLE IF EXISTS `tbcity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbcity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` float DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbcity`
--

LOCK TABLES `tbcity` WRITE;
/*!40000 ALTER TABLE `tbcity` DISABLE KEYS */;
INSERT INTO `tbcity` VALUES (1,2,'Quito'),(2,2,'Portoviejo'),(3,2,'Guayas');
/*!40000 ALTER TABLE `tbcity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbcivilstatus`
--

DROP TABLE IF EXISTS `tbcivilstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbcivilstatus` (
  `id` float NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbcivilstatus`
--

LOCK TABLES `tbcivilstatus` WRITE;
/*!40000 ALTER TABLE `tbcivilstatus` DISABLE KEYS */;
INSERT INTO `tbcivilstatus` VALUES (1,'Casado'),(2,'Soltero'),(3,'Viudo'),(4,'Divorciado'),(5,'Union Libre'),(6,'Otro');
/*!40000 ALTER TABLE `tbcivilstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbcountry`
--

DROP TABLE IF EXISTS `tbcountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbcountry` (
  `id` float NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbcountry`
--

LOCK TABLES `tbcountry` WRITE;
/*!40000 ALTER TABLE `tbcountry` DISABLE KEYS */;
INSERT INTO `tbcountry` VALUES (1,'Colombia'),(2,'Ecuador'),(3,'Chile'),(4,'Argentina'),(5,'Peru'),(6,'Mexico');
/*!40000 ALTER TABLE `tbcountry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbdiet_detail`
--

DROP TABLE IF EXISTS `tbdiet_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbdiet_detail` (
  `id_diet_detail` float NOT NULL AUTO_INCREMENT,
  `id_medical` float DEFAULT NULL,
  `hour_start` varchar(255) NOT NULL,
  `hour_end` varchar(255) NOT NULL,
  `dmon` varchar(255) NOT NULL,
  `dtue` varchar(255) NOT NULL,
  `dwed` varchar(255) NOT NULL,
  `dthu` varchar(255) NOT NULL,
  `dfry` varchar(255) NOT NULL,
  `dsat` varchar(255) NOT NULL,
  `dsun` varchar(255) NOT NULL,
  PRIMARY KEY (`id_diet_detail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbdiet_detail`
--

LOCK TABLES `tbdiet_detail` WRITE;
/*!40000 ALTER TABLE `tbdiet_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbdiet_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbdiet_group`
--

DROP TABLE IF EXISTS `tbdiet_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbdiet_group` (
  `id_diet_group` float NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_diet_group`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbdiet_group`
--

LOCK TABLES `tbdiet_group` WRITE;
/*!40000 ALTER TABLE `tbdiet_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbdiet_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbevents`
--

DROP TABLE IF EXISTS `tbevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbevents` (
  `id_events` float NOT NULL AUTO_INCREMENT,
  `id_patient` float DEFAULT NULL,
  `eventstart` datetime DEFAULT NULL,
  `level` varchar(255) NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_events`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbevents`
--

LOCK TABLES `tbevents` WRITE;
/*!40000 ALTER TABLE `tbevents` DISABLE KEYS */;
INSERT INTO `tbevents` VALUES (1,1,'2014-04-23 23:01:35','important','werewr',0),(2,1,'2014-04-24 23:09:07','important','skdf;dskf;sdkf;',0),(3,1,'2014-08-14 23:47:38','info','examen de manos',0),(4,1,'2014-07-28 14:53:18','important','xxxx',0);
/*!40000 ALTER TABLE `tbevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbgroupmedicine`
--

DROP TABLE IF EXISTS `tbgroupmedicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbgroupmedicine` (
  `id` float NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbgroupmedicine`
--

LOCK TABLES `tbgroupmedicine` WRITE;
/*!40000 ALTER TABLE `tbgroupmedicine` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbgroupmedicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbmedicalappointments`
--

DROP TABLE IF EXISTS `tbmedicalappointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbmedicalappointments` (
  `id_appointments` float NOT NULL AUTO_INCREMENT,
  `id_medical` float DEFAULT NULL,
  `date_reg` datetime DEFAULT NULL,
  `rweight` float NOT NULL,
  `rsize` float NOT NULL,
  `pulse` float NOT NULL,
  `blood_pressure` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `observation` varchar(255) NOT NULL,
  PRIMARY KEY (`id_appointments`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbmedicalappointments`
--

LOCK TABLES `tbmedicalappointments` WRITE;
/*!40000 ALTER TABLE `tbmedicalappointments` DISABLE KEYS */;
INSERT INTO `tbmedicalappointments` VALUES (1,1,'2014-04-20 15:06:00',58,168,90,'60','No','Ninguna');
/*!40000 ALTER TABLE `tbmedicalappointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbmedicalrecord`
--

DROP TABLE IF EXISTS `tbmedicalrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbmedicalrecord` (
  `id_medical` float NOT NULL AUTO_INCREMENT,
  `id_patient` float DEFAULT NULL,
  `habit` varchar(500) DEFAULT 'N/A',
  `antecedent` varchar(500) DEFAULT 'N/A',
  `alergy` varchar(500) DEFAULT 'N/A',
  `date_reg` date DEFAULT NULL,
  `observation` varchar(500) DEFAULT 'N/A',
  `blood_type` varchar(10) DEFAULT 'N/A',
  PRIMARY KEY (`id_medical`),
  UNIQUE KEY `id_patient_unique` (`id_patient`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbmedicalrecord`
--

LOCK TABLES `tbmedicalrecord` WRITE;
/*!40000 ALTER TABLE `tbmedicalrecord` DISABLE KEYS */;
INSERT INTO `tbmedicalrecord` VALUES (1,1,'Ninguno','Ninguno','No','2014-04-20','Picazon e hinchazon a la piel','O+');
/*!40000 ALTER TABLE `tbmedicalrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbmedicine`
--

DROP TABLE IF EXISTS `tbmedicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbmedicine` (
  `id` float NOT NULL,
  `medicinegroup_id` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbmedicine`
--

LOCK TABLES `tbmedicine` WRITE;
/*!40000 ALTER TABLE `tbmedicine` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbmedicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbpatient`
--

DROP TABLE IF EXISTS `tbpatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbpatient` (
  `id_patient` float NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_city` float NOT NULL,
  `id_civil_status` float NOT NULL,
  `id_education` float NOT NULL,
  `id_profession` float NOT NULL,
  `identification` varchar(20) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ocupation` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birthday` date NOT NULL,
  `sex` enum('F','M','O') NOT NULL DEFAULT 'M',
  `emergency_phone` varchar(20) DEFAULT NULL,
  `emergency_name` varchar(80) DEFAULT NULL,
  `emergency_kin` varchar(20) DEFAULT NULL,
  `birthplace` varchar(50) NOT NULL,
  PRIMARY KEY (`id_patient`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbpatient`
--

LOCK TABLES `tbpatient` WRITE;
/*!40000 ALTER TABLE `tbpatient` DISABLE KEYS */;
INSERT INTO `tbpatient` VALUES (1,'Cumbaya','gabosnyder@hotmail.com',1,1,1,6,'1356765432','Snyder','Gabriel','6','0999786453','1988-04-20','M','0999786453','Juliana','4','Ibarra');
/*!40000 ALTER TABLE `tbpatient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbprofession`
--

DROP TABLE IF EXISTS `tbprofession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbprofession` (
  `id` float NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbprofession`
--

LOCK TABLES `tbprofession` WRITE;
/*!40000 ALTER TABLE `tbprofession` DISABLE KEYS */;
INSERT INTO `tbprofession` VALUES (1,'Ninguno'),(2,'Ama de Casa'),(3,'Ingeniero'),(4,'Doctor'),(5,'Secretaria'),(6,'Obrero');
/*!40000 ALTER TABLE `tbprofession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbrecipes`
--

DROP TABLE IF EXISTS `tbrecipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbrecipes` (
  `id_recipes` float NOT NULL AUTO_INCREMENT,
  `id_appointments` float DEFAULT NULL,
  `medicine` varchar(255) NOT NULL,
  `dose` varchar(255) NOT NULL,
  `observation` varchar(255) NOT NULL,
  PRIMARY KEY (`id_recipes`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbrecipes`
--

LOCK TABLES `tbrecipes` WRITE;
/*!40000 ALTER TABLE `tbrecipes` DISABLE KEYS */;
INSERT INTO `tbrecipes` VALUES (2,1,'Paracetamol','2 tabletas cada hora durante 8 dias','se debe tomar un vaso de leche antes de cada comida'),(3,1,'Mebocaina','antes de cada comida 1 cucharada de l remedio recetado debe que tomarse en desayuno almuerzo y merienda','seguir las indicaciones dades para la correcta aplicacion del remedio dado por el hospital general de cada sala');
/*!40000 ALTER TABLE `tbrecipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbusers`
--

DROP TABLE IF EXISTS `tbusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbusers` (
  `iduser` float NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `datebirth` date DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbusers`
--

LOCK TABLES `tbusers` WRITE;
/*!40000 ALTER TABLE `tbusers` DISABLE KEYS */;
INSERT INTO `tbusers` VALUES (1,'Administrator','Manager','2014-01-01',1,'admin','1234',''),(2,'Invitado','Guest','2014-01-01',1,'guest','1234','');
/*!40000 ALTER TABLE `tbusers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-28 15:57:34
