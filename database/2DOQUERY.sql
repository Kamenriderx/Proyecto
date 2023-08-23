-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-------------------------------------------------------
-- COLUMNAS NUEVAS
-------------------------------------------------------
ALTER TABLE `test`.`student` 
ADD COLUMN `CANCELLATION_PAYMENT` INT NULL DEFAULT 0 AFTER `REGISTRATION_PAYMENT`,
ADD COLUMN `CHANGE_CENTER_PAYMENT` INT NULL DEFAULT 0 AFTER `CANCELLATION_PAYMENT`,
ADD COLUMN `CHANGE_CAREER_PAYMENT` INT NULL DEFAULT 0 AFTER `CHANGE_CENTER_PAYMENT`;
ALTER TABLE `test`.`student` 
DROP COLUMN `CANCELLATION_PAYMENT`;


-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`role` (
  `ID_ROLE` INT NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` VARCHAR(20) NOT NULL,
  `DESCRIPTION` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID_ROLE`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`user_`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`user_` (
  `ID_USER` INT NOT NULL AUTO_INCREMENT,
  `LAST_CONNECTION` DATE NULL DEFAULT NULL,
  `ID_ROLE` INT NULL DEFAULT NULL,
  `USER_PASSWORD` VARCHAR(500) NOT NULL,
  `ACCOUNT_NUMBER` VARCHAR(11) NOT NULL,
  `NAME` VARCHAR(100) NULL DEFAULT '-',
  `DNI` VARCHAR(50) NULL DEFAULT '-',
  `CENTER` VARCHAR(20) NULL DEFAULT '-',
  `EMAIL` VARCHAR(50) NULL DEFAULT '-',
  `VERIFICATION_CODE` VARCHAR(10) NULL DEFAULT '-',
  PRIMARY KEY (`ID_USER`),
  INDEX `ID_ROLE_idx` (`ID_ROLE` ASC) VISIBLE,
  CONSTRAINT `ID_ROLE`
    FOREIGN KEY (`ID_ROLE`)
    REFERENCES `test`.`role` (`ID_ROLE`))
ENGINE = InnoDB
AUTO_INCREMENT = 21392
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`administrator` (
  `ID_ADMINISTRATOR` INT NOT NULL AUTO_INCREMENT,
  `ID_USER` INT NOT NULL,
  `DATE_OF_HIRE` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_ADMINISTRATOR`),
  INDEX `ID_USER` (`ID_USER` ASC) VISIBLE,
  CONSTRAINT `administrator_ibfk_1`
    FOREIGN KEY (`ID_USER`)
    REFERENCES `test`.`user_` (`ID_USER`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`permissions` (
  `ID_PERMISSION` INT NOT NULL AUTO_INCREMENT,
  `PERMISSION_NAME` VARCHAR(20) NOT NULL,
  `PERMISSION_DESCRIPTION` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID_PERMISSION`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`person_`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`person_` (
  `ID_Person_` INT NOT NULL,
  `P_NAME` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_Person_`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`professor` (
  `ID_PROFFERSSOR` INT NOT NULL AUTO_INCREMENT,
  `ID_USER` INT NULL DEFAULT NULL,
  `DATE_OF_HIRE` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `PROFILE_PHOTO` TEXT NULL DEFAULT NULL,
  `CAREER` VARCHAR(45) NULL DEFAULT NULL,
  `INSTITUTIONAL_EMAIL` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_PROFFERSSOR`),
  INDEX `ID_USER` (`ID_USER` ASC) VISIBLE,
  CONSTRAINT `professor_ibfk_1`
    FOREIGN KEY (`ID_USER`)
    REFERENCES `test`.`user_` (`ID_USER`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`role_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`role_permission` (
  `ID_ROLE_PERMISSION` INT NOT NULL AUTO_INCREMENT,
  `ID_ROLE` INT NOT NULL,
  `ID_PERMISSION` INT NOT NULL,
  PRIMARY KEY (`ID_ROLE_PERMISSION`),
  INDEX `ID_ROLE` (`ID_ROLE` ASC) VISIBLE,
  INDEX `ID_PERMISSION` (`ID_PERMISSION` ASC) VISIBLE,
  CONSTRAINT `role_permission_ibfk_1`
    FOREIGN KEY (`ID_ROLE`)
    REFERENCES `test`.`role` (`ID_ROLE`),
  CONSTRAINT `role_permission_ibfk_2`
    FOREIGN KEY (`ID_PERMISSION`)
    REFERENCES `test`.`permissions` (`ID_PERMISSION`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`sequence` (
  `next` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`next`))
ENGINE = InnoDB
AUTO_INCREMENT = 21357
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`student` (
  `ID_STUDENT` INT NOT NULL AUTO_INCREMENT,
  `ID_USER` INT NULL DEFAULT NULL,
  `YEAR_OF_INCOME` DATETIME NULL DEFAULT NULL,
  `STATE` TEXT NULL DEFAULT NULL,
  `INSTITUTIONAL_EMAIL` VARCHAR(255) NULL DEFAULT NULL,
  `CAREER` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`ID_STUDENT`),
  INDEX `ID_USER` (`ID_USER` ASC) VISIBLE,
  CONSTRAINT `student_ibfk_1`
    FOREIGN KEY (`ID_USER`)
    REFERENCES `test`.`user_` (`ID_USER`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 21266
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `test`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`user_role` (
  `ID_USER_ROLE` INT NOT NULL AUTO_INCREMENT,
  `ID_USER` INT NOT NULL,
  `ID_ROLE` INT NOT NULL,
  PRIMARY KEY (`ID_USER_ROLE`),
  INDEX `ID_USER` (`ID_USER` ASC) VISIBLE,
  INDEX `ID_ROLE` (`ID_ROLE` ASC) VISIBLE,
  CONSTRAINT `user_role_ibfk_1`
    FOREIGN KEY (`ID_USER`)
    REFERENCES `test`.`user_` (`ID_USER`),
  CONSTRAINT `user_role_ibfk_2`
    FOREIGN KEY (`ID_ROLE`)
    REFERENCES `test`.`role` (`ID_ROLE`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `test` ;

-- -----------------------------------------------------
-- procedure sp_createStudent
-- -----------------------------------------------------

DELIMITER $$
USE `test`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createStudent`(
    IN role INT,
    IN name VARCHAR(50),
    IN dni VARCHAR(20),
    IN center VARCHAR(20),
    IN email VARCHAR(255),
    IN career VARCHAR(100),
    IN institutional_email text,
	IN user_password VARCHAR(500)
    )
BEGIN
    CALL sp_createUser(role,name,dni,center,email,user_password);
    INSERT INTO STUDENT(id_user,career,institutional_email,year_of_income) VALUES(LAST_INSERT_ID(),career,institutional_email,CURRENT_DATE());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_createUser
-- -----------------------------------------------------

DELIMITER $$
USE `test`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createUser`(IN role INT,IN name VARCHAR(50),IN dni VARCHAR(20),IN center VARCHAR(20),IN email VARCHAR(255), IN user_password VARCHAR(500))
BEGIN

    DECLARE accountNumber VARCHAR(20);
    DECLARE register VARCHAR(4);
    DECLARE other VARCHAR(4);
    DECLARE folder VARCHAR(4);
    DECLARE currentYear YEAR;
    DECLARE returnValue INT;

    CALL sp_nextValue(@returnValue);
    
    SET currentYear = YEAR(CURRENT_DATE);
    SET register = LPAD(MOD((@returnValue DIV 2500), 100), 3, '0');
    SET other = LPAD(MOD((@returnValue DIV 50), 50), 2, '0');
    SET folder = LPAD(MOD(@returnValue, 50), 2, '0');

    SET @accountNumber = CONCAT(currentYear, register, other, folder);

       /* SET @pass = CONCAT(
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZ', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('abcdefghijklmnopqrstuvwxyz', FLOOR(RAND() * 26) + 1, 1),
        SUBSTRING('!@#$%^&*()', FLOOR(RAND() * 10) + 1, 1),
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()', FLOOR(RAND() * 70) + 1, 1),
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()', FLOOR(RAND() * 70) + 1, 1),
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()', FLOOR(RAND() * 70) + 1, 1),
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()', FLOOR(RAND() * 70) + 1, 1),
        SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()', FLOOR(RAND() * 70) + 1, 1)
    ); */
    
    INSERT INTO USER_(ID_ROLE,USER_PASSWORD,ACCOUNT_NUMBER,NAME,DNI,CENTER,EMAIL)
    VALUES (role,user_password,@accountNumber,name,dni,center,email);


END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_nextValue
-- -----------------------------------------------------

DELIMITER $$
USE `test`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_nextValue`(OUT nextValue INT)
BEGIN
    INSERT INTO `SEQUENCE` (next) VALUES (DEFAULT);
    
    SET nextValue = LAST_INSERT_ID();
END$$

DELIMITER ;

-----------------------------------------------------------
--- multimedia table 
-----------------------------------------------------------

CREATE TABLE `multimedia` (
  `ID_MULTIMEDIA` int NOT NULL AUTO_INCREMENT,
  `ID_USER` int DEFAULT NULL,
  `URL` text,
  `IS_PROFILE` int DEFAULT '0',
  PRIMARY KEY (`ID_MULTIMEDIA`),
  KEY `ID_USER` (`ID_USER`),
  CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user_` (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;