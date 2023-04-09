
RESTORE FILELISTONLY
FROM DISK = '/home/mssql/project2/IST.BAK'

USE MASTER
GO
RESTORE DATABASE InterstellarTransport
FROM DISK = '/home/mssql/project2/IST.BAK'
WITH
MOVE 'InterstellarTransport' TO '/var/opt/mssql/data/InterstellarTransport.mdf',
MOVE 'InterstellarTransport_log' TO '/var/opt/mssql/data/InterstellarTransport_log.ldf',
NOUNLOAD,  REPLACE,  NOUNLOAD,  STATS = 5
GO
