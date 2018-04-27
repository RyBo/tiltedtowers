CREATE TABLE IF NOT EXISTS `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
