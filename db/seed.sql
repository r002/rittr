drop table edicts;
drop table one_time_passwords;
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
    'Robert',
    'robert@ilope.org',
    'Robertland'
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

create table one_time_passwords (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    otp VARCHAR (64) NOT NULL,
    created_on TIMESTAMP DEFAULT current_timestamp,
    expiry TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE
);

insert into one_time_passwords (user_id, otp, expiry) values (
    1,
    'mock_otp_for_tests_good_until_2021',
    now() + INTERVAL '365 days'
);

create table edicts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    otp_id INT REFERENCES one_time_passwords (id),
    law VARCHAR (280) NOT NULL,
    created_on TIMESTAMP DEFAULT current_timestamp
);

insert into edicts (user_id, otp_id, law) values (
    1,
    1,
    'Edict decree test 1.'
);

insert into edicts (user_id, otp_id, law) values (
    1,
    1,
    'Edict decree test 2.'
);

-- create table sessions (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users (id),
--     otp_id INT REFERENCES one_time_passwords (id),
--     entered_on TIMESTAMP,
--     exited_on TIMESTAMP,
--     last_heartbeat TIMESTAMP
-- );
