SELECT * FROM test.department;
ALTER TABLE `test`.`department` 
CHANGE COLUMN `createdAt` `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ;
INSERT INTO `test`.`department` (`ID_DEPARTMENT`, `NAME`) VALUES ('1', 'Ingenieria');
INSERT INTO `test`.`department` (`ID_DEPARTMENT`, `NAME`) VALUES ('2', 'Ciencias Sociales');
INSERT INTO `test`.`department` (`ID_DEPARTMENT`, `NAME`) VALUES ('3', 'Humanidades y Artes');
INSERT INTO `test`.`department` (`ID_DEPARTMENT`, `NAME`) VALUES ('4', 'Ciencias');
