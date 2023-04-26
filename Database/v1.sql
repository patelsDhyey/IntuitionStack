
-- Database Creation
CREATE SCHEMA `intuitionStack`;

--Table Creations
CREATE TABLE `intuitionStack`.`Employees` (
  `empid` int PRIMARY KEY AUTO_INCREMENT,
  `empname` varchar(255),
  `empGUID` varchar(40),
  `empEmail` varchar(255),
  `empPhone` int(13),
  `empPassword` varchar(255),
  `empDesignationId` int,
  `empAddress` varchar(255),
  `empBadgeReceived` int,
  `empLocationId` int
);

CREATE TABLE IntuitionStatus.`Employees` (
	  `stsId` int PRIMARY KEY AUTO_INCREMENT,
    `StatusName` varchar(255)
);

CREATE TABLE `intuitionStack`.`Designations`(
	`desid` int PRIMARY KEY AUTO_INCREMENT,
  `DesignationName` varchar(255)
)

CREATE TABLE `intuitionStack`.`Locations`(
	`Lid` int PRIMARY KEY AUTO_INCREMENT,
    `LocationName` varchar (255),
    `LocationLDGID` int
);

CREATE TABLE `intuitionStack`.`UpvoteForIntuitions` (
  `upiId` int PRIMARY KEY AUTO_INCREMENT, 
  `upvoteIntuitionid` int,
  `upvoteByempid` int
);

CREATE TABLE `intuitionStack`.`LDG`(
	`LDGid` int PRIMARY KEY AUTO_INCREMENT,
    `LDGName` varchar (255)
);

CREATE TABLE `intuitionStack`.`Intuitions` (
  `intid` int PRIMARY KEY AUTO_INCREMENT,
  `intBrief` varchar(255),
  `intTags` varchar(255),
  `intDesc` varchar(1000),
  `intByEmpId` int,
  `intStatus` varchar(255),
  `intRecognized` varchar(255),
  `intDate` varchar(255),
  `intTime` varchar(255),
  `intTimeSpan` DATETIME,
  `intApprovedByEmpId` int,
);

CREATE TABLE `intuitionStack`.`Feedbacks` (
  `feedbackid` int PRIMARY KEY AUTO_INCREMENT,
  `feedbackByempid` int,
  `feedbackIntId` int,
  `feedbackComments` varchar(1000)
);

CREATE TABLE `intuitionStack`.`Solutions` (
  `solid` int PRIMARY KEY AUTO_INCREMENT,
  `Solution` varchar(255),
  `solByempid` int,
  `solForintid` int,
  `solComments` varchar(255),
  `solApproved` varchar(255),
  `solReviewedByempid` int,
  `solStatusId` int,
  `solImplementByempid` int
);

CREATE TABLE `intuitionStack`.`UpvoteForFeedbacks` (
  `Fid` int PRIMARY KEY AUTO_INCREMENT, 
  `upvoteFid` int,
  `upvoteByempid` int,
  `upvoteFIntId` int
);

CREATE TABLE `intuitionStack`.`UpvoteForSolutions` (
  `upsid` int PRIMARY KEY AUTO_INCREMENT, 
  `upvoteSolid` int,
  `upvoteByempid` int,
  `upvoteSolIntId` int
);

CREATE TABLE `intuitionStack`.`userTracker` (
  `LoginId` int PRIMARY KEY AUTO_INCREMENT, 
  `userId` int,
  `LoginTime` varchar(80),
  `LogoutTime` varchar(80),
  `UsageTime` varchar(80),
  `Token` varchar(80)
);

-- CREATE TABLE `intuitionStack`.`ComentsForFeedbacks` (
--   `commentsFid` int,
--   `commentsByempid` int,
--   `Comments` varchar(255),
--   `CommentsFeedbIntId` int
-- );

-- CREATE TABLE `intuitionStack`.`ComentsForSolutions` (
--   `commentssolid` int,
--   `commentsByempid` int,
--   `Comments` varchar(255),
--   `CommentsSolIntId` int
-- );

-- Set FOREIGN - Key - Update/Delete Disable to modify the records.
SET FOREIGN_KEY_CHECKS=0;

-- Set FOREIGN - Key - Update/Delete enable to block the records to modify.
SET FOREIGN_KEY_CHECKS=1;

-- Foreign Keys:

ALTER TABLE `intuitionStack`.`Intuitions` ADD FOREIGN KEY (`intByEmpId`) REFERENCES `intuitionStack`.`Employees` (`empid`);

ALTER TABLE `intuitionStack`.`Intuitions` ADD FOREIGN KEY (`intApprovedByEmpID`) REFERENCES `intuitionStack`.`Employees` (`empid`);

ALTER TABLE `intuitionStack`.`Feedbacks` ADD FOREIGN KEY(`feedbackByempid`) REFERENCES `intuitionStack`.`Employees` (`empid`);

ALTER TABLE `intuitionStack`.`Feedbacks` ADD FOREIGN KEY (`feedbackIntId`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`) ;

ALTER TABLE `intuitionStack`.`Solutions` ADD FOREIGN KEY (`solByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`)  ;

ALTER TABLE `intuitionStack`.`userTracker` ADD FOREIGN KEY (`userId`) REFERENCES `intuitionStack`.`Employees`  (`empid`)  ;

ALTER TABLE `intuitionStack`.`Solutions` ADD FOREIGN KEY (`solForintid`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`) ;

ALTER TABLE `intuitionStack`.`Solutions` ADD FOREIGN KEY (`solReviewedByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`);

ALTER TABLE `intuitionStack`.`Solutions` ADD FOREIGN KEY (`solImplementByempid`) REFERENCES `intuitionStack`.`Employees` (`empid`) ;

ALTER TABLE `intuitionStack`.`UpvoteForFeedbacks` ADD FOREIGN KEY (`upvoteFid`) REFERENCES `intuitionStack`.`Feedbacks`  (`feedbackid`);

ALTER TABLE `intuitionStack`.`UpvoteForFeedbacks` ADD FOREIGN KEY (`upvoteByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`);

ALTER TABLE `intuitionStack`.`UpvoteForSolutions` ADD FOREIGN KEY (`upvoteSolid`) REFERENCES `intuitionStack`.`Solutions` (`solid`);

ALTER TABLE `intuitionStack`.`UpvoteForSolutions` ADD FOREIGN KEY (`upvoteByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`);

-- ALTER TABLE `intuitionStack`.`ComentsForFeedbacks` ADD FOREIGN KEY (`commentsFid`) REFERENCES `intuitionStack`.`Feedbacks` (`feedbackid`) ;

-- ALTER TABLE `intuitionStack`.`ComentsForFeedbacks` ADD FOREIGN KEY (`commentsByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`);

-- ALTER TABLE `intuitionStack`.`ComentsForSolutions` ADD FOREIGN KEY (`commentssolid`) REFERENCES `intuitionStack`.`Solutions`  (`solid`);

-- ALTER TABLE `intuitionStack`.`ComentsForSolutions` ADD FOREIGN KEY (`commentsByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`);

ALTER TABLE `intuitionStack`.`Employees` ADD FOREIGN KEY (`empLocationId`) REFERENCES `intuitionStack`.`Locations`  (`Lid`);

ALTER TABLE `intuitionStack`.`Locations` ADD FOREIGN KEY (`LocationLDGID`) REFERENCES `intuitionStack`.`LDG` (`LDGid`);

ALTER TABLE `intuitionStack`.`Employees` ADD FOREIGN KEY (`empDesignationId`) REFERENCES `intuitionStack`.`Designations` (`desid`);

ALTER TABLE `intuitionStack`.`Intuitions` ADD FOREIGN KEY (`intStatusId`) REFERENCES `intuitionStack`.`IntuitionStatus` (`stsId`);

ALTER TABLE `intuitionStack`.`UpvoteForIntuitions` ADD FOREIGN KEY (`upvoteIntuitionid`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`) ;

ALTER TABLE `intuitionStack`.`UpvoteForIntuitions` ADD FOREIGN KEY (`upvoteByempid`) REFERENCES `intuitionStack`.`Employees`  (`empid`) ;

ALTER TABLE `intuitionStack`.`Solutions` ADD FOREIGN KEY (`solStatusId`) REFERENCES `intuitionStack`.`IntuitionStatus`( `stsId`) ;

ALTER TABLE `intuitionStack`.`UpvoteForSolutions` ADD FOREIGN KEY (`upvoteSolIntId`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`);

ALTER TABLE `intuitionStack`.`UpvoteForFeedbacks` ADD FOREIGN KEY (`upvoteFIntId`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`);

-- ALTER TABLE `intuitionStack`.`ComentsForSolutions` ADD FOREIGN KEY (`CommentsSolIntId`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`);

-- ALTER TABLE `intuitionStack`.`ComentsForFeedbacks` ADD FOREIGN KEY (`CommentsFeedbIntId`) REFERENCES `intuitionStack`.`Intuitions`  (`intid`);

TRUNCATE TABLE <<tableName>>; --to flush the table