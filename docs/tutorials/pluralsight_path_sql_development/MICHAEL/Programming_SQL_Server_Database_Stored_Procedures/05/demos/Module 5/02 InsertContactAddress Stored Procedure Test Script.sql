USE Contacts;

EXEC dbo.InsertContactAddress
	@ContactId = 22,
	@HouseNumber = '10',
	@Street = 'Downing Street',
	@City = 'London',
	@Postcode = 'SW1 2AA';
