/*
Navicat MySQL Data Transfer

Source Server         : com
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-06-23 15:04:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for gly
-- ----------------------------
DROP TABLE IF EXISTS `gly`;
CREATE TABLE `gly` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT '',
  `password` varchar(20) DEFAULT '',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gly
-- ----------------------------
INSERT INTO `gly` VALUES ('1', 'zgm111', '123321');
INSERT INTO `gly` VALUES ('2', 'yxy1', '123456');
INSERT INTO `gly` VALUES ('3', 'zwt1', '1231');

-- ----------------------------
-- Table structure for hotel
-- ----------------------------
DROP TABLE IF EXISTS `hotel`;
CREATE TABLE `hotel` (
  `hotelid` varchar(4) NOT NULL,
  `hotelname` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `appraise` float(2,1) NOT NULL,
  `detailed` varchar(80) NOT NULL,
  `img` varchar(40) NOT NULL,
  PRIMARY KEY (`hotelid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel
-- ----------------------------
INSERT INTO `hotel` VALUES ('0001', '杭州金沙湖酒店', '成蹊苑', '4.9', '入住杭州的杭州金沙湖和达希尔顿嘉悦里酒店时，不妨到娱乐场试试手气。客人可以去咖啡馆找点吃的，也可以去24 小时健身中心运动一下。', '/pages/source/jsh.jpeg');
INSERT INTO `hotel` VALUES ('0002', '如家酒店', '桃李苑', '4.6', '住宿提供免费 Wi-Fi 和免费停车服务，让您保持连通，并来去自如。 住宿位于杭州建德区的绝佳位置，让您轻松探索热门景点和餐饮选择。', '/pages/source/leidisen.jpeg');
INSERT INTO `hotel` VALUES ('0003', '杭州千岛湖酒店', '38幢', '3.0', '千岛湖滨江希尔顿度假酒店位于千岛湖，依山面湖。酒店地理位置优越，距离淳安县商业区仅需几分钟车程。', '/pages/source/qdh.jpeg');
INSERT INTO `hotel` VALUES ('0004', '臭水沟', 'zgwt', '9.9', '酒店地处滨江高新区，毗邻钱塘江，与迷人的西湖隔江相望，周边配套一应俱全。', '/pages/source/voco.jpeg');

-- ----------------------------
-- Table structure for kfgl
-- ----------------------------
DROP TABLE IF EXISTS `kfgl`;
CREATE TABLE `kfgl` (
  `kfid` int(4) NOT NULL,
  `kflx` varchar(10) NOT NULL,
  `kfjg` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kfgl
-- ----------------------------
INSERT INTO `kfgl` VALUES ('1', '大床房', '9');
INSERT INTO `kfgl` VALUES ('2', '标间', '99');
INSERT INTO `kfgl` VALUES ('3', '双人床', '999');
INSERT INTO `kfgl` VALUES ('4', '三人床', '9999');
INSERT INTO `kfgl` VALUES ('5', '总统套房', '99999');
INSERT INTO `kfgl` VALUES ('6', '豪华标间', '999999');

-- ----------------------------
-- Table structure for occupation
-- ----------------------------
DROP TABLE IF EXISTS `occupation`;
CREATE TABLE `occupation` (
  `userid` varchar(4) NOT NULL,
  `hotelid` varchar(4) DEFAULT NULL,
  `room` int(1) DEFAULT NULL,
  `checkin` time(6) DEFAULT NULL,
  `checkout` time(6) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of occupation
-- ----------------------------
INSERT INTO `occupation` VALUES ('0002', '0002', '1', '12:00:42.000000', '20:00:47.000000');
INSERT INTO `occupation` VALUES ('0003', '0001', '4', '09:00:14.000000', '18:00:20.000000');
INSERT INTO `occupation` VALUES ('0005', '0001', '1', '14:52:10.000000', '14:52:27.000000');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` int(1) NOT NULL,
  `phone` varchar(11) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'root', '123', '1', '12345678978');
INSERT INTO `users` VALUES ('4', 'zwtttttt', '123', '10', '987654321');
INSERT INTO `users` VALUES ('5', '123', '123', '10', '342342');
INSERT INTO `users` VALUES ('20', 'aaa', '123321', '10', '12312413');
