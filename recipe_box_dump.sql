-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: recipe_box
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `ingredients` text,
  `instructions` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imageUrl` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Spaghetti Carbonara','Creamy pasta with pancetta',NULL,NULL,'2025-06-03 15:42:57','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL86-t7IGXR8gUnxRLwbgzmv-UkLxSmqRkBw&s'),(2,'Chicken Curry','Spicy and flavorful curry',NULL,NULL,'2025-06-03 15:42:57','https://urbanblisslife.com/wp-content/uploads/2024/04/Filipino-Chicken-Curry.jpg'),(3,'Avocado Toast','Simple and healthy breakfast',NULL,NULL,'2025-06-03 15:42:57','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLkpP2pBrhn0VLREE6PZh-RQplgrL0JG7rg&s'),(4,'Spaghetti Carbonara','Creamy pasta with pancetta',NULL,NULL,'2025-06-03 15:44:35','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL86-t7IGXR8gUnxRLwbgzmv-UkLxSmqRkBw&s'),(5,'Chicken Curry','Spicy and flavorful curry',NULL,NULL,'2025-06-03 15:44:35','https://urbanblisslife.com/wp-content/uploads/2024/04/Filipino-Chicken-Curry.jpg'),(6,'Avocado Toast','Simple and healthy breakfast',NULL,NULL,'2025-06-03 15:44:35','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLkpP2pBrhn0VLREE6PZh-RQplgrL0JG7rg&s'),(7,'Spaghetti Carbonara','Creamy pasta with pancetta',NULL,NULL,'2025-06-03 15:44:44','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL86-t7IGXR8gUnxRLwbgzmv-UkLxSmqRkBw&s'),(8,'Chicken Curry','Spicy and flavorful curry',NULL,NULL,'2025-06-03 15:44:44','https://urbanblisslife.com/wp-content/uploads/2024/04/Filipino-Chicken-Curry.jpg'),(9,'Avocado Toast','Simple and healthy breakfast',NULL,NULL,'2025-06-03 15:44:44','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLkpP2pBrhn0VLREE6PZh-RQplgrL0JG7rg&s');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04  0:03:27
