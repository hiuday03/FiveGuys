create database duantotnghiepdb
go

use duantotnghiepdb
go

create table Roles
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Vouchers
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(20),
	Name		nvarchar(100),
	Value		decimal(20,0),
	MinimumTotalAmount		decimal(20,0),
	Quantity	int,
	Describe	nvarchar(MAX),
	StartDate	datetime,
	EndDate		datetime,
	CreatedAt	datetime,
	UpdatedAt	datetime,
	CreatedBy	nvarchar(100),
	UpdatedBy	nvarchar(100),
	Status		int
)

create table PaymentMethods
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Materials
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Categories
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Colors
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Sizes
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Employees
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(100),
	Avatar		nvarchar(100),
	Account		nvarchar(100),
	Password	nvarchar(100),
	PhoneNumber	nvarchar(15),
	Email		nvarchar(100),
	BirthDate	datetime,
	Gender		bit,
	Address		nvarchar(MAX),
	IdRole		bigint references Roles(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	CreatedBy	nvarchar(100),
	UpdatedBy	nvarchar(100),
	Status		int
)

create table Customers
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(100),
	Avatar		nvarchar(MAX),
	Account		nvarchar(100),
	Password	nvarchar(100),
	PhoneNumber	nvarchar(15),
	Email		nvarchar(100),
	BirthDate	datetime,
	Gender		bit,
	Address		nvarchar(MAX),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	CreatedBy	nvarchar(100),
	UpdatedBy	nvarchar(100),
	Status		int
)

create table Address
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	PhoneNumber	nvarchar(15),
	Address		nvarchar(MAX),
	AddressType	nvarchar(100),
	IdCustomer	bigint references Customers(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Products
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(20),
	Name		nvarchar(100),
	Collar		nvarchar(100),
	Wrist		nvarchar(100),
	Describe	nvarchar(MAX),
	Brand		nvarchar(100),
	IdCategory	bigint references Categories(Id),
	IdMaterial	bigint references Materials(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	CreatedBy	nvarchar(100),
	UpdatedBy	nvarchar(100),
	Status		int
)

create table ProductDetails
(
	Id			bigint identity(1,1) primary key,
	ImportPrice	decimal(20,0),
	Price		decimal(20,0),
	Quantity	int,
	IdProduct	bigint references Products(Id),
	IdSize		bigint references Sizes(Id),
	IdColor		bigint references Colors(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	CreatedBy	nvarchar(100),
	UpdatedBy	nvarchar(100),
	Status		int
)

create table Images
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	Path		nvarchar(MAX),
	IdProductDetail		bigint references ProductDetails(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Bills
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(20),
	CreatedAt	datetime,
	PaymentDate	datetime,
	TotalAmount	decimal(20,0),
	TotalAmountAfterDiscount	decimal(20,0),
	ReciverName	nvarchar(100),
	DeliveryDate		datetime,
	ShippingFee	decimal(20,0),
	Address		nvarchar(MAX),
	PhoneNumber	nvarchar(15),
	Note		nvarchar(MAX),
	IdCustomer		bigint references Customers(Id),
	IdEmployee		bigint references Employees(Id),
	IdPaymentMethod		bigint references PaymentMethods(Id),
	IdVoucher	bigint references Vouchers(Id),
	Status		int
)

create table BillDetails
(
	Id			bigint identity(1,1) primary key,
	Quantity	int,
	Price		decimal(20,0),
	IdBill		bigint references Bills(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	Status		int
)

create table Carts
(
	Id			bigint identity(1,1) primary key,
	IdCustomer	bigint references Customers(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table CartDetails
(
	Id			bigint identity(1,1) primary key,
	Quantity	int,
	Price		decimal(20,0),
	IdCart		bigint references Carts(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	Status		int
)

create table Favorites
(
	Id			bigint identity(1,1) primary key,
	IdCustomer	bigint references Customers(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)

create table Ratings
(
	Id			bigint identity(1,1) primary key,
	Content		nvarchar(MAX),
	Rate		int,
	IdCustomer	bigint references Customers(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	CreatedAt	datetime,
	UpdatedAt	datetime,
	Status		int
)