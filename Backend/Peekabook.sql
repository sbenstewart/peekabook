-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 15, 2018 at 11:30 PM
-- Server version: 5.5.60-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Peekabook`
--

-- --------------------------------------------------------

--
-- Table structure for table `Book`
--

CREATE TABLE IF NOT EXISTS `Book` (
  `Sno` int(10) NOT NULL AUTO_INCREMENT,
  `Name` varchar(40) NOT NULL,
  `Author` varchar(40) NOT NULL,
  `Isbn` varchar(15) NOT NULL,
  PRIMARY KEY (`Sno`),
  UNIQUE KEY `Isbn` (`Isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE IF NOT EXISTS `Student` (
  `Peekabookid` int(8) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `Contact` varchar(10) NOT NULL,
  `Department` varchar(40) NOT NULL,
  `Year` int(4) NOT NULL,
  `Locality` varchar(20) NOT NULL,
  PRIMARY KEY (`Peekabookid`),
  UNIQUE KEY `Contact` (`Contact`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20180000 ;

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE IF NOT EXISTS `Transaction` (
  `Peekabookid` int(8) NOT NULL,
  `Isbn` varchar(15) NOT NULL,
  `BookCondition` varchar(10) NOT NULL,
  `DateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Peekabookid`,`Isbn`,`BookCondition`,`DateTime`),
  KEY `Isbn` (`Isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Transaction`
--
ALTER TABLE `Transaction`
  ADD CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`Peekabookid`) REFERENCES `Student` (`Peekabookid`),
  ADD CONSTRAINT `Transaction_ibfk_2` FOREIGN KEY (`Isbn`) REFERENCES `Book` (`Isbn`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
