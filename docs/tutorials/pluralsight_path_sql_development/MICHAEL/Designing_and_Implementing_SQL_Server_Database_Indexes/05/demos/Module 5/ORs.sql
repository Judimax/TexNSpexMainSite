-- OR predicates


SELECT TransactionID, ReferenceShipmentID, InvoiceNumber FROM dbo.Transactions 
	WHERE ReferenceShipmentID = 452 OR InvoiceNumber = 'BBBC20425'

-- response 
CREATE NONCLUSTERED INDEX nc_idx_Transactoions_InvoiceNumber ON dbo.Transactions (InvoiceNumber)
CREATE NONCLUSTERED INDEX nc_idx_Transactoions_ReferenceShipmentID ON dbo.Transactions (ReferenceShipmentID)


-- here you can refactor this query to better understand your indexes
SELECT TransactionID, ClientID, Amount, TransactionType FROM dbo.Transactions 
	WHERE ClientID = 2875 AND (Amount > 2500 OR TransactionType = 'S')



SELECT TransactionID, ClientID, Amount, TransactionType FROM dbo.Transactions 
	WHERE ( ClientID = 2875 AND Amount > 2500) OR (ClientID = 2875  AND TransactionType = 'S')

-- resonse
CREATE NONCLUSTERED INDEX nc_idx_Transactoions_ClientIDAmount ON dbo.Transactions (ClientID, Amount)
CREATE NONCLUSTERED INDEX nc_idx_Transactoions_TransactionTypeClientID ON dbo.Transactions (TransactionType,ClientID)