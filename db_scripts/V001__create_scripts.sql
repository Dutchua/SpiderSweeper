CREATE DATABASE SpiderSweeper;
go

CREATE TABLE [User] (
  [UserID] int IDENTITY(1,1),
  [Username] varchar(50),
  PRIMARY KEY ([UserID])
);

CREATE TABLE [HighScore] (
  [HighScoreID] int IDENTITY(1,1),
  [UserID] int,
  [Score] int,
  [Date] datetime,
  PRIMARY KEY ([HighScoreID]),
  CONSTRAINT [FK_HighScore.UserID]
    FOREIGN KEY ([UserID])
      REFERENCES [User]([Username])
);

