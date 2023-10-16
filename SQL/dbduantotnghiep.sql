use duantotnghiepdb
go

create table Roles
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Vouchers
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(50),
	Name		nvarchar(100),
	Value		decimal(20,0),
	MinimumTotalAmount		decimal(20,0),
	Quantity	int,
	Describe	nvarchar(100),
	StartDate	datetime,
	EndDate		datetime,
	CreateAt	datetime,
	UpdateAt	datetime,
	CreateBy	nvarchar(50),
	UpdateBy	nvarchar(50),
	Status		int
)

create table PaymentMethods
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Materials
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Categories
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Colors
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Sizes
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Employees
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(50),
	Avatar		nvarchar(100),
	Account		nvarchar(50),
	Password	nvarchar(100),
	PhoneNumber	nvarchar(15),
	Email		nvarchar(100),
	BirthDate	datetime,
	Gender		bit,
	Address		nvarchar(max),
	IdRole		bigint references Roles(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	CreateBy	nvarchar(50),
	UpdateBy	nvarchar(50),
	Status		int
)

create table Customers
(
	Id			bigint identity(1,1) primary key,
	FullName	nvarchar(50),
	Avatar		nvarchar(100),
	Account		nvarchar(50),
	Password	nvarchar(100),
	PhoneNumber	nvarchar(15),
	Email		nvarchar(100),
	BirthDate	datetime,
	Gender		bit,
	Address		nvarchar(max),
	CreateAt	datetime,
	UpdateAt	datetime,
	CreateBy	nvarchar(50),
	UpdateBy	nvarchar(50),
	Status		int
)

create table Address
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(100),
	PhoneNumber	nvarchar(15),
	Address		nvarchar(max),
	AddressType	nvarchar(50),
	IdCustomer	bigint references Customers(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Products
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(50),
	Name		nvarchar(50),
	Collar		nvarchar(50),
	Wrist		nvarchar(50),
	Describe	nvarchar(255),
	Brand		nvarchar(50),
	IdCategory	bigint references Categories(Id),
	IdMaterial	bigint references Materials(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	CreateBy	nvarchar(50),
	UpdateBy	nvarchar(50),
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
	CreateAt	datetime,
	UpdateAt	datetime,
	CreateBy	nvarchar(50),
	UpdateBy	nvarchar(50),
	Status		int
)

create table Images
(
	Id			bigint identity(1,1) primary key,
	Name		nvarchar(50),
	Path		nvarchar(100),
	IdProductDetail		bigint references ProductDetails(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Bills
(
	Id			bigint identity(1,1) primary key,
	Code		nvarchar(50),
	CreateAt	datetime,
	PaymentDate	datetime,
	TotalAmount	decimal(20,0),
	TotalAmountAfterDiscount	decimal(20,0),
	ReciverName	nvarchar(50),
	DeliveryDate		datetime,
	ShippingFee	decimal(20,0),
	Address		nvarchar(max),
	PhoneNumber	nvarchar(15),
	Note		nvarchar(max),
	IdCustomer		bigint references Customers(Id),
	IdEmployee		bigint references Employees(Id),
	IdPaymentMethod		bigint references PaymentMethods(Id),
	IdAddress	bigint references Address(Id),
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
	IdColor		bigint references Colors(Id),
	Status		int
)

create table Carts
(
	Id			bigint identity(1,1) primary key,
	IdEmployee	bigint references Employees(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
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
	IdEmployee	bigint references Employees(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)

create table Ratings
(
	Id			bigint identity(1,1) primary key,
	Content		nvarchar(100),
	Rate		int,
	IdEmployee	bigint references Employees(Id),
	IdProductDetail	bigint references ProductDetails(Id),
	CreateAt	datetime,
	UpdateAt	datetime,
	Status		int
)