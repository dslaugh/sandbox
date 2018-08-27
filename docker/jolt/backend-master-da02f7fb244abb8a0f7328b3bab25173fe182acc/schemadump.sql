# ************************************************************
# Sequel Pro SQL dump
# Version 4099
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Database: Dummy
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `test`;

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `classes` (name) VALUES ('Charms');
INSERT INTO `classes` (name) VALUES ('Care of Magical Creatures');
INSERT INTO `classes` (name) VALUES ('Flying');
INSERT INTO `classes` (name) VALUES ('Transfiguration');
INSERT INTO `classes` (name) VALUES ('Potions');
INSERT INTO `classes` (name) VALUES ('Defense Against the Dark Arts');

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL DEFAULT '',
  `lname` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `teachers` (fname, lname) VALUES ('Filius', 'Flitwick');
INSERT INTO `teachers` (fname, lname) VALUES ('Rubeus', 'Hagrid');
INSERT INTO `teachers` (fname, lname) VALUES ('Rolanda', 'Hooch');
INSERT INTO `teachers` (fname, lname) VALUES ('Minerva', 'McGonagall');
INSERT INTO `teachers` (fname, lname) VALUES ('Severus', 'Snape');
INSERT INTO `teachers` (fname, lname) VALUES ('Gilderoy', 'Lockhart');

DROP TABLE IF EXISTS `classes_teachers`;
CREATE TABLE `classes_teachers` (
  `class_id` int(11) unsigned NOT NULL,
  `teacher_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Charms' AND t.fname = 'Filius' AND t.lname = 'Flitwick';

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Care of Magical Creatures' AND t.fname = 'Rubeus' AND t.lname = 'Hagrid';

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Flying' AND t.fname = 'Rolanda' AND t.lname = 'Hooch';

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Transfiguration' AND t.fname = 'Minerva' AND t.lname = 'McGonagall';

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Potions' AND t.fname = 'Severus' AND t.lname = 'Snape';

INSERT INTO `classes_teachers` (`class_id`, `teacher_id`)
  SELECT c.id, t.id
  FROM `classes` c, `teachers` t
  WHERE c.name = 'Defense Against the Dark Arts' AND t.fname = 'Gilderoy' AND t.lname = 'Lockhart';


DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `books` (title) VALUES ("A Beginner's Guide to Transfiguration");
INSERT INTO `books` (title) VALUES ('Break with a Banshee');
INSERT INTO `books` (title) VALUES ('Wanderings with Werewolves');
INSERT INTO `books` (title) VALUES ('Magical Drafts and Potions');
INSERT INTO `books` (title) VALUES ('The Standard Book of Spells');
INSERT INTO `books` (title) VALUES ('The Monster Book of Monsters');

DROP TABLE IF EXISTS `books_classes`;
CREATE TABLE `books_classes` (
  `book_id` int(11) unsigned NOT NULL,
  `class_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = "A Beginner's Guide to Transfiguration" AND c.name = 'Transfiguration';

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = 'Break with a Banshee' AND c.name = 'Defense Against the Dark Arts';

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = 'Wanderings with Werewolves' AND c.name = 'Defense Against the Dark Arts';

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = 'Magical Drafts and Potions' AND c.name = 'Potions';

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = 'The Standard Book of Spells' AND c.name = 'Charms';

INSERT INTO `books_classes` (`book_id`, `class_id`)
  SELECT b.id, c.id
  FROM `books` b, `classes` c
  WHERE b.title = 'The Monster Book of Monsters' AND c.name = 'Care of Magical Creatures';


DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL DEFAULT '',
  `lname` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `students` (`fname`, `lname`) VALUES ('Harry', 'Potter');
INSERT INTO `students` (`fname`, `lname`) VALUES ('Hermione', 'Granger');
INSERT INTO `students` (`fname`, `lname`) VALUES ('Ron', 'Weasley');
INSERT INTO `students` (`fname`, `lname`) VALUES ('Draco', 'Malfoy');
INSERT INTO `students` (`fname`, `lname`) VALUES ('Seamus', 'Finnigan');
INSERT INTO `students` (`fname`, `lname`) VALUES ('Neville', 'Longbottom');


DROP TABLE IF EXISTS `classes_students`;
CREATE TABLE `classes_students` (
  `class_id` int(11) unsigned NOT NULL,
  `student_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Flying' AND s.fname = 'Harry' AND s.lname = 'Potter';

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Potions' AND s.fname = 'Ron' AND s.lname = 'Weasley';

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Transfiguration' AND s.fname = 'Neville' AND s.lname = 'Longbottom';

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Care of Magical Creatures' AND s.fname = 'Draco' AND s.lname = 'Malfoy';

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Charms' AND s.fname = 'Seamus' AND s.lname = 'Finnigan';

INSERT INTO `classes_students` (`class_id`, `student_id`)
  SELECT c.id, s.id
  FROM `classes` c, `students` s
  WHERE c.name = 'Defense Against the Dark Arts' AND s.fname = 'Hermione' AND s.lname = 'Granger';


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
