drop table users;

create table users (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    sovereignty VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP DEFAULT current_timestamp,
    last_login TIMESTAMP
);

insert into users (name, email, sovereignty) values (
    'Alice',
    'alice@example.com',
    'Alicetown'
);

insert into users (name, email, sovereignty) values (
    'Bob',
    'bob@example.com',
    'Bobville'
);

insert into users (name, email, sovereignty) values (
    'Charlie',
    'charlie@example.com',
    'Charlie Island'
);

insert into users (name, email, sovereignty) values (
    'Mr. Duplicate',
    'duplicate@example.com',
    'Duplicate Land'
);
