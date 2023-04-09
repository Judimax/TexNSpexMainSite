USE master;
GO

-- Create extended event session
CREATE EVENT SESSION [Deadlocks0] ON SERVER

ADD EVENT sqlserver.xml_deadlock_report

ADD TARGET package0.asynchronous_file_target
    (SET filename = N'/home/users/mssql/TimShoes/Deadlocks/Deadlocks.xel');
GO

-- Start the new session
ALTER EVENT SESSION [Deadlocks0] ON SERVER STATE = START;
