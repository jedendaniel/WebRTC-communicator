create table relation 
(
	id int(11) unsigned not null auto_increment, primary key(id),
    usr1_id int(11) unsigned not null,
    usr2_id int(11) unsigned not null,
    status1 int(2) unsigned not null,
    status2 int(2) unsigned not null
);

alter table relation add foreign key (usr1_id) references user(id) on delete cascade;
alter table relation add foreign key (usr2_id) references user(id) on delete cascade;
