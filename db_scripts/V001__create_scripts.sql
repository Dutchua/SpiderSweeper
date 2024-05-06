use master;
drop database SpiderSweeper;
go

CREATE DATABASE SpiderSweeper;
go

use SpiderSweeper;
go

CREATE TABLE Users (
  UserID int IDENTITY(1, 1),
  Username varchar(50),
  PRIMARY KEY (UserID)
);
go

CREATE TABLE HighScore (
  HighScoreID int IDENTITY(1, 1),
  UserID int,
  Score int,
  tmstamp datetime default GETDATE(),
  PRIMARY KEY (HighScoreID),
  CONSTRAINT FK_HighScore_UserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go