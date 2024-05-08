insert into Users(Username)
values ('test')
;

insert into HighScore(UserID, Score)
values ((select top 1 UserID from Users where Username = 'test'), '10:10:10')