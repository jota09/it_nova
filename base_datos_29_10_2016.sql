/*
SQLyog Ultimate v9.02 
MySQL - 5.5.39 : Database - it_nova
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`it_nova` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `it_nova`;

/*Table structure for table `accion` */

DROP TABLE IF EXISTS `accion`;

CREATE TABLE `accion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 NOT NULL,
  `creado_por` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `accion` */

insert  into `accion`(`id`,`nombre`,`creado_por`,`fecha_creacion`,`activo`,`eliminado`) values (1,'Crear','1',NULL,1,0),(2,'Ver','1',NULL,1,0),(3,'Actualizar','1',NULL,1,0),(4,'Eliminar','1',NULL,1,0),(5,'Listar','1',NULL,1,0);

/*Table structure for table `acl_perfil_permiso` */

DROP TABLE IF EXISTS `acl_perfil_permiso`;

CREATE TABLE `acl_perfil_permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_id` int(11) NOT NULL,
  `modulo_accion_id` int(11) NOT NULL,
  `lista_tipo_permiso` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_acl_perfil_modulo_perfil1_idx` (`perfil_id`),
  KEY `fk_acl_perfil_modulo_accion1_idx` (`modulo_accion_id`),
  CONSTRAINT `acl_perfil_permiso_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`),
  CONSTRAINT `acl_perfil_permiso_ibfk_2` FOREIGN KEY (`modulo_accion_id`) REFERENCES `modulo_accion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8;

/*Data for the table `acl_perfil_permiso` */

insert  into `acl_perfil_permiso`(`id`,`perfil_id`,`modulo_accion_id`,`lista_tipo_permiso`,`fecha_creacion`,`fecha_modificacion`,`activo`,`eliminado`) values (66,3,86,0,NULL,NULL,1,0),(67,3,87,0,NULL,NULL,1,0),(68,3,88,0,NULL,NULL,1,0),(69,3,89,0,NULL,NULL,1,0),(70,3,90,0,NULL,NULL,1,0),(71,3,6,0,NULL,NULL,1,0),(72,3,7,0,NULL,NULL,1,0),(73,3,8,0,NULL,NULL,1,0),(74,3,9,0,NULL,NULL,1,0),(75,3,10,0,NULL,NULL,1,0),(76,3,11,0,NULL,NULL,1,0),(77,3,12,0,NULL,NULL,1,0),(78,3,13,0,NULL,NULL,1,0),(79,3,14,0,NULL,NULL,1,0),(80,3,15,0,NULL,NULL,1,0),(81,3,21,0,NULL,NULL,1,0),(82,3,22,0,NULL,NULL,1,0),(83,3,23,0,NULL,NULL,1,0),(84,3,24,0,NULL,NULL,1,0),(85,3,25,0,NULL,NULL,1,0),(86,3,31,0,NULL,NULL,1,0),(87,3,32,0,NULL,NULL,1,0),(88,3,33,0,NULL,NULL,1,0),(89,3,34,0,NULL,NULL,1,0),(90,3,35,0,NULL,NULL,1,0),(91,3,26,0,NULL,NULL,1,0),(92,3,27,0,NULL,NULL,1,0),(93,3,28,0,NULL,NULL,1,0),(94,3,29,0,NULL,NULL,1,0),(95,3,30,0,NULL,NULL,1,0),(96,3,71,0,NULL,NULL,1,0),(97,3,72,0,NULL,NULL,1,0),(98,3,73,0,NULL,NULL,1,0),(99,3,74,0,NULL,NULL,1,0),(100,3,75,0,NULL,NULL,1,0),(101,3,41,0,NULL,NULL,1,0),(102,3,42,0,NULL,NULL,1,0),(103,3,43,0,NULL,NULL,1,0),(104,3,44,0,NULL,NULL,1,0),(105,3,45,0,NULL,NULL,1,0),(106,3,76,0,NULL,NULL,1,0),(107,3,77,0,NULL,NULL,1,0),(108,3,78,0,NULL,NULL,1,0),(109,3,79,0,NULL,NULL,1,0),(110,3,80,0,NULL,NULL,1,0),(111,3,81,0,NULL,NULL,1,0),(112,3,82,0,NULL,NULL,1,0),(113,3,83,0,NULL,NULL,1,0),(114,3,84,0,NULL,NULL,1,0),(115,3,85,0,NULL,NULL,1,0),(116,3,91,0,NULL,NULL,1,0),(117,3,92,0,NULL,NULL,1,0),(118,3,93,0,NULL,NULL,1,0),(119,3,94,0,NULL,NULL,1,0),(120,3,95,0,NULL,NULL,1,0),(121,3,61,0,NULL,NULL,1,0),(122,3,62,0,NULL,NULL,1,0),(123,3,63,0,NULL,NULL,1,0),(124,3,64,0,NULL,NULL,1,0),(125,3,65,0,NULL,NULL,1,0),(126,3,36,0,NULL,NULL,1,0),(127,3,37,0,NULL,NULL,1,0),(128,3,38,0,NULL,NULL,1,0),(129,3,39,0,NULL,NULL,1,0),(130,3,40,0,NULL,NULL,1,0),(131,3,56,0,NULL,NULL,1,0),(132,3,57,0,NULL,NULL,1,0),(133,3,58,0,NULL,NULL,1,0),(134,3,59,0,NULL,NULL,1,0),(135,3,60,0,NULL,NULL,1,0),(136,2,86,0,NULL,NULL,1,0),(137,2,87,0,NULL,NULL,1,0),(138,2,88,0,NULL,NULL,1,0),(139,2,89,0,NULL,NULL,1,0),(140,2,90,0,NULL,NULL,1,0),(141,2,6,0,NULL,NULL,1,0),(142,2,7,0,NULL,NULL,1,0),(143,2,8,0,NULL,NULL,1,0),(144,2,9,0,NULL,NULL,1,0),(145,2,10,0,NULL,NULL,1,0),(146,2,11,0,NULL,NULL,1,0),(147,2,12,0,NULL,NULL,1,0),(148,2,13,0,NULL,NULL,1,0),(149,2,14,0,NULL,NULL,1,0),(150,2,15,0,NULL,NULL,1,0),(151,2,21,0,NULL,NULL,1,0),(152,2,22,0,NULL,NULL,1,0),(153,2,23,0,NULL,NULL,1,0),(154,2,24,0,NULL,NULL,1,0),(155,2,25,0,NULL,NULL,1,0),(156,2,31,0,NULL,NULL,1,0),(157,2,32,0,NULL,NULL,1,0),(158,2,33,0,NULL,NULL,1,0),(159,2,34,0,NULL,NULL,1,0),(160,2,35,0,NULL,NULL,1,0),(161,2,26,0,NULL,NULL,1,0),(162,2,27,0,NULL,NULL,1,0),(163,2,28,0,NULL,NULL,1,0),(164,2,29,0,NULL,NULL,1,0),(165,2,30,0,NULL,NULL,1,0),(166,2,71,0,NULL,NULL,1,0),(167,2,72,0,NULL,NULL,1,0),(168,2,73,0,NULL,NULL,1,0),(169,2,74,0,NULL,NULL,1,0),(170,2,75,0,NULL,NULL,1,0),(171,2,41,0,NULL,NULL,1,0),(172,2,42,0,NULL,NULL,1,0),(173,2,43,0,NULL,NULL,1,0),(174,2,44,0,NULL,NULL,1,0),(175,2,45,0,NULL,NULL,1,0),(176,2,76,0,NULL,NULL,1,0),(177,2,77,0,NULL,NULL,1,0),(178,2,78,0,NULL,NULL,1,0),(179,2,79,0,NULL,NULL,1,0),(180,2,80,0,NULL,NULL,1,0),(181,2,81,0,NULL,NULL,1,0),(182,2,82,0,NULL,NULL,1,0),(183,2,83,0,NULL,NULL,1,0),(184,2,84,0,NULL,NULL,1,0),(185,2,85,0,NULL,NULL,1,0),(186,2,91,3,NULL,NULL,1,0),(187,2,92,3,NULL,NULL,1,0),(188,2,93,3,NULL,NULL,1,0),(189,2,94,3,NULL,NULL,1,0),(190,2,95,3,NULL,NULL,1,0),(191,2,61,0,NULL,NULL,1,0),(192,2,62,0,NULL,NULL,1,0),(193,2,63,0,NULL,NULL,1,0),(194,2,64,0,NULL,NULL,1,0),(195,2,65,0,NULL,NULL,1,0),(196,2,36,0,NULL,NULL,1,0),(197,2,37,0,NULL,NULL,1,0),(198,2,38,0,NULL,NULL,1,0),(199,2,39,0,NULL,NULL,1,0),(200,2,40,0,NULL,NULL,1,0),(201,2,56,0,NULL,NULL,1,0),(202,2,57,0,NULL,NULL,1,0),(203,2,58,0,NULL,NULL,1,0),(204,2,59,0,NULL,NULL,1,0),(205,2,60,0,NULL,NULL,1,0);

/*Table structure for table `actividad` */

DROP TABLE IF EXISTS `actividad`;

CREATE TABLE `actividad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actividad_id` int(11) DEFAULT NULL,
  `relacionado` varchar(45) DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `meridiano_inicio` char(2) DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `meridiano_fin` char(2) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `razon_invitacion_id` int(11) DEFAULT NULL,
  `prioridad_id` int(11) DEFAULT NULL,
  `duracion` char(3) DEFAULT NULL,
  `alerta` varchar(45) DEFAULT NULL,
  `tiempo_alerta_id` int(11) DEFAULT NULL,
  `tipo_alerta_id` int(11) DEFAULT NULL COMMENT '\n',
  `creado_por` int(11) DEFAULT NULL,
  `tipo_tiempo_alerta_id` int(11) DEFAULT NULL,
  `responsable_id` int(11) DEFAULT NULL,
  `fecha_realizada` date DEFAULT NULL,
  `hora_realizada` varchar(20) DEFAULT NULL,
  `meridiano_realizada` char(2) DEFAULT NULL,
  `tiempo_duracion_id` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `eliminado` tinyint(1) DEFAULT '0',
  `porcentaje` float DEFAULT NULL,
  `respuesta_id` int(11) DEFAULT '0',
  `fecha_respuesta` date DEFAULT NULL,
  `hora_respuesta` time DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `hora_vencimiento` time DEFAULT NULL,
  `meridiano_vencimiento` char(2) DEFAULT NULL,
  `fecha_plazo` date DEFAULT NULL,
  `hora_plazo` time DEFAULT NULL,
  `meridiano_plazo` char(2) DEFAULT NULL,
  `tipificacion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_actividad_modulo_idx` (`actividad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `actividad` */

/*Table structure for table `actividad_invitado` */

DROP TABLE IF EXISTS `actividad_invitado`;

CREATE TABLE `actividad_invitado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actividad_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `respuesta_id` int(11) DEFAULT '0',
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `fecha_respuesta` date DEFAULT NULL,
  `hora_respuesta` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_actividad_invitado_actividad_idx` (`actividad_id`),
  KEY `fk_actividad_invitado_inviatdo_idx` (`usuario_id`),
  CONSTRAINT `fk_actividad_invitado_actividad` FOREIGN KEY (`actividad_id`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `actividad_invitado` */

/*Table structure for table `area` */

DROP TABLE IF EXISTS `area`;

CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `creado_por` int(11) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `modificado_por` int(11) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT '1',
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `area` */

insert  into `area`(`id`,`nombre`,`fecha_creacion`,`creado_por`,`fecha_modificacion`,`modificado_por`,`activo`,`eliminado`) values (1,'Administracion',NULL,NULL,NULL,NULL,1,0),(2,'Calidad',NULL,NULL,NULL,NULL,1,0),(3,'compras',NULL,NULL,NULL,NULL,1,0),(4,'Contabilidad',NULL,NULL,NULL,NULL,1,0),(5,'Gerencia',NULL,NULL,NULL,NULL,1,0),(6,'Gestion Humana',NULL,NULL,NULL,NULL,1,0),(7,'Logistica',NULL,NULL,NULL,NULL,1,0),(8,'Mercadeo',NULL,NULL,NULL,NULL,1,0),(9,'Producción',NULL,NULL,NULL,NULL,1,0),(10,'puntos de venta',NULL,NULL,NULL,NULL,1,0),(11,'Servicio al cliente y cartera',NULL,NULL,NULL,NULL,1,0),(12,'Sistemas',NULL,NULL,NULL,NULL,1,0),(13,'Ventas',NULL,NULL,NULL,NULL,1,0),(14,'Comité orientacion & apoyo',NULL,NULL,NULL,NULL,1,0);

/*Table structure for table `auditoria_registro` */

DROP TABLE IF EXISTS `auditoria_registro`;

CREATE TABLE `auditoria_registro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `modulo` varchar(45) DEFAULT NULL,
  `accion` varchar(45) DEFAULT NULL,
  `registro_id` int(11) DEFAULT NULL,
  `fecha_modificacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_auditoria_registro_usuario1_idx` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `auditoria_registro` */

/*Table structure for table `cargo` */

DROP TABLE IF EXISTS `cargo`;

CREATE TABLE `cargo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `creado_por` int(11) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `modificado_por` int(11) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT '1',
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_cargo_area_idx` (`area_id`),
  CONSTRAINT `fk_cargo_area` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `cargo` */

insert  into `cargo`(`id`,`area_id`,`nombre`,`fecha_creacion`,`creado_por`,`fecha_modificacion`,`modificado_por`,`activo`,`eliminado`) values (1,1,'Director administrativo y financiero','2016-08-24 02:14:26',4,NULL,NULL,1,0),(2,2,'Lider de calidad','2016-08-24 02:14:26',4,NULL,NULL,1,0),(3,2,'Auxiliar de calidad','2016-08-24 02:14:26',4,NULL,NULL,1,0),(4,3,'Lider de compras','2016-08-24 02:20:29',4,NULL,NULL,1,0),(5,4,'Asistente contable','2016-08-24 02:20:29',4,NULL,NULL,1,0),(6,4,'Tesorero','2016-08-24 02:20:29',4,NULL,NULL,1,0),(7,4,'Lider de contabilidad','2016-08-24 09:46:50',4,NULL,NULL,1,0),(8,5,'Gerente','2016-08-24 09:46:50',4,NULL,NULL,1,0),(9,6,'Lider de gestion humana','2016-08-24 13:08:59',4,NULL,NULL,1,0),(10,7,'Auxiliar de  logistica',NULL,NULL,NULL,NULL,1,0),(11,8,'Asistente de mercadeo',NULL,NULL,NULL,NULL,1,0),(12,8,'Auxiliar de mercadeo',NULL,NULL,NULL,NULL,1,0),(13,8,'Publicista',NULL,NULL,NULL,NULL,1,0),(14,9,'Lider de producción',NULL,NULL,NULL,NULL,1,0),(15,10,'Asesor punto de venta',NULL,NULL,NULL,NULL,1,0),(16,11,'Asesor servicio al cliente',NULL,NULL,NULL,NULL,1,0),(17,11,'Auxiliar de cartera',NULL,NULL,NULL,NULL,1,0),(18,11,'Lider de servicio al cliente y cartera',NULL,NULL,NULL,NULL,1,0),(19,12,'Lider de sistemas',NULL,NULL,NULL,NULL,1,0),(20,13,'Asesor punto de venta',NULL,NULL,NULL,NULL,1,0),(21,13,'Director de ventas y mercadeo',NULL,NULL,NULL,NULL,1,0),(22,13,'Gerente de zona',NULL,NULL,NULL,NULL,1,0),(23,13,'Lider de ventas',NULL,NULL,NULL,NULL,1,0),(24,14,'Comité orientacion & apoyo',NULL,NULL,NULL,NULL,1,0);

/*Table structure for table `comentario` */

DROP TABLE IF EXISTS `comentario`;

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actividad_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_comentario` datetime NOT NULL,
  `comentario` text NOT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comentarios_actividad_idx` (`actividad_id`),
  KEY `fk_comentarios_usuario_idx` (`usuario_id`),
  CONSTRAINT `comentario_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_comentarios_actividad` FOREIGN KEY (`actividad_id`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `comentario` */

/*Table structure for table `configuracion` */

DROP TABLE IF EXISTS `configuracion`;

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hora_vencimiento` int(11) DEFAULT NULL,
  `tiempo_vencimiento_id` int(11) DEFAULT NULL,
  `tipo_tiempo_vencimiento_id` int(11) DEFAULT NULL,
  `hora_alerta` int(11) DEFAULT NULL,
  `tiempo_alerta_id` int(11) DEFAULT NULL,
  `tipo_tiempo_alerta_id` int(11) DEFAULT NULL,
  `meses_limpieza` int(11) DEFAULT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `activo` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_configuracion_1_idx` (`tiempo_vencimiento_id`),
  KEY `fk_configuracion_3_idx` (`tiempo_alerta_id`),
  KEY `fk_configuracion_4_idx` (`tipo_tiempo_alerta_id`),
  KEY `fk_configuracion_2_idx` (`tipo_tiempo_vencimiento_id`),
  CONSTRAINT `fk_configuracion_1` FOREIGN KEY (`tiempo_vencimiento_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracion_2` FOREIGN KEY (`tipo_tiempo_vencimiento_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracion_3` FOREIGN KEY (`tiempo_alerta_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_configuracion_4` FOREIGN KEY (`tipo_tiempo_alerta_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `configuracion` */

insert  into `configuracion`(`id`,`hora_vencimiento`,`tiempo_vencimiento_id`,`tipo_tiempo_vencimiento_id`,`hora_alerta`,`tiempo_alerta_id`,`tipo_tiempo_alerta_id`,`meses_limpieza`,`eliminado`,`activo`) values (1,16,60,62,16,60,62,99,0,1);

/*Table structure for table `contrasenia` */

DROP TABLE IF EXISTS `contrasenia`;

CREATE TABLE `contrasenia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `hash` varchar(45) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_contrasenia_usuario1_idx` (`usuario_id`),
  CONSTRAINT `CONTRASENA_USUARIO` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `contrasenia` */

insert  into `contrasenia`(`id`,`usuario_id`,`hash`,`fecha_creacion`,`fecha_modificacion`,`eliminado`) values (1,1,'ca3f472ffc7674218ccb17aa6fd85ae7be7b3812',NULL,NULL,0);

/*Table structure for table `cuenta` */

DROP TABLE IF EXISTS `cuenta`;

CREATE TABLE `cuenta` (
  `idcuenta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idcuenta`),
  KEY `fk_cuenta_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_cuenta_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cuenta` */

/*Table structure for table `documento` */

DROP TABLE IF EXISTS `documento`;

CREATE TABLE `documento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comentario_id` int(11) DEFAULT NULL,
  `adjunto` text,
  `extension` varchar(5) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `nombre` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_documento_comentario_idx` (`comentario_id`),
  CONSTRAINT `fk_documento_comentario` FOREIGN KEY (`comentario_id`) REFERENCES `comentario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `documento` */

/*Table structure for table `factura` */

DROP TABLE IF EXISTS `factura`;

CREATE TABLE `factura` (
  `idfactura` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT NULL,
  `numero_factura` int(11) DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `tipo_documento` varchar(45) DEFAULT NULL,
  `estado_id` varchar(45) DEFAULT NULL,
  `valor` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `comprador` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idfactura`),
  KEY `fk_factura_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_factura_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `factura` */

insert  into `factura`(`idfactura`,`usuario_id`,`fecha_creacion`,`fecha_modificacion`,`activo`,`eliminado`,`numero_factura`,`referencia`,`tipo_documento`,`estado_id`,`valor`,`fecha`,`comprador`) values (1,1,'2016-10-12 16:12:58','2016-10-12 16:12:58',1,0,212,'a234','cotizacion2','34','123','2016-10-12','wadsd'),(2,1,'2016-10-12 16:12:58','2016-10-27 16:13:02',1,0,21321,'a2','factura2','23','5546','2016-09-16','bbbbb'),(3,1,'2016-10-12 16:12:58','2016-10-27 16:13:02',1,0,45345,'a3','factura3','23','5546','2016-10-14','bbbbb'),(4,1,'2016-10-12 16:12:58','2016-10-27 16:13:02',1,0,54645,'a4','factura4','23','5546','2016-08-15','bbbbb'),(5,1,'2016-10-12 16:12:58','2016-10-27 16:13:02',1,0,6456,'a5','factura5','23','5546','2016-09-14','bbbbb'),(6,1,'2016-10-12 16:12:58','2016-10-12 16:12:58',1,0,212,'a234','cotizacion2','34','123','2016-10-12','wadsd'),(7,1,'2016-10-12 16:12:58','2016-10-12 16:12:58',1,0,212,'a234','cotizacion2','34','123','2016-07-12','wadsd'),(8,1,'2016-10-12 16:12:58','2016-10-12 16:12:58',1,0,212,'a234','cotizacion2','34','123','2016-10-12','wadsd'),(9,1,'2016-10-12 16:12:58','2016-10-12 16:12:58',1,0,212,'a234','cotizacion2','34','123','2016-06-12','wadsd');

/*Table structure for table `festivos` */

DROP TABLE IF EXISTS `festivos`;

CREATE TABLE `festivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `configuracion_id` int(11) NOT NULL,
  `festivo` date NOT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_festivos_config_idx` (`configuracion_id`),
  CONSTRAINT `fk_festivos_config` FOREIGN KEY (`configuracion_id`) REFERENCES `configuracion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `festivos` */

/*Table structure for table `horario_laboral` */

DROP TABLE IF EXISTS `horario_laboral`;

CREATE TABLE `horario_laboral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `configuracion_id` int(11) NOT NULL,
  `dia_id` int(11) NOT NULL,
  `horario_id` int(11) NOT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_horario_laboral_config_idx` (`configuracion_id`),
  KEY `fk_horario_laboral_1_idx` (`dia_id`),
  KEY `fk_horario_laboral_2_idx` (`horario_id`),
  CONSTRAINT `fk_horario_laboral_1` FOREIGN KEY (`dia_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_horario_laboral_2` FOREIGN KEY (`horario_id`) REFERENCES `opcion_lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_horario_laboral_config` FOREIGN KEY (`configuracion_id`) REFERENCES `configuracion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `horario_laboral` */

/*Table structure for table `lista_maestra` */

DROP TABLE IF EXISTS `lista_maestra`;

CREATE TABLE `lista_maestra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modulo_id` int(11) DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `etiqueta` varchar(150) NOT NULL,
  `general` tinyint(1) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_lista_maestra_modulo1_idx` (`modulo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

/*Data for the table `lista_maestra` */

insert  into `lista_maestra`(`id`,`modulo_id`,`nombre`,`etiqueta`,`general`,`activo`,`eliminado`) values (1,NULL,'tipo permiso','tipo_permiso',1,1,0),(2,NULL,'esatdo','estado',1,1,0),(3,NULL,'toma_de_contacto','toma_de_contacto',1,1,0),(4,NULL,'clasificacion','clasificacion',1,1,0),(5,26,'tipo','tipo',0,1,0),(6,5,'etapa','etapa',0,1,0),(7,23,'estado','estado',0,1,0),(8,23,'iva','iva',0,1,0),(9,23,'retencion','retencion',0,1,0),(10,12,'estado','estado',0,1,0),(11,1,'Tipificación rechazo','tipificacion_rechazo',0,1,0),(12,12,'tipo de documento','tipo_de_documento',0,1,0),(13,1,'Tipo','tipo',0,1,0),(14,1,'Categoria','categoria',0,1,0),(15,1,'Razón','razon',0,1,0),(16,1,'Estado','estado',0,1,0),(17,NULL,'Tipo Alerta','tipo_alerta',1,1,0),(18,NULL,'Tiempo Alerta','tiempo_alerta',1,1,0),(19,1,'Prioridad','prioridad',0,1,0),(20,25,'tipo acuerdo','tipo_acuerdo',0,1,0),(21,25,'modalidad cobro','modalidad_cobro',0,1,0),(22,25,'periodo cobro','periodo_cobro',0,1,0),(23,25,'linea','linea',0,1,0),(24,25,'tipo servicio','tipo_servicio',0,1,0),(25,25,'estado servicio','estado_servicio',0,1,0),(26,14,'tipo','tipo',0,1,0),(27,14,'origen','origen',0,1,0),(28,14,'prioridad','prioridad',0,1,0),(29,14,'estado','estado',0,1,0),(30,7,'estado','estado',0,1,0),(31,13,'dias','dias',0,1,0),(32,13,'horario','horario',0,1,0),(33,13,'tiempo','tiempo',0,0,0),(34,13,'tipo tiempo','tipo_tiempo',0,0,0),(35,13,'tiempo limpieza','tiempo_limpieza',0,1,0),(36,1,'respuesta','respuesta',0,1,0);

/*Table structure for table `modulo` */

DROP TABLE IF EXISTS `modulo`;

CREATE TABLE `modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `modulo` */

insert  into `modulo`(`id`,`nombre`,`fecha_creacion`,`fecha_modificacion`,`activo`,`eliminado`) values (1,'actividades',NULL,NULL,1,0),(2,'usuarios',NULL,NULL,1,0),(3,'reportes',NULL,NULL,1,0),(4,'perfiles',NULL,NULL,1,0),(5,'listasmaestras',NULL,NULL,1,0),(6,'home',NULL,NULL,1,0),(7,'calendario',NULL,NULL,1,0),(8,'ubicaciones',NULL,NULL,1,0),(9,'documentos',NULL,NULL,1,0),(11,'areas',NULL,NULL,1,0),(12,'editor_listas',NULL,NULL,1,0),(13,'configuraciones',NULL,NULL,1,0),(14,'dashboard',NULL,NULL,1,0),(15,'comite',NULL,NULL,1,0);

/*Table structure for table `modulo_accion` */

DROP TABLE IF EXISTS `modulo_accion`;

CREATE TABLE `modulo_accion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modulo_id` int(11) DEFAULT NULL,
  `accion_id` int(11) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `modulo_id` (`modulo_id`),
  KEY `accion_id` (`accion_id`),
  CONSTRAINT `modulo_accion_ibfk_2` FOREIGN KEY (`accion_id`) REFERENCES `accion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

/*Data for the table `modulo_accion` */

insert  into `modulo_accion`(`id`,`modulo_id`,`accion_id`,`activo`,`eliminado`) values (1,23,1,1,0),(2,23,2,1,0),(3,23,3,1,0),(4,23,4,1,0),(5,23,5,1,0),(6,2,1,1,0),(7,2,2,1,0),(8,2,3,1,0),(9,2,4,1,0),(10,2,5,1,0),(11,4,1,1,0),(12,4,2,1,0),(13,4,3,1,0),(14,4,4,1,0),(15,4,5,1,0),(16,22,1,1,0),(17,22,2,1,0),(18,22,3,1,0),(19,22,4,1,0),(20,22,5,1,0),(21,3,1,1,0),(22,3,2,1,0),(23,3,3,1,0),(24,3,4,1,0),(25,3,5,1,0),(26,13,1,1,0),(27,13,2,1,0),(28,13,3,1,0),(29,13,4,1,0),(30,13,5,1,0),(31,14,1,1,0),(32,14,2,1,0),(33,14,3,1,0),(34,14,4,1,0),(35,14,5,1,0),(36,5,1,1,0),(37,5,2,1,0),(38,5,3,1,0),(39,5,4,1,0),(40,5,5,1,0),(41,1,1,1,0),(42,1,2,1,0),(43,1,3,1,0),(44,1,4,1,0),(45,1,5,1,0),(46,19,1,1,0),(47,19,2,1,0),(48,19,3,1,0),(49,19,4,1,0),(50,19,5,1,0),(51,16,1,1,0),(52,16,2,1,0),(53,16,3,1,0),(54,16,4,1,0),(55,16,5,1,0),(56,8,1,1,0),(57,8,2,1,0),(58,8,3,1,0),(59,8,4,1,0),(60,8,5,1,0),(61,6,1,1,0),(62,6,2,1,0),(63,6,3,1,0),(64,6,4,1,0),(65,6,5,1,0),(66,17,1,1,0),(67,17,2,1,0),(68,17,3,1,0),(69,17,4,1,0),(70,17,5,1,0),(71,11,1,1,0),(72,11,2,1,0),(73,11,3,1,0),(74,11,4,1,0),(75,11,5,1,0),(76,9,1,1,0),(77,9,2,1,0),(78,9,3,1,0),(79,9,4,1,0),(80,9,5,1,0),(81,7,1,1,0),(82,7,2,1,0),(83,7,3,1,0),(84,7,4,1,0),(85,7,5,1,0),(86,12,1,1,0),(87,12,2,1,0),(88,12,3,1,0),(89,12,4,1,0),(90,12,5,1,0),(91,15,1,1,0),(92,15,2,1,0),(93,15,3,1,0),(94,15,4,1,0),(95,15,5,1,0);

/*Table structure for table `opcion_lista_maestra` */

DROP TABLE IF EXISTS `opcion_lista_maestra`;

CREATE TABLE `opcion_lista_maestra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lista_maestra_id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `por_defecto` tinyint(1) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_opciones_lista_maestra_lista_maestra1_idx` (`lista_maestra_id`),
  CONSTRAINT `fk_opcion_lista_maestra_lista_maestra` FOREIGN KEY (`lista_maestra_id`) REFERENCES `lista_maestra` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

/*Data for the table `opcion_lista_maestra` */

insert  into `opcion_lista_maestra`(`id`,`lista_maestra_id`,`nombre`,`por_defecto`,`activo`,`eliminado`) values (1,1,'Todo',1,1,0),(2,1,'Propietario',0,1,0),(3,1,'Nada',0,1,0),(4,2,'Activa',1,1,0),(5,2,'Inactiva',0,1,0),(6,3,'Llamada en Frio',1,1,0),(7,3,'Referido',0,1,0),(8,3,'Conferencia',0,1,0),(9,3,'Página Web',0,1,0),(10,3,'Relaciones Públicas',0,1,0),(11,3,'Campaña',0,1,0),(12,4,'A',1,1,0),(13,4,'AA',0,1,0),(14,4,'AAA',0,1,0),(15,5,'Cliente',1,1,0),(16,5,'Clasificación Cliente',0,1,0),(17,6,'Cotización',1,1,0),(18,6,'Negociación',0,1,0),(19,6,'Ganada',0,1,0),(20,6,'Perdida',0,1,0),(21,6,'Abandonada',0,1,0),(22,7,'Nueva',1,1,0),(23,7,'Borrador',0,1,0),(24,7,'Presentada',0,1,0),(25,8,'16',1,1,0),(26,8,'0',0,1,0),(27,9,'4',1,1,0),(28,9,'6',0,1,0),(29,9,'10',0,1,0),(30,10,'Activo',0,1,0),(31,10,'Stand by',0,1,0),(32,10,'Perdido',0,1,0),(33,11,'No es mi proceso',0,1,0),(34,11,'Falta información',0,1,0),(35,12,'NIT',0,1,0),(36,12,'Cedula de Ciudadanía',0,1,0),(37,12,'Cedula Extranjería',0,1,0),(38,12,'Tarea',0,1,1),(39,13,'Simple',0,1,0),(40,13,'Compuesta',0,1,0),(41,14,'Plan de acción',0,1,0),(42,14,'Invitación comite O&A',0,1,0),(43,14,'Solicitud',0,1,0),(44,14,'Tarea',0,1,0),(45,14,'Reunión',0,1,0),(46,15,'Disciplinaria',0,1,0),(47,15,'Procedimiento',0,1,0),(48,15,'Clima Laboral',0,1,0),(49,16,'Asignada',0,1,0),(50,16,'Aceptada',0,1,0),(51,16,'Rechazada',0,1,0),(52,16,'Cumplida',0,1,0),(53,16,'Cumplida y cerrada',0,1,0),(54,19,'Baja',1,1,0),(55,19,'Media',0,1,0),(56,19,'Alta',0,1,0),(57,16,'Cancelada',0,1,0),(58,16,'Socializada',0,1,0),(59,18,'Minutos',0,1,0),(60,18,'Horas',0,1,0),(61,18,'Días',0,1,0),(62,17,'Hábiles',0,1,0),(63,17,'Calendario',0,1,0),(64,18,'Trimestral',0,1,1),(65,18,'Semestral',0,1,1),(66,22,'Anual',0,1,0),(67,24,'Alquiler Inhouse',0,1,0),(68,24,'Alquiler Equipos',0,1,0),(69,24,'Pauta Digital',0,1,0),(70,24,'Contenido Digital',0,1,0),(71,23,'Alquiler Inhouse',0,1,0),(72,23,'Alquiler Demanda',0,1,0),(73,23,'Venta Equipos',0,1,0),(74,23,'Digital Signage',0,1,0),(75,23,'Contenido Digital',0,1,0),(76,25,'Activo',0,1,0),(77,25,'retirado',0,1,0),(78,25,'Suspendido',0,1,0),(79,26,'Mal Servicio',0,1,0),(80,26,'Incumplimiento',0,1,0),(81,26,'Precio',0,1,0),(82,26,'Equipos defectuosos',0,1,0),(83,27,'Llamada Telefónica',0,1,0),(84,27,'Email',0,1,0),(85,27,'Página Web',0,1,0),(86,27,'Carta',0,1,0),(87,28,'Baja',0,1,0),(88,28,'Media',0,1,0),(89,28,'Alta',0,1,0),(90,29,'Nuevo',0,1,0),(91,29,'Pendiente de información',0,1,0),(92,29,'Solucionado',0,1,0),(93,30,'Nuevo',1,1,0),(94,30,'Asignado',0,1,0),(95,30,'En Proceso',0,1,0),(96,30,'Perdido',0,1,0),(97,30,'Recicledo',0,1,0),(98,30,'Convertido',0,1,0),(99,35,'6',0,0,0),(100,35,'12',0,1,0),(101,35,'24',0,1,0),(102,34,'Hábiles',0,0,0),(103,34,'Calendario',0,0,0),(104,33,'Horas',0,0,0),(105,33,'Días',0,0,0),(106,33,'Meses',0,1,0),(107,32,'de 8 am - 12 am',0,0,0),(108,32,'de 8 am - 6 pm',0,0,0),(109,31,'Lunes a Viernes',0,0,0),(110,31,'Lunes a Sábado',0,0,0),(111,31,'Sábado',0,1,0),(112,36,'Aceptada',0,1,0),(113,36,'Rechazada',0,1,0),(114,13,'gdfgdfgdfgdfgdf',0,1,1);

/*Table structure for table `perfil` */

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `perfil` */

insert  into `perfil`(`id`,`nombre`,`fecha_creacion`,`fecha_modificacion`,`activo`,`eliminado`) values (1,'admin',NULL,NULL,1,0),(2,'usuario',NULL,NULL,1,0),(3,'comite',NULL,NULL,1,0);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `perfil_id` int(11) NOT NULL,
  `cargo_id` int(11) DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  `informa_a` int(11) DEFAULT NULL,
  `nombres` varchar(150) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `administrador` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_registro` datetime DEFAULT NULL,
  `codigo_activacion` tinytext,
  `recuperar_password` text,
  `autenticado` int(11) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT 'sin_avatar.jpg',
  `fecha_modificacion` datetime DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_usuario_perfil1_idx` (`perfil_id`) USING BTREE,
  KEY `fk_usuario_area_idx` (`area_id`) USING BTREE,
  KEY `fk_usuario_cargo_idx` (`cargo_id`) USING BTREE,
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`id`,`perfil_id`,`cargo_id`,`area_id`,`informa_a`,`nombres`,`apellidos`,`nombre_usuario`,`correo`,`administrador`,`fecha_registro`,`codigo_activacion`,`recuperar_password`,`autenticado`,`avatar`,`fecha_modificacion`,`fecha_creacion`,`activo`,`eliminado`) values (1,1,NULL,NULL,NULL,'Sara','Rodriguez','1126979865','gabir.sanchez@soluciones360.co',1,'2016-07-07 12:00:00','i576n-pjdb8uom6htb4zg91fcx2kdav48sel023f8q15dbyr8w',NULL,NULL,'admin_4.png','2016-08-14 22:36:28',NULL,1,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
