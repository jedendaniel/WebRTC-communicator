#create table user_private_data (id int not null auto_increment, primary key(id), password varchar(30), email varchar(30));
#alter table user add (private_data_id int unsigned not null, public_data_id int unsigned null);
#alter table user drop column private_data_id
#alter table user add (public_data_id int unsigned not null);
#alter table user add foreign key (public_data_id) references user_public_data(id);
#select * from user;
drop table user_private_data;
drop table user_public_data;
