create table user(
	user_id int auto_increment primary key,
	name varchar(50),
    email varchar(100) not null,
    password varchar(100),
    avatar varchar(500),
    point int,
    role enum('admin', 'user') default('user'),
    isActive boolean default true,
    created timestamp default current_timestamp,
    updated timestamp
);
create table item(
	item_id int auto_increment primary key,
    item_name varchar(500) not null,
    price double not null,
    priceBeforeDiscount double not null,
    quantity int not null,
    sold int not null,
    description text(2000),
    created timestamp default current_timestamp,
    updated timestamp
);
create table cmt(
	cmt_id int auto_increment primary key,
    content text(2000) not null,
    created timestamp default current_timestamp,
    updated timestamp,
    user_id int not null,
    item_id int not null,
    foreign key(user_id) references user(user_id),
    foreign key(item_id) references item(item_id)
);
create table `order`(
	order_id int auto_increment primary key,
    status enum('waiting-confirm', 'success', 'cancel') default('waiting-confirm'),
    total float not null,
    discount double not null,
    note varchar(500),
    created timestamp default current_timestamp,
    updated timestamp,
    user_id int not null,
    foreign key(user_id) references user(user_id)
);
create table itemInOrder(
    order_id int not null,
    item_id int not null,
    primary key(order_id, item_id),
    foreign key(order_id) references `order`(order_id),
    foreign key(item_id) references item(item_id)
);