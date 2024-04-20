-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: fabricaec03
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `codigo_Cargo` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo_Cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=906 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (901,'Programador'),(902,'Contador'),(903,'Administrador'),(904,'Ing Industrial');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabrica`
--

DROP TABLE IF EXISTS `fabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabrica` (
  `codigo_fabrico` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`codigo_fabrico`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabrica`
--

LOCK TABLES `fabrica` WRITE;
/*!40000 ALTER TABLE `fabrica` DISABLE KEYS */;
INSERT INTO `fabrica` VALUES (101,'PIURA','SUCURSAL'),(102,'AREQUIPA','SUCURSAL'),(103,'LIMA','PRINCIPAL'),(109,'LORETO','SUCURSAL');
/*!40000 ALTER TABLE `fabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linea`
--

DROP TABLE IF EXISTS `linea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea` (
  `codigo_linea` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo_linea`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea`
--

LOCK TABLES `linea` WRITE;
/*!40000 ALTER TABLE `linea` DISABLE KEYS */;
INSERT INTO `linea` VALUES (201,'A'),(202,'B'),(203,'C'),(205,'D');
/*!40000 ALTER TABLE `linea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `piezas_fabricadas`
--

DROP TABLE IF EXISTS `piezas_fabricadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `piezas_fabricadas` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime(6) DEFAULT NULL,
  `codigo_usuario` int DEFAULT NULL,
  `codigo_fabrico` int DEFAULT NULL,
  `codigo_linea` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codigo_usuario` (`codigo_usuario`),
  KEY `codigo_fabrico` (`codigo_fabrico`),
  KEY `codigo_linea` (`codigo_linea`),
  CONSTRAINT `piezas_fabricadas_ibfk_1` FOREIGN KEY (`codigo_usuario`) REFERENCES `usuarios` (`codigo_usuario`),
  CONSTRAINT `piezas_fabricadas_ibfk_2` FOREIGN KEY (`codigo_fabrico`) REFERENCES `fabrica` (`codigo_fabrico`),
  CONSTRAINT `piezas_fabricadas_ibfk_3` FOREIGN KEY (`codigo_linea`) REFERENCES `linea` (`codigo_linea`)
) ENGINE=InnoDB AUTO_INCREMENT=2050 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `piezas_fabricadas`
--

LOCK TABLES `piezas_fabricadas` WRITE;
/*!40000 ALTER TABLE `piezas_fabricadas` DISABLE KEYS */;
INSERT INTO `piezas_fabricadas` VALUES (2001,'2023-02-09 19:00:00.000000',1001,102,201,35),(2012,'2023-12-06 00:00:00.000000',1002,101,202,20),(2018,'2023-10-19 19:00:00.000000',1001,102,201,45),(2019,'2023-01-09 19:00:00.000000',1001,102,202,90),(2020,'2023-10-20 00:00:00.000000',1002,101,201,25),(2021,'2023-01-09 00:00:00.000000',1001,102,203,90),(2046,'2023-05-01 00:00:00.000000',1002,101,205,50),(2047,'2023-08-01 00:00:00.000000',1004,109,201,150),(2049,'2024-01-02 00:00:00.000000',1004,109,202,25);
/*!40000 ALTER TABLE `piezas_fabricadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codigo_usuario` int NOT NULL AUTO_INCREMENT,
  `apellidos` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `codigo_fabrico` int DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `codigo_Cargo` int DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fotodelusuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo_usuario`),
  KEY `codigo_fabrico` (`codigo_fabrico`),
  KEY `codigo_Cargo` (`codigo_Cargo`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`codigo_fabrico`) REFERENCES `fabrica` (`codigo_fabrico`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`codigo_Cargo`) REFERENCES `cargo` (`codigo_Cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=1027 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1001,'Rivera','Luis',102,'luis@gmail.com','luis123',901,'ACTIVO','https://media.licdn.com/dms/image/C4D03AQELXJVrJYhnag/profile-displayphoto-shrink_800_800/0/1651539070654?e=1707955200&v=beta&t=mTwy4TogkKdutvYgWVHyFUPe6uetPgi-UzFFIHbaEZc'),(1002,'Abanto','Kenji',101,'Kenji@gmail.com','Kenji123',901,'ACTIVO','https://pbs.twimg.com/profile_images/773735804321599489/j9rf6gAP_400x400.jpg'),(1003,'Villanueva','Susan',103,'Susan@gmail.com','Susan123',903,'ACTIVO','https://media.licdn.com/dms/image/C4E03AQG29CryeCX1Qg/profile-displayphoto-shrink_800_800/0/1579624408611?e=1707955200&v=beta&t=rfFOyGopzpJaYhaBhOVvIHDTCV8ff3RsjWKcW9k53Bg'),(1004,'Ricci','Erick ',109,'Erick@gmail.com','Erick123',904,'ACTIVO','https://cdn.discordapp.com/attachments/1130536880023277714/1185034617280024788/IMG-20231208-WA0020.jpg?ex=658e247d&is=657baf7d&hm=2cae3cf858112e5e6fd4b2e038fda99ea3817f9adfcabd0a818f81fcc74e07fe&'),(1022,'Vasquez','Daniela',103,'daniela@gmail.com','daniela123',903,'INACTIVO','https://cdn.discordapp.com/attachments/1130536880023277714/1185649442905407618/74.jpg?ex=65906117&is=657dec17&hm=5133fa676596af2b53abf2f68c423e0cf0971755c7129a65aaf7cdbe09daaa13&');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 17:02:25
