SELECT ss.Location, s.ShipmentID, s.OriginStationID
	FROM dbo.Stations ss 
		INNER HASH JOIN dbo.Shipments s ON s.OriginStationID = ss.StationID
	WHERE ss.Location = 'Outer Transfer'


CREATE NONCLUSTERED INDEX nc_idx_Shipments_OriginStationID on dbo.Shipments (OriginStationID)


SELECT *
FROM dbo.Stations

SELECT *
	FROM dbo.Shipments 
	WHERE OriginStationID = 5
	ORDER BY OriginStationID ASC