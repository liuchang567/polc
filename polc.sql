/*
Navicat MySQL Data Transfer

Source Server         : th-gdmo
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : polc

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2019-07-25 16:17:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user_t`
-- ----------------------------
DROP TABLE IF EXISTS `user_t`;
CREATE TABLE `user_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(40) NOT NULL,
  `password` char(40) NOT NULL,
  `age` int(11) NOT NULL,
  `sex` char(10) NOT NULL,
  `address` char(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_t
-- ----------------------------
INSERT INTO `user_t` VALUES ('1', 'admin', '123456', '11', '1', 'cn_gz');
INSERT INTO `user_t` VALUES ('7', 'qwer', '111111', '1', '1', 'qwer');
