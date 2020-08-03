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

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Robert',
    'robert@ilope.org',
    'Robertland',
    'olaf.png'
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

INSERT INTO users (name, email, sovereignty, avatar) VALUES (
    'Anna',
    'Anna@example.com',
    'Arendelle',
    'anna.png'
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
    'mock_otp_for_bernie',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    3,
    'mock_otp_for_joe',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    4,
    'mock_otp_for_obama',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    5,
    'mock_otp_for_trump',
    now() + INTERVAL '365 days'
);

INSERT INTO one_time_passwords (user_id, otp, expiry) VALUES (
    6,
    'mock_otp_for_anna',
    now() + INTERVAL '365 days'
);

CREATE TABLE edicts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    otp_id INT REFERENCES one_time_passwords (id),
    law VARCHAR (2000) NOT NULL,
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
    2,
    2,
    'The business model of the pharmaceutical industry is unfettered greed.<br /><br />This is not the time for corporate profiteering of off death and suffering.<br /><br />We must guarantee that coronavirus treatments and vaccines are free to all Americans.',
    'https://twitter.com/BernieSanders/status/1278779710948945921',
    '2020-07-02 15:56:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    2,
    2,
    'The very, very rich are getting much richer during the pandemic:<br /><br />⬆️$73 billion: Jeff Bezos<br />⬆️$45 billion: Elon Musk<br />⬆️$31 billion: Mark Zuckerberg<br />⬆️$28 billion: Bill Gates<br />⬆️$19 billion: L Page<br />⬆️$19 billion: Sergey Brin<br /><br />Total: $215 billion<br /><br />Tax their wealth. Break up Big Tech',
    'https://twitter.com/BernieSanders/status/1288504093133152259',
    '2020-07-29 11:58:00'
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

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    3,
    3,
    'Home care workers and child care workers — who are more often women, women of color, and immigrants — have been underpaid, unseen, and undervalued for far too long.',
    'https://twitter.com/JoeBiden/status/1286670471623254018',
    '2020-07-24 10:32:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    3,
    3,
    'Enhanced unemployment benefits expired for millions overnight.<br /><br />We don’t have an effective nationwide testing program or a plan to control the virus.<br /><br />Our health care workers still don’t have enough PPE.<br /><br />Enough with the weekend golf trips, Mr. President. Do your job.',
    'https://twitter.com/JoeBiden/status/1289712264468193280',
    '2020-08-01 19:59:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    3,
    3,
    'Now more than ever, we need a president who believes in science.',
    'https://twitter.com/JoeBiden/status/1289712264468193280',
    '2020-08-02 12:40:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    4,
    4,
    'Ten years ago, I signed Wall Street reform into law. It was the most sweeping set of financial regulations since the Great Depression—and it’s still working today to prevent another one. Now, it’s up to us to protect it and keep fighting for an economy that works for everybody.',
    'https://twitter.com/BarackObama/status/1285594646698172418',
    '2020-07-21 11:17:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    4,
    4,
    'This pandemic is far from over––and our medical professionals continue to put their lives on the line to keep our country going. @JoeBiden and I had a chance to thank Dr. @Craig_A_Spencer for his work during the Ebola crisis and this current pandemic.',
    'https://twitter.com/BarackObama/status/1289606838850396160',
    '2020-08-01 13:00:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    4,
    4,
    'John believed that in all of us, there exists the capacity for great courage and a longing to do what’s right. We are so lucky to have had him show us the way. I offered some thoughts today on his life and how, like him, we can give it all we have.',
    'https://twitter.com/BarackObama/status/1288939275334057984',
    '2020-07-30 16:47:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    5,
    5,
    'Big China Virus breakouts all over the World, including nations which were thought to have done a great job. The Fake News doesn’t report this. USA will be stronger than ever before, and soon!',
    'https://twitter.com/realDonaldTrump/status/1289887533250351110',
    '2020-08-02 7:35:00'
);

INSERT INTO edicts (user_id, otp_id, law, ref, created_on) VALUES (
    5,
    5,
    'MAKE AMERICA GREAT AGAIN!',
    'https://twitter.com/realDonaldTrump/status/1289741750680993794',
    '2020-08-01 9:56:00'
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

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    1,
    6,
    1
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    6,
    1,
    6
);

INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES (
    6,
    4,
    6
);

-- create table sessions (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users (id),
--     otp_id INT REFERENCES one_time_passwords (id),
--     entered_on TIMESTAMP,
--     exited_on TIMESTAMP,
--     last_heartbeat TIMESTAMP
-- );
