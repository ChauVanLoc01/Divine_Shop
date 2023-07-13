create database divine_shop;

use divine_shop;

create table user(
	user_id varchar(100) not null primary key,
	user_name varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    role enum('admin', 'user'),
    isActive boolean default true,
    created timestamp default current_timestamp,
    updated timestamp,
    index(email, password)
);

create table item(
	item_id varchar(100) not null primary key,
    item_name varchar(500) not null,
    price float not null,
    priceBeforeDiscount float not null,
    quantity int not null,
    sold int not null,
    description text not null,
    created timestamp default current_timestamp,
    updated timestamp,
    index(item_name, description)
);