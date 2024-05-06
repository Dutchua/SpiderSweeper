-- Create a custom function to validate the name and surname format using regex
use SpiderSweeper;
go


alter table HighScore
add constraint Check_score Check(Score >=0)
;
go

