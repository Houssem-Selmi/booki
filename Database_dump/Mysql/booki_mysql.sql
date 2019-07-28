/*
SQLyog - Free MySQL GUI v5.19
Host - 5.5.24 : Database - bookidb
*********************************************************************
Server version : 5.5.24
*/


SET NAMES utf8;

SET SQL_MODE='';

create database if not exists `bookidb`;

USE `bookidb`;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

/*Table structure for table `defis_lectures` */

DROP TABLE IF EXISTS `defis_lectures`;

CREATE TABLE `defis_lectures` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `nbre_total_livre` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrrnwa1s87ug2cfsfs4fh1fak2` (`utilisateur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `defis_lectures` */

insert into `defis_lectures` (`id`,`description`,`image_url`,`nbre_total_livre`,`titre`,`date_debut`,`date_fin`,`utilisateur_id`) values (0,'Bon début, continuez..','https://firebasestorage.googleapis.com/v0/b/onesignal-9d554.appspot.com/o/bgtrophy1-min.jpg?alt=media&token=46cb82b9-3a42-47c6-b9e9-d1b0660d87ff',2,'Novice',NULL,NULL,NULL);
insert into `defis_lectures` (`id`,`description`,`image_url`,`nbre_total_livre`,`titre`,`date_debut`,`date_fin`,`utilisateur_id`) values (2,'Vous avancez bien, Bravo','https://firebasestorage.googleapis.com/v0/b/onesignal-9d554.appspot.com/o/trophy2-min.jpg?alt=media&token=f8f0e718-5764-48e1-a50b-cd740f64ea68',4,'Intermédiaire ',NULL,NULL,NULL);
insert into `defis_lectures` (`id`,`description`,`image_url`,`nbre_total_livre`,`titre`,`date_debut`,`date_fin`,`utilisateur_id`) values (3,'Excellent, Continuez ..','https://firebasestorage.googleapis.com/v0/b/onesignal-9d554.appspot.com/o/trophy3-min.jpg?alt=media&token=d8b3ef7f-c173-4b97-8012-0f1265c87a81',6,'Expert',NULL,NULL,NULL);

/*Table structure for table `hibernate_sequence` */

DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `hibernate_sequence` */

insert into `hibernate_sequence` (`next_val`) values (56);
insert into `hibernate_sequence` (`next_val`) values (56);

/*Table structure for table `livres` */

DROP TABLE IF EXISTS `livres`;

CREATE TABLE `livres` (
  `isbn` varchar(255) NOT NULL,
  `auteur` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`isbn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `livres` */

insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2266290701','Marc Levy','Super, une nappe à colorier ! Des heures d\"amusement en perspective, à partager bien évidemment avec sa famille et ses amis !','https://images-na.ssl-images-amazon.com/images/I/41G81OmablL._SX303_BO1,204,203,200_.jpg','Une autre idée du bonheur');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965412','Michelle Obama','Il y a encore tant de choses que j\'ignore au sujet de l\'Amérique, de la vie, et de ce que l\'avenir nous réserve. Mais je sais qui je suis. Mon père, Fraser, m\'a appris à travailler dur, à rire souvent et à tenir parole.','https://images-na.ssl-images-amazon.com/images/I/41cZftVwUXL._SX324_BO1,204,203,200_.jpg','Devenir');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965413','Cyprien','Hugo est un jeune homme de son temps, accro à Internet et aux jeux vidéo, entre deux petits boulots. Il voit sa vie soudainement bouleversée le jour où il trouve dans son salon un robot doté d\'une intelligence artificielle.','https://images-na.ssl-images-amazon.com/images/I/511FSVLgjPL._SX335_BO1,204,203,200_.jpg','Roger et ses humains - tome 1');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965414','Cyprien','Roger, le robot intelligent, a fini par apprivoiser son loser d\'humain, Hugo. Sans pour autant oublier la tendance de ce dernier à préférer la PLS à Pôle emploi et la PS4 aux soirées entre amis.','https://images-na.ssl-images-amazon.com/images/I/51POHVtQsEL._SX331_BO1,204,203,200_.jpg','Roger et ses humains - tome 2');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965415','J. K. Rowling','Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l\'emmener à Poudlard, une école de sorcellerie !','https://images-na.ssl-images-amazon.com/images/I/51egAWrxs3L._SX346_BO1,204,203,200_.jpg','Harry Potter à l\'école des sorciers');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965416','J. K. Rowling','Une rentrée fracassante en voiture volante, une étrange malédiction quis\'abat sur les élèves, cette deuxième année à l\'école des sorciers ne s\'annonce pas de tout repos ! ','https://images-na.ssl-images-amazon.com/images/I/51SXJtzUeML._SX346_BO1,204,203,200_.jpg','Harry Potter et la Chambre des Secrets');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965417','J. K. Rowling','Dans un monde de plus en plus inquiétant, Harry se prépare à retrouver Ron et Hermione. Bientôt, ce sera la rentrée à Poudlard, avec les autres étudiants de sixième année. ','https://images-na.ssl-images-amazon.com/images/I/51AbaS6Xq7L._SX346_BO1,204,203,200_.jpg','Harry Potter et le Prince de Sang-Mêlé');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965418','J. K. Rowling','Sirius Black, le dangereux criminel qui s\'est échappé de la forteresse d\'Azkaban, recherche Harry Potter. C\'est donc sous bonne garde que l\'apprenti sorcier fait sa troisième rentrée.','https://images-na.ssl-images-amazon.com/images/I/51Fu0v5LcfL._SX346_BO1,204,203,200_.jpg','Harry Potter et le prisonnier d\'Azkaban');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965419','J. K. Rowling','À quinze ans, Harry entre en cinquième année à Poudlard, mais il n\'a jamais été si anxieux. L\'adolescence, la perspective des examens et ces étranges cauchemars... ','https://images-na.ssl-images-amazon.com/images/I/515HTEZdHOL._SX346_BO1,204,203,200_.jpg','Harry Potter et l\'Ordre du Phénix');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965420','J. K. Rowling','Harry Potter a quatorze ans et entre en quatrième année à Poudlard. Une grande nouvelle attend Harry, Ron et Hermione à leur arrivée : la tenue d\'un tournoi de magie exceptionnel entre les plus célèbres écoles de sorcellerie.','https://images-na.ssl-images-amazon.com/images/I/51TxleRCAfL._SX346_BO1,204,203,200_.jpg','Harry Potter et la Coupe de Feu');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965421','J. K. Rowling','Cette année, Harry a dix-sept ans et ne retourne pas à Poudlard. Avec Ron et Hermione, il se consacre à la dernière mission confiée par Dumbledore. Mais le Seigneur des Ténèbres règne en maître.','https://images-na.ssl-images-amazon.com/images/I/51A-5PmudyL._SX346_BO1,204,203,200_.jpg','Harry Potter et les Reliques de la Mort');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965422','Ashlee Vance','Elon Musk fait partie de ceux qui changent les règles du jeu. Largement considéré comme le plus grand industriel du moment, il porte l\'innovation à des niveaux rarement atteints au point d\'avoir servi de modèle pour Tony Stark, alias Iron man.','https://images-na.ssl-images-amazon.com/images/I/51XDYOsV3xL._SX331_BO1,204,203,200_.jpg','Elon Musk');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965423','Peter Thiel','Comment construire le futur pour l\'homme qui a créé PayPal et investi dans Facebook, SpaceX et Linkedin.','https://images-na.ssl-images-amazon.com/images/I/415QLoxLJRL._SX312_BO1,204,203,200_.jpg','De zéro à un');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965424','Don Miguel Ruiz','Dans son best-seller mondial, Les Quatre Accords Toltèques, Don Miguel Ruiz révélait comment le processus éducatif, notre \'domestication\', nous fait oublier la sagesse inhérente avec laquelle nous venons au monde.','https://images-na.ssl-images-amazon.com/images/I/51pQWa3qbHL._SX352_BO1,204,203,200_.jpg','Le cinquième Accord Toltèque');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965425','Eckhart Tolle','Le pouvoir du moment présent est probablement l\'un des livres les plus importants de notre époque. Son enseignement simple et néanmoins profond a aidé des millions de gens à travers le monde à trouver la paix intérieure.','https://images-na.ssl-images-amazon.com/images/I/51ZZ5iLP%2BML._SX307_BO1,204,203,200_.jpg','Le pouvoir du moment présent');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965426','Paulo Coelho','Santiago, un jeune berger andalou, part à la recherche d\'un trésor enfoui au pied des Pyramides.\nLorsqu\'il rencontre l\'Alchimiste dans le désert, celui-ci lui apprend à écouter son cœur, à lire les signes du destin..','https://images-na.ssl-images-amazon.com/images/I/41fDeh9mhIL._SX307_BO1,204,203,200_.jpg','L\'Alchimiste');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965428','Paulo Coelho','Recueil de paraboles inspirées à l\'auteur par les sources et les folklores les plus divers, Maktub est un véritable trésor de sagesse.','https://images-na.ssl-images-amazon.com/images/I/31-z-XuQYGL._SX307_BO1,204,203,200_.jpg','Maktub');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965429','Paulo Coelho','Ces pages contiennent les récits de certains moments que j\'ai vécus, des histoires que l\'on m\'a racontées, des réflexions que je me suis faites pendant que je parcourais un certaine étape du fleuve de ma vie.','https://images-na.ssl-images-amazon.com/images/I/41ECtARqCuL._SX307_BO1,204,203,200_.jpg','Comme le fleuve qui coule');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965430','Paulo Coelho','Je dois me reconstruire et, pour la première fois de toute mon existence, accepter que j\'aime un être humain plus que moi-même','https://images-na.ssl-images-amazon.com/images/I/41uWeYi6RgL._SX307_BO1,204,203,200_.jpg','Le Zahir');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965431','Guillaume Musso','un chirurgien réputé. Il nagerait dans le bonheur le plus total si Ilena, la femme de sa vie, n\'était pas morte trente ans auparavant. Mais, un jour, il fait une rencontre étrange : un homme lui donne l\'opportunité de revenir en arrière.','https://images-na.ssl-images-amazon.com/images/I/41KBP2ZQGuL._SX303_BO1,204,203,200_.jpg','Seras-tu là ?');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965432','Guillaume Musso','À huit ans, Nathan s\'est noyé en plongeant dans un lac pour sauver une fillette.\nArrêt cardiaque, tunnel de lumière, mort clinique.\nEt puis, contre toute attente, de nouveau la vie.','https://images-na.ssl-images-amazon.com/images/I/41cVOTXOYfL._SX303_BO1,204,203,200_.jpg','Et après...');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965433','Miguel Ruiz','Don Miguel révèle la source des croyances limitatrices qui nous privent de joie et créent des souffrances inutiles. Il montre en des termes très simples comment on peut se libérer du conditionnement collectif.','https://images-na.ssl-images-amazon.com/images/I/51TUvGNRqvL._SX307_BO1,204,203,200_.jpg','Les quatre accords toltèques');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965434','Paulo Coelho','Décider. Changer. Se réinventer. Agir. Expérimenter. Réussir. Oser. Rêver. Gagner. Découvrir. Eloigner. S\'engager. Penser. Croire. Nous avons parfois besoin de redonner un sens à notre vie.','https://images-na.ssl-images-amazon.com/images/I/414yaeRJwvL._SX307_BO1,204,203,200_.jpg','Aleph');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('2287965436','Marc Levy',' Marc Levy est un multi-instrumentiste de l’imaginaire… La plus jolie des comédies romantiques. Tout est sourire dans ce roman. Entrez au 12 de la Cinquième Avenue. Vous verrez, c’est du plaisir à tous les étages.','https://images-na.ssl-images-amazon.com/images/I/51R2cJitdDL._SX309_BO1,204,203,200_.jpg','Une fille comme elle');
insert into `livres` (`isbn`,`auteur`,`description`,`image_url`,`titre`) values ('8755544441',' Françoise BOURDIN','Les rêves les plus fous s\'accomplissent dans les vies sans réserve.Découvrez le roman d\'un homme qui rêvait de distraire les tigres... ','https://images-na.ssl-images-amazon.com/images/I/41pJbtp1hJL._SX315_BO1,204,203,200_.jpg','Gran Paradiso');

/*Table structure for table `livres_defis` */

DROP TABLE IF EXISTS `livres_defis`;

CREATE TABLE `livres_defis` (
  `defis_lectures_id` int(11) NOT NULL,
  `livres_isbn` varchar(255) NOT NULL,
  KEY `FKt8n01ucuionww82o22elmf22a` (`livres_isbn`),
  KEY `FKp1yh87bjgknymxsfrorqrlyaa` (`defis_lectures_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `livres_defis` */

/*Table structure for table `utili_livre_done` */

DROP TABLE IF EXISTS `utili_livre_done`;

CREATE TABLE `utili_livre_done` (
  `note` int(11) DEFAULT NULL,
  `user_done_id` int(11) NOT NULL,
  `livre_done_isbn` varchar(255) NOT NULL,
  PRIMARY KEY (`user_done_id`,`livre_done_isbn`),
  KEY `FKspa8an2bk8etms6hptbs9m7ce` (`livre_done_isbn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `utili_livre_done` */

insert into `utili_livre_done` (`note`,`user_done_id`,`livre_done_isbn`) values (3,10,'2287965413');
insert into `utili_livre_done` (`note`,`user_done_id`,`livre_done_isbn`) values (3,10,'2287965420');
insert into `utili_livre_done` (`note`,`user_done_id`,`livre_done_isbn`) values (4,10,'2287965426');
insert into `utili_livre_done` (`note`,`user_done_id`,`livre_done_isbn`) values (4,10,'2287965434');

/*Table structure for table `utilisateur_roles` */

DROP TABLE IF EXISTS `utilisateur_roles`;

CREATE TABLE `utilisateur_roles` (
  `utilisateur_id` int(11) NOT NULL,
  `roles` int(11) DEFAULT NULL,
  KEY `FK7fm9de8itma0gr6wpblfr5o0o` (`utilisateur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `utilisateur_roles` */

insert into `utilisateur_roles` (`utilisateur_id`,`roles`) values (9,0);
insert into `utilisateur_roles` (`utilisateur_id`,`roles`) values (10,1);
insert into `utilisateur_roles` (`utilisateur_id`,`roles`) values (55,1);

/*Table structure for table `utilisateurs` */

DROP TABLE IF EXISTS `utilisateurs`;

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT 'default.png',
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `utilisateurs` */

insert into `utilisateurs` (`id`,`email`,`password`,`username`,`image_name`,`nom`,`prenom`) values (9,'admin@email.com','$2a$12$i1dLSyBW1Xi0EiqL7m4DWes0AkkwAZQjnq1vrLJXf/VC8Z1syjxI6','admin',NULL,NULL,NULL);
insert into `utilisateurs` (`id`,`email`,`password`,`username`,`image_name`,`nom`,`prenom`) values (10,'client@email.com','$2a$12$0z20VhMqgRJ/bkr90pfZreh1vptKFYzC6tO5xaPJCvCfcEOB1pxh.','Houssem','hs.png',NULL,NULL);
insert into `utilisateurs` (`id`,`email`,`password`,`username`,`image_name`,`nom`,`prenom`) values (55,'ali@email.com','$2a$12$enX8ppt1OsmBXspFREmOd.H9heLmD7ac9klTwH/8mGogfr/sd3/jy','ali','default.png',NULL,NULL);

/*Table structure for table `utilisateurs_defis_lectures` */

DROP TABLE IF EXISTS `utilisateurs_defis_lectures`;

CREATE TABLE `utilisateurs_defis_lectures` (
  `utilisateur_id` int(11) NOT NULL,
  `defis_lectures_id` int(11) NOT NULL,
  KEY `FKlohxbkjg22soo1ji67x84wu4j` (`defis_lectures_id`),
  KEY `FKj2koji8ks4p0i74wd896v19oy` (`utilisateur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `utilisateurs_defis_lectures` */

insert into `utilisateurs_defis_lectures` (`utilisateur_id`,`defis_lectures_id`) values (10,2);
insert into `utilisateurs_defis_lectures` (`utilisateur_id`,`defis_lectures_id`) values (10,0);

/*Table structure for table `utilisateurs_livres` */

DROP TABLE IF EXISTS `utilisateurs_livres`;

CREATE TABLE `utilisateurs_livres` (
  `utilisateurs_id` int(11) NOT NULL,
  `livres_isbn` varchar(255) NOT NULL,
  KEY `FK840e6xdwk0ou89tu3hxrp0tt9` (`livres_isbn`),
  KEY `FKn5uw5b30hpac8cr34axkbbmmc` (`utilisateurs_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `utilisateurs_livres` */

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
