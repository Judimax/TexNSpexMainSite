USE TimShoes;
GO

BEGIN TRAN;

UPDATE Orders.Orders
SET OrderRequestedDate = '20200101'
WHERE OrderID = 1;

-- WAITFOR DELAY '00:00:04'
ROLLBACK;
