DROP TABLE alphas;
DROP TABLE edicts;
DROP TABLE one_time_passwords;
DROP TABLE users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    sovereignty VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    avatar VARCHAR (355),
    created_on TIMESTAMP DEFAULT current_timestamp,
    last_login TIMESTAMP
);

INSERT INTO users (name, email, sovereignty) VALUES (
    'Robert',
    'robert@ilope.org',
    'Robertland'
);

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Bernie',
    'bernie@example.com',
    'Berntopia',
    'bernie.png'
);

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Joe',
    'joe@example.com',
    'Joeville',
    'biden.jpg'
);

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Obama',
    'obama@example.com',
    'Obamatown',
    'obama.jpg'
);

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Trump',
    'trump@example.com',
    'Trumplandia',
    'trump.jpg'
);

CREATE TABLE one_time_passwords (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    otp VARCHAR (64) NOT NULL,
    created_on TIMESTAMP DEFAULT current_timestamp,
    expiry TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    1,
    'mock_otp_for_tests_good_until_2021',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    2,
    'mock_otp_for_alice',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    3,
    'mock_otp_for_bob',
    now() + INTERVAL '365 days'
);

CREATE TABLE edicts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    otp_id INT REFERENCES one_time_passwords (id),
    law VARCHAR (280) NOT NULL,
    ref VARCHAR (2000),
    created_on TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO edicts (user_id, otp_id, law) VALUES (
    1,
    1,
    'Robert Edict Seed #1.'
);

INSERT INTO edicts (user_id, otp_id, law) VALUES (
    1,
    1,
    'Robert Edict Seed #2.'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    2,
    2,
    'And the very rich get much richer. Over half of American households have lost income during the pandemic, while 491 billionaires have increased their wealth by $743 billion. This is obscene. We need an economy that works for all, not a rigged economy for the wealthy and powerful.',
    'https://twitter.com/BernieSanders/status/1289977300050567175',
    '2020-08-02 13:32:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    2,
    2,
    'We must change our priorities. Add your name to say you support a 10% cut in annual Pentagon spending to allow for investments in jobs, education, health care and poverty reduction in America’s most vulnerable communities.',
    'https://twitter.com/BernieSanders/status/1285594882434838530',
    '2020-07-21 11:17:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    3,
    3,
    'Donald Trump has shown that he can’t beat the pandemic or turn the economy around. And he is unsurprisingly stoking the flames of division for political gain.<br /><br />He is the worst possible person to lead our nation through this moment.',
    'https://twitter.com/JoeBiden/status/1288564199723921408',
    '2020-07-29 15:57:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    3,
    3,
    'Our students and educators deserve better than four more years of Betsy DeVos. It’s time for a Secretary of Education who is actually a public school educator.',
    'https://twitter.com/JoeBiden/status/1288120526683029512',
    '2020-07-28 10:34:00'
);

CREATE TABLE alphas (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    alpha_id INT REFERENCES users (id),
    otp_id INT REFERENCES one_time_passwords (id),
    created_on TIMESTAMP DEFAULT current_timestamp,
    UNIQUE (user_id, alpha_id)
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    1,
    2,
    1
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    1,
    3,
    1
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    1,
    4,
    1
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    1,
    5,
    1
);

-- create table sessions (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users (id),
--     otp_id INT REFERENCES one_time_passwords (id),
--     entered_on TIMESTAMP,
--     exited_on TIMESTAMP,
--     last_heartbeat TIMESTAMP
-- );
