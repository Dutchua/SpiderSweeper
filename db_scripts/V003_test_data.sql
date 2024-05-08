insert into Users(Username)
values ('test')
;
go

insert into HighScore(UserID, Score)
values ((select top 1 UserID from Users where Username = 'test'), 10)