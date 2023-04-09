USE InterstellarTransport
GO

SELECT OBJECT_NAME(object_id) AS TableName,
  used_page_count,
  reserved_page_count,
  row_count
FROM sys.dm_db_partition_stats
  WHERE OBJECT_NAME(object_id) IN ('TransactionsClusteredAll','TransactionsClusteredAmount','TransactionsClusteredTransactionDate')



-- SELECT * FROM dbo.TransactionsClusteredAll
-- SELECT * FROM dbo.TransactionsClusteredAmount
-- SELECT * FROM dbo.TransactionsClusteredTransactionDate

