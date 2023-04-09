SELECT * 
INTO ShipmentDetailsColumnStore
FROM dbo.ShipmentDetails
GO

SELECT COUNT(*) FROM dbo.ShipmentDetails


INSERT INTO dbo.ShipmentDetailsColumnStore
(
    ShipmentID,
    CustomsCodeID,
    Mass,
    Volume,
    NumberOfContainers,
    IsTemperatureControlled,
    IsHazardous,
    IsLivestock
)
SELECT ShipmentID,
       CustomsCodeID,
       Mass,
       Volume,
       NumberOfContainers,
       IsTemperatureControlled,
       IsHazardous,
       IsLivestock
FROM dbo.ShipmentDetails

GO 

