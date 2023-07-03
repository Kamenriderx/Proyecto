DELIMITER $$
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
DELIMITER $$
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
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_nextValue`(OUT nextValue INT)
BEGIN
    INSERT INTO `SEQUENCE` (next) VALUES (DEFAULT);
    
    SET nextValue = LAST_INSERT_ID();
END$$
DELIMITER ;