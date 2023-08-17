SELECT * FROM test.requirements_course ;
SELECT * FROM test.enrollment ;

SELECT c.NAME,COUNT(c.NAME) as cantidad_requerimientos FROM test.course as c inner join test.requirements_course as rc on c.ID_COURSE = rc.ID_COURSE group by c.NAME; 
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('1', '2', '39', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('2', '38', '36', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('3', '40', '36', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('4', '40', '37', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`) VALUES ('5', '41', '40');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('6', '39', '36', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('7', '39', '1', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('8', '45', '38', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('9', '45', '40', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`) VALUES ('10', '42', '41');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`) VALUES ('11', '46', '45');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('12', '3', '42', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('13', '3', '45', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('14', '43', '39', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('15', '44', '41', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('16', '4', '2', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('17', '5', '4', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('18', '6', '3', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('19', '7', '4', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('20', '7', '43', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('21', '8', '5', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('22', '8', '44', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('23', '9', '3', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('24', '10', '6', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('25', '11', '7', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('26', '13', '8', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('27', '16', '10', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('28', '12', '5', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('29', '15', '10', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('30', '19', '16', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('31', '14', '12', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('32', '23', '19', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('33', '23', '11', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('34', '20', '43', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('35', '18', '14', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('36', '21', '20', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('37', '26', '23', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('38', '17', '13', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('39', '17', '14', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('40', '22', '18', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('41', '24', '21', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('42', '25', '22', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('43', '27', '23', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('44', '29', '27', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('45', '28', '24', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('46', '31', '27', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('47', '32', '16', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('48', '34', '24', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('49', '33', '17', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('50', '35', '16', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`, `ID_CAREER`) VALUES ('51', '30', '27', '1');
INSERT INTO `test`.`requirements_course` (`ID_REQUIREMENTS_COURSE`, `ID_COURSE`, `REQUIREMENT_ID_COURSE`) VALUES ('52', '49', '48');