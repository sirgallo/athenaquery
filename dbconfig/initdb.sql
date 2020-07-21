create user 'dbuser'@'%' identified by 'userdbpass';

grant all privileges on restaurateurmodels.* to 'dbuser'@'%';

create table if not exists restaurateurmodels.users (
    id bigint not null auto_increment,
    username varchar(256) not null,
    email varchar(256) not null,
    zip integer(5) not null,
    password varchar(256) not null,
    primary key(id)
);

create table if not exists restaurateurmodels.sites (
    id bigint not null auto_increment,
    user_id bigint not null,
    coords_lat integer(9) not null,
    coords_lon integer(9) not null,
    site_name varchar(256) not null,
    zip integer(5) not null,
    site_type varchar(256) not null,
    primary key (id),
    foreign key (user_id)
        references users(id)
);

create table if not exists restaurateurmodels.regions (
    id bigint not null,
    site_id bigint not null,
    user_id bigint not null,
    cases_actual integer(5) not null,
    region_name varchar(256) not null,
    risk varchar(6) not null,
    population integer(7) not null,
    primary key (id),
    foreign key (site_id)
        references sites(id),
    foreign key (user_id)
        references users(id)
);