create database divine_shop;

use divine_shop;

drop table if exists user;
create table user(
	user_id varchar(100) not null primary key,
	user_name varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    role enum('admin', 'user') not null,
    isActive boolean default true,
    created timestamp default current_timestamp,
    updated timestamp
);

drop table if exists item;
create table item(
	item_id varchar(100) not null primary key,
    item_name varchar(500) not null,
    price double not null,
    priceBeforeDiscount double not null,
    quantity int not null,
    sold int not null,
    description text(2000),
    created timestamp default current_timestamp,
    updated timestamp
);

drop table if exists cmt;
create table cmt(
	cmt_id int auto_increment primary key,
    content text(2000) not null,
    created timestamp default current_timestamp,
    updated timestamp,
    user_id varchar(100) not null,
    item_id varchar(100) not null,
    foreign key(user_id) references user(user_id),
    foreign key(item_id) references item(item_id)
);

drop table if exists `order`;
create table `order`(
	order_id int auto_increment not null primary key,
    status enum('success', 'fail') not null,
    created timestamp default current_timestamp,
    user_id varchar(100) not null,
    foreign key(user_id) references user(user_id)
);

drop table if exists order_detail;
create table order_detail(
	order_id int not null,
    items json not null,
    foreign key(order_id) references `order`(order_id)
);