SELECT COUNT(*) FROM dbo.ShipmentDetailsColumnStore;







SELECT object_id,
       index_id,
       used_page_count,
       reserved_page_count,
       row_count
FROM sys.dm_db_partition_stats WHERE OBJECT_ID = OBJECT_ID('ShipmentDetailsColumnStore')

-- 43534 pages as a heap
-- 14273 pages as a clustered columnstore
-- 11433 pages as a nonclustered columnstore





CREATE CLUSTERED COLUMNSTORE INDEX idx_ShipmentDetails ON dbo.ShipmentDetailsColumnStore

DROP INDEX idex_ShipmentDetails ON dbo.ShipmentDetailsColumnStore
SELECT * FROM sys.indexes WHERE OBJECT_ID = OBJECT_ID('ShipmentDetailsColumnStore') 





CREATE NONCLUSTERED COLUMNSTORE INDEX idx_ShipmentDetails ON dbo.ShipmentDetailsColumnStore (Mass,Volume,ShipmentID)
DROP INDEX idx_ShipmentDetails ON dbo.ShipmentDetailsColumnStore

SELECT * FROM sys.indexes WHERE OBJECT_ID = OBJECT_ID('ShipmentDetailsColumnStore')


-- good for columnstore
SELECT ShipmentID,
       SUM(sd.Mass) AS TotalMass,
       SUM(sd.Volume) AS TotalVolume,
       SUM(sd.NumberOfContainers) AS TotalContainers
FROM dbo.ShipmentDetailsColumnStore sd
WHERE ShipmentID = 22322
GROUP BY ShipmentID


-- bad for column store
CREATE NONCLUSTERED INDEX nc_idx_ShipmentDetails_ShipmentID on dbo.ShipmentDetailsColumnStore(ShipmentID)
SELECT * FROM dbo.ShipmentDetailsColumnStore WHERE ShipmentID = 22322

-- heap    CPU time = 12392 ms,  elapsed time = 2028 ms.
-- clustered columnstore    CPU time = 859 ms,  elapsed time = 413 ms.
-- nonclustered columnstore   CPU time = 921 ms,  elapsed time = 374 ms.

ALTER INDEX idex_ShipmentDetails ON dbo.ShipmentDetailsColumnStore REBUILD