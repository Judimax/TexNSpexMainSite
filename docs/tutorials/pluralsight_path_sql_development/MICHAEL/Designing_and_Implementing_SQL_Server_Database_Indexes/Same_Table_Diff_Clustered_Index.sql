USE InterstellarTransport

SELECT *
INTO TransactionsClusteredAll
FROM dbo.Transactions

CREATE CLUSTERED INDEX idx_TransactionsClusteredAll
  ON dbo.TransactionsClusteredAll(ReferenceShipmentID,ClientID,TransactionDate,TransactionType,Amount)
GO

SELECT *
INTO TransactionsClusteredAmount
FROM dbo.Transactions

CREATE CLUSTERED INDEX idx_TransactionsClusteredAmount
  ON dbo.TransactionsClusteredAmount(Amount)
GO

SELECT *
INTO TransactionsClusteredTransactionDate
FROM dbo.Transactions

CREATE CLUSTERED INDEX idx_TransactionsClusteredTransactionDate
  ON dbo.TransactionsClusteredTransactionDate(TransactionDate)
GO

